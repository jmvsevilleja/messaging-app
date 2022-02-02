import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {userByClinicaID} from "../graphql/queries";
import {
    messageByChatRoomMessagesId,
    chatRoomUserByChatRoomUserUserId
} from "../graphql/custom-queries";
import {
    createUser,
    createChatRoom,
    createChatRoomUser
} from "../graphql/mutations";
import {
    updateUser,
    updateMessage,
    updateChatRoom,
} from "../graphql/custom-mutations";
import {
    //onCreateUser,
    onUpdateUser,
    onUpdateChatRoom,
    onCreateMessageByChatRoomMessagesId,
    onUpdateMessageByChatRoomMessagesId,
    onUpdateChatRoomUserByChatRoomChatRoomUsersId,
} from "../graphql/custom-subscriptions";

import ChatBody from "./ChatBody";
import ChatInfo from "./ChatInfo";

import axios from "axios";
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
    const [openChat, setOpenChat] = useState(false); // set the chat room open

    const [forceOpenChat, setForceOpenChat] = useState(false); // force to open the chat room
    const [chatRoomID, setChatRoomID] = useState(null);
    let navigate = useNavigate();

    // HANDLE FUNCTIONS
    // const handleLogout = async () => {
    //     localStorage.removeItem("user_id");
    //     localStorage.removeItem("auth_login");
    //     localStorage.removeItem("auth_token");
    //     localStorage.removeItem("refresh_token");
    //     localStorage.removeItem("access_token");
    //     document.cookie = "auth_login=; Max-Age=-99999999;";
    //     document.cookie = "token=; Max-Age=-99999999;";
    //     // unsubscribe
    //     for (const item in subs) {
    //         if (subs[item]) {
    //             subs[item].unsubscribe();
    //         }
    //     }
    //     handleUserOnline(false);
    //     navigate(`/`);
    // };

    const handleUserOnline = (online) => {
        if (!user) return;
        // update offline status
        API.graphql(
            graphqlOperation(updateUser, {
                input: {
                    id: user.id,
                    online: online,
                    //typing: false
                },
            })
        );
    };

    const handleCreateChat = async (chat_room_list, selected_user) => {
        console.log("handleCreateChat", chatRoomList, user.id, selected_user.id);

        // check if user logged and selected_user is already in chat room
        const found_user = chat_room_list.find((room) => {
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
            const room = await API.graphql(
                graphqlOperation(createChatRoom, {
                    input: {
                        name: user.name + " - " + selected_user.name,
                        chatRoomAdminId: user.id, // Creator of the Chatroom
                        group: false,
                    },
                })
            );
            console.log("createChatRoom", room, room.data.createChatRoom.id);
            //Creating Chat Room User
            await API.graphql(
                graphqlOperation(createChatRoomUser, {
                    input: {
                        chatRoomUserUserId: selected_user.id,
                        chatRoomChatRoomUsersId:
                            room.data.createChatRoom.id,
                    },
                })
            );
            //Creating Chat Room Admin
            await API.graphql(
                graphqlOperation(createChatRoomUser, {
                    input: {
                        chatRoomUserUserId: user.id,
                        chatRoomChatRoomUsersId: room.data.createChatRoom.id,
                    },
                })
            );
            console.log('createChatRoomUser', room.data.createChatRoom.id);
            // Open ChatRoom with this Id
            handleChatRoomID(room.data.createChatRoom.id);
            // }
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
                    API.graphql({
                        query: updateChatRoom,
                        variables: {
                            input: {
                                id: value.data.onCreateMessageByChatRoomMessagesId.chatRoom.id,
                                newMessages: (value.data.onCreateMessageByChatRoomMessagesId.chatRoom.newMessages * 1) + 1,
                                lastMessage: value.data.onCreateMessageByChatRoomMessagesId.content
                            },
                        },
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
        const result = await API.graphql(
            graphqlOperation(messageByChatRoomMessagesId, {chatRoomMessagesId: chatroom.id, sortDirection: "DESC", limit: 100})
        );
        console.log('messageByChatRoomMessagesId', result.data.MessageByChatRoomMessagesId);
        //fetchMessages(chatroom.id);
        setMessageList(result.data.MessageByChatRoomMessagesId.items);

        // Set All message to READ
        result.data.MessageByChatRoomMessagesId.items.forEach((item) => {
            if (item.userMessageId !== user.id && item.status !== "READ") {
                //console.log('handleUnreadMessage', item);
                handleUnreadMessage(item.id);
            }
        });

        // remove counter when messages are read
        result.data.MessageByChatRoomMessagesId.items.find((item) => {
            if (item.userMessageId !== user.id && item.status !== "READ") {
                // update removing counter
                handleCounterMessage(chatroom.id);
                return true;
            }
            return false;
        });

    };

    const handleCounterMessage = async (chatroom_id) => {
        console.log("handleCounterMessage", chatroom_id);
        API.graphql({
            query: updateChatRoom,
            variables: {
                input: {
                    id: chatroom_id,
                    newMessages: 0,
                },
            },
        });
    };

    const handleUnreadMessage = async (message_id) => {
        console.log("handleUnreadMessage", message_id);
        await API.graphql(
            graphqlOperation(updateMessage, {
                input: {
                    id: message_id,
                    status: "READ",
                },
            })
        );
    };

    // Open chat toggle
    const handleCloseChat = async () => {
        setOpenChat(false);
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
                const modifiedname = room.chatroom.chatRoomUsers.items.find((item) => {
                    return item.user.id !== user.id ? item.user.name : "";
                });
                if (modifiedname) {
                    room.chatroom.name = modifiedname.user.name;
                }
            }
            return room;
        });
        console.log('updateChatRoomList', name_chatroom);
        setChatRoomList([...name_chatroom]);
    };
    const fetchChatRooms = async (user_id) => {
        console.log('fetchChatRooms', user_id);
        if (!user_id) return;
        try {
            // get logged user from User Table to get status.
            const item = await API.graphql(
                graphqlOperation(chatRoomUserByChatRoomUserUserId, {chatRoomUserUserId: user_id})
            );
            return item.data.ChatRoomUserByChatRoomUserUserId.items;
        } catch (e) {
            console.log(e);
        }
    };
    const fetchUser = async (user_id) => {
        console.log('fetchUser', user_id);
        if (!user_id) return;
        try {
            // get logged user from User Table to get status.
            const item = await API.graphql(
                graphqlOperation(userByClinicaID, {clinicaID: user_id})
            );
            if (item.data.userByClinicaID.items) {
                return item.data.userByClinicaID.items[0];
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addUser = async (user_id, name) => {
        if (!user_id || !name) return;
        try {
            const item = await API.graphql({
                query: createUser,
                variables: {
                    input: {
                        clinicaID: user_id,
                        name: name,
                        status: "Hi there! I'm using Conva",
                        type: "USER"
                    },
                },
            });
            return item.data.createUser;
        } catch (err) {
            console.error(err);
        }
    };

    // USE EFFECTS
    useEffect(() => {
        if (user) return;
        const user_id = localStorage.getItem("user_id");
        const auth_token = localStorage.getItem("auth_token");
        const refresh_token = localStorage.getItem("refresh_token");

        // TODO: check user auth token if valid
        fetchUser(user_id).then((user_list) => {
            setUser(user_list);
            if (user_id && auth_token && refresh_token) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user_list) {
                    fetchUserDetails(user_id, auth_token, refresh_token).then(
                        (user_detail) => {
                            const name =
                                user_detail.first_name +
                                " " +
                                user_detail.last_name;
                            console.log(
                                "user not found create to users table",
                                user_id,
                                name
                            );
                            addUser(user_id, name).then((result) => {
                                //console.log('user created', result);
                                setUser({
                                    id: result.id,
                                    clinicaID: user_id,
                                    name: name,
                                });
                            });
                        }
                    );
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

        fetchChatRooms(user.id).then((chat_room_list) => {
            if (chat_room_list.length === 0) return;
            console.log('fetchChatRooms', chat_room_list);
            // set chatroom list
            updateChatRoomList(chat_room_list);

            const to = localStorage.getItem("to");
            fetchUser(to).then((other_user) => {
                // create/open chat
                handleCreateChat(chat_room_list, other_user);
            });

        });


        console.log("Subscribe to onUpdateUser");
        subs.subUpdateUser = API.graphql(
            graphqlOperation(onUpdateUser)
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateUser", value);
                //TODO: optimize to find
                // update online in user list
                // setUserList((list) => list.map((item) => item.id === value.data.onUpdateUser.id
                //     ? {
                //         ...item,
                //         online: value.data.onUpdateUser.online
                //     }
                //     : item));
                // update online in chatroom list
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

    useEffect(() => {

        // Subscribe to creation of user
        // subs.subCreateUser = API.graphql(graphqlOperation(onCreateUser)).subscribe({
        //     next: ({provider, value}) => {
        //         setUserList((list) => [...list, value.data.onCreateUser]);
        //     },
        //     error: (error) => console.warn(error),
        // });
        // Subscribe to update of chatroom
        subs.subUpdateChatRoom = API.graphql(
            graphqlOperation(onUpdateChatRoom)
        ).subscribe({
            next: ({provider, value}) => {
                //console.log("onUpdateChatRoom", value.data.onUpdateChatRoom);
                //TODO: optimize to find
                setChatRoomList((list) => list.map((item) => item.chatroom.id === value.data.onUpdateChatRoom.id
                    ? {
                        ...item,
                        chatroom: {
                            ...item.chatroom,
                            lastMessage: value.data.onUpdateChatRoom.lastMessage,
                            newMessages: value.data.onUpdateChatRoom.newMessages,
                            updatedAt: value.data.onUpdateChatRoom.updatedAt,
                        }
                    }
                    : item));
            },
            error: (error) => console.warn(error),
        });

        // TODO: offline when on browser close
        return () => {
            console.log('UNMOUNTED');
            //unsubscribe
            for (const item in subs) {
                if (subs[item]) {
                    subs[item].unsubscribe();
                }
            }
        };
    }, []);

    const fetchUserDetails = async (user_id, auth_token, refresh_token) => {
        if (!user_id || !auth_token || !refresh_token) return;
        try {
            return await axios({
                url: `https://n0mkkv2gg1.execute-api.ap-southeast-2.amazonaws.com/api/user-account`,
                method: "GET",
                params: {userID: user_id},
                headers: {
                    Authorization: `Bearer ${auth_token}`,
                    "X-REFRESH-TOKEN": refresh_token,
                },
            }).then((response) => {
                if (response.status === 200) {
                    return response.data.message;
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

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
                        />
                    </div>
                </main>
            </div>
            <ChatInfo />
        </div>
    );
};

export default Chat;
