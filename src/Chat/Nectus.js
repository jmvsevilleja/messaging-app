import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getUserById, getAccountById, getChatRooms, getMessages} from "../api/queries";
import {addUser, addChatRoom, addChatRoomUser, editUser, editMessage, editChatRoom} from "../api/mutations";

import {
    onUpdateUser,
    onCreateMessageByChatRoomMessagesId,
    onUpdateMessageByChatRoomMessagesId,
    onUpdateChatRoomUserByChatRoomChatRoomUsersId,
} from "../graphql/custom-subscriptions";

import ChatBody from "./ChatBody";
import ChatInfo from "./ChatInfo";

import "./index.css";

let subs = {
    subCreateChatRoomUser: null,
    subCreateUser: null,
    subUpdateUser: null,
    subUpdateChatRoom: null,
    subCreateMessage: null,
    subUpdateMessage: null,
    subUpdateChatRoomUser: null,
};

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [user, setUser] = useState(null);
    const [chatRoom, setChatRoom] = useState({});
    const [openChat, setOpenChat] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const [forceOpenChat, setForceOpenChat] = useState(false); // force to open the chat room
    const [chatRoomID, setChatRoomID] = useState(null);
    let navigate = useNavigate();

    const handleUserOnline = (online) => {
        if (!user) return;
        // update offline status
        editUser({
            id: user.id,
            online: online
        });
    };

    const handleCreateUser = async (user_id) => {
        return getAccountById(user_id).then(async (user_detail) => {
            if (user_detail) {
                const name = user_detail.first_name + " " + user_detail.last_name;
                console.log("user not found create to users table", user_id, name);
                return await addUser(user_id, name).then((result) => {
                    //console.log('user created', result);
                    return {
                        id: result.id,
                        name: name,
                        status: result.status
                    };
                });
            }
        }
        );
    };

    const handleCreateChat = async (chatroom_list, selected_user) => {
        console.log("handleCreateChat", chatRoomList, user.id, selected_user.id);

        // check if user logged and selected_user is already in chat room
        const found_user = chatroom_list.find((room) => {
            if (!Boolean(room.chatroom.group)) { // not group chat
                let needle = [user.id, selected_user.id];
                var haystack = room.chatroom.chatRoomUsers.items.map(item => item.user.id);
                return needle.every(item => haystack.includes(item));
            }
            return false;
        });

        console.log('handleCreateChat Found', found_user);
        if (!Boolean(found_user)) {
            // Creating Chat Room
            const chatroom_name = user.name + " - " + selected_user.name;
            await addChatRoom(user.id, chatroom_name).then(async (chatroom) => {
                await addChatRoomUser(selected_user.id, chatroom.id).then(async () => {
                    await addChatRoomUser(user.id, chatroom.id).then(async () => {
                        handleChatRoomID(chatroom.id);
                    });
                });
            });

        } else {
            // open chatroom from users list
            handleChatRoomID(found_user.chatroom.id);
        }
    };

    const handleChatRoom = async (chatroom) => {
        console.log("handleChatRoom", chatroom);
        setMessageList([]);
        setOpenChat(true);
        setChatRoom({
            id: chatroom.id,
            name: chatroom.name,
            users: chatroom.chatRoomUsers.items,
            group: chatroom.group,
            lastMessage: chatroom.lastMessage,
            imageUri: chatroom.imageUri,
        });

        if (subs.subCreateMessage) {
            subs.subCreateMessage.unsubscribe();
        }
        if (subs.subUpdateMessage) {
            subs.subUpdateMessage.unsubscribe();
        }
        if (subs.subUpdateChatRoomUser) {
            subs.subUpdateChatRoomUser.unsubscribe();
        }
        //console.log('Subscribe to onCreateMessageByChatRoomMessagesId');
        subs.subCreateMessage = API.graphql(
            graphqlOperation(onCreateMessageByChatRoomMessagesId, {chatRoomMessagesId: chatroom.id})
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onCreateMessageByChatRoomMessagesId", value);
                setMessageList((list) => [
                    ...list,
                    value.data.onCreateMessageByChatRoomMessagesId,
                ]);

                // set READ if your not the owner
                if (user && user.id !== value.data.onCreateMessageByChatRoomMessagesId.userMessageId) {
                    handleUnreadMessage(value.data.onCreateMessageByChatRoomMessagesId.id);
                }

                // pass the last message and the counter
                if (user && user.id === value.data.onCreateMessageByChatRoomMessagesId.userMessageId) {
                    console.log('onCreateMessageByChatRoomMessagesId', value.data.onCreateMessageByChatRoomMessagesId);
                    // update chatroom new message and add counter
                    editChatRoom({
                        id: value.data.onCreateMessageByChatRoomMessagesId.chatRoom.id,
                        newMessages: (value.data.onCreateMessageByChatRoomMessagesId.chatRoom.newMessages * 1) + 1,
                        lastMessage: value.data.onCreateMessageByChatRoomMessagesId.content
                    });
                    //console.log("Updated Chatroom", updated_chatroom);
                }
            },
            error: (error) => console.warn(error),
        });

        //console.log('Subscribe to onUpdateMessageByChatRoomMessagesId');
        subs.subUpdateMessage = API.graphql(
            graphqlOperation(onUpdateMessageByChatRoomMessagesId, {
                chatRoomMessagesId: chatroom.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateMessageByChatRoomMessagesId", value);
                if (value.data.onUpdateMessageByChatRoomMessagesId.userMessageId === user.id) {
                    // Update all message status
                    setMessageList((list) =>
                        list.map((item) => item.id === value.data.onUpdateMessageByChatRoomMessagesId.id
                            ? {...item, status: value.data.onUpdateMessageByChatRoomMessagesId.status}
                            : item)
                    );
                    if (user && user.id === value.data.onUpdateMessageByChatRoomMessagesId.userMessageId) {
                        // update removing counter
                        handleCounterMessage(value.data.onUpdateMessageByChatRoomMessagesId.chatRoom.id);
                    }
                }
            },
            error: (error) => console.warn(error),
        });

        console.log("Subscribe to onUpdateChatRoomUserByChatRoomChatRoomUsersId");
        subs.subUpdateChatRoomUser = API.graphql(
            graphqlOperation(onUpdateChatRoomUserByChatRoomChatRoomUsersId, {
                chatRoomChatRoomUsersId: chatroom.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateChatRoomUserByChatRoomChatRoomUsersId", value);

                // update typing in current chatroom
                setChatRoom((items) => {
                    const users = items.users.map((item) =>
                        (item.id === value.data.onUpdateChatRoomUserByChatRoomChatRoomUsersId.id) ? {
                            ...item,
                            typing: value.data.onUpdateChatRoomUserByChatRoomChatRoomUsersId.typing
                        } : item
                    );
                    return {
                        ...items,
                        users
                    }
                });

            },
            error: (error) => console.warn(error),
        });

        // TODO: load the next 100 messages on scroll
        getMessages(chatroom.id).then((messages) => {
            setMessageList(messages);
            // Set All message to READ
            messages.forEach((item) => {
                if (item.userMessageId !== user.id && item.status !== "READ") {
                    //console.log('handleUnreadMessage', item);
                    handleUnreadMessage(item.id);
                }
            });
            // remove counter when messages are read
            messages.find((item) => {
                if (item.userMessageId !== user.id && item.status !== "READ") {
                    // update removing counter
                    handleCounterMessage(chatroom.id);
                    return true;
                }
                return false;
            });
        });

    };

    const handleCounterMessage = async (chatroom_id) => {
        console.log("handleCounterMessage", chatroom_id);
        editChatRoom({
            id: chatroom_id,
            newMessages: 0,
        });
    };

    const handleUnreadMessage = async (message_id) => {
        console.log("handleUnreadMessage", message_id);
        editMessage({
            id: message_id,
            status: "READ",
        });
    };

    // Open chat toggle
    const handleCloseChat = async () => {
        setOpenChat(false);
    }
    const handleCloseInfo = async () => {
        setOpenInfo(false);
    }
    const handleOpenInfo = async () => {
        setOpenInfo(true);
    }

    // open chat room using room ID
    const handleChatRoomID = async (id) => {
        console.log('handleChatRoomID', id);
        // don't load chatroom if the same clicked
        if (chatRoomID !== id) {
            setChatRoomID(id);
            setForceOpenChat(true);
        }
        setOpenChat(true);
    }
    // OTHER FUNCTIONS
    const updateChatRoomList = async (chatroom) => {
        const name_chatroom = chatroom.map((room) => {
            if (!Boolean(room.chatroom.group)) {
                // Change name to the one you are chatting with
                const found_user = room.chatroom.chatRoomUsers.items.find((item) => {
                    return item.user.id !== user.id ? item.user.name : "";
                });
                if (found_user) {
                    room.chatroom.name = found_user.user.name;
                    room.chatroom.imageUri = found_user.user.imageUri;
                }
            }
            return room;
        });
        console.log('updateChatRoomList', name_chatroom);
        setChatRoomList([...name_chatroom]);
    };

    // USE EFFECTS
    useEffect(() => {
        if (user) return;
        const user_id = localStorage.getItem("user_id");
        // const auth_token = localStorage.getItem("auth_token");
        // const refresh_token = localStorage.getItem("refresh_token");

        // TODO: check user auth token if valid
        getUserById(user_id).then((user_found) => {
            setUser(user_found);
            if (user_id) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user_found) {
                    handleCreateUser(user_id).then((created_user) => {
                        setUser({
                            id: created_user.id,
                            name: created_user.name,
                            status: created_user.status,
                        });
                    });
                }
                // 'user found proceed to chat'
            } else {
                // 'auth not found goto login'
                navigate(`/`);
                return;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch Users and Chatroom once user is loaded
    useEffect(() => {
        if (!user) return;

        console.log("USER: ", user.id);

        // update online status
        //setInterval(function () {
        handleUserOnline(true);
        //}, 300 * 1000);

        // Handle creation of user and chatroom from to
        const to = localStorage.getItem("to");
        getUserById(to).then((user_found) => {
            // TODO: user not found then create user
            console.log('fetchUser to', to, user_found);
            if (!user_found) {
                handleCreateUser(to).then((created_user) => {
                    // user created now create chat room
                    if (created_user) {
                        getChatRooms(user.id).then((chatroom_list) => {
                            handleCreateChat(chatroom_list.length !== 0 ? chatroom_list : [], created_user).then(() => {
                                // get chatroom list
                                getChatRooms(user.id).then((chatroom_list) => {
                                    // set chatroom list
                                    updateChatRoomList(chatroom_list);
                                });
                            });
                        });
                    }

                });
            }
            // create chatroom
            if (user_found) {
                getChatRooms(user.id).then((chatroom_list) => {
                    handleCreateChat(chatroom_list.length !== 0 ? chatroom_list : [], user_found).then(() => {
                        // get chatroom list
                        getChatRooms(user.id).then((chatroom_list) => {
                            // set chatroom list
                            updateChatRoomList(chatroom_list);
                        });
                    });
                });
            }
        });

        console.log("Subscribe to onUpdateUser");
        subs.subUpdateUser = API.graphql(
            graphqlOperation(onUpdateUser)
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateUser", value);
                setChatRoomList((list) => list.map((item) => {
                    const items = item.chatroom.chatRoomUsers.items.map((item) =>
                        (item.user.id === value.data.onUpdateUser.id) ? {
                            ...item,
                            user: {
                                ...item.user,
                                online: value.data.onUpdateUser.online
                            }
                        } : item
                    );
                    return {
                        ...item,
                        chatroom: {
                            ...item.chatroom,
                            chatRoomUsers: {
                                ...item.chatroom.chatRoomUsers,
                                items
                            }
                        }
                    };
                }));

                console.log('chatRoom.users', chatRoom.users);

                // update typing in current chatroom
                setChatRoom((items) => {
                    if (items.users) {
                        const users = items.users.map((item) =>
                            (item.user.id === value.data.onUpdateUser.id) ? {
                                ...item,
                                user: {
                                    ...item.user,
                                    online: value.data.onUpdateUser.online
                                }
                            } : item
                        );
                        return {
                            ...items,
                            users
                        }
                    }
                    return {
                        ...items,
                    }
                });


            },
            error: (error) => console.warn(error),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // open room when chatroom is loaded
    useEffect(() => {
        if (chatRoomID && forceOpenChat) {
            if (chatRoomList.length) {
                console.log("useEffect chatRoomList Loaded", chatRoomList, chatRoomID);
                const user_found = chatRoomList.find(
                    (item) => item.chatroom.id === chatRoomID
                );
                console.log('useEffect handleChatRoom Found', user_found);
                if (user_found) {
                    console.log('useEffect handleChatRoom Found', chatRoomID);
                    handleChatRoom(user_found.chatroom);
                    setForceOpenChat(false);

                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomID, forceOpenChat, chatRoomList]);

    //console.log('Rendering index.js');
    return (
        <div className="bg-white flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-hidden">
                <main>
                    <div className="relative flex">
                        {/* Messages body */}
                        <ChatBody
                            nectus={true}
                            user={user}
                            openChat={openChat}
                            chatRoom={chatRoom}
                            messageList={messageList}
                            handleCloseChat={handleCloseChat}
                            handleOpenInfo={handleOpenInfo}
                        />
                    </div>
                </main>
            </div>
            <ChatInfo
                user={user}
                openInfo={openInfo}
                chatRoom={chatRoom}
                handleCloseInfo={handleCloseInfo}
            />
        </div>
    );
};

export default Chat;
