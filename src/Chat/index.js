import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {userByClinicaID, listUsers} from "../graphql/queries";
import {getChatRoom, listChatRooms} from "../graphql/custom-queries";
import {
    createMessage,
    createUser,
    createChatRoom,
    createChatRoomUser,
    updateMessage,
    updateChatRoom,
} from "../graphql/mutations";
// import {
//     createMessage
// } from "../graphql/custom-mutations";
import {
    onCreateUser,
    onUpdateChatRoom,
    onCreateChatRoomUserByChatRoomUserUserId,
    onCreateMessageByChatRoomMessagesId,
    onUpdateMessageByChatRoomMessagesId,
} from "../graphql/custom-subscriptions";

import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import axios from "axios";
import "./index.css";

let subCreateChatRoomUser;
let subCreateUser;
let subUpdateChatRoom;
let subCreateMessage;
let subUpdateMessage;

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [user, setUser] = useState(null);
    const [chatRoom, setChatRoom] = useState({});
    const [openChat, setOpenChat] = useState(false);
    const [chatRoomID, setChatRoomID] = useState(null);

    let navigate = useNavigate();

    // HANDLE FUNCTIONS
    const handleLogout = async () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_login");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        document.cookie = "auth_login=; Max-Age=-99999999;";
        document.cookie = "token=; Max-Age=-99999999;";

        // unsubscribe on logout
        if (subCreateMessage) {
            subCreateMessage.unsubscribe();
        }
        if (subUpdateMessage) {
            subUpdateMessage.unsubscribe();
        }
        if (subUpdateChatRoom) {
            subUpdateChatRoom.unsubscribe();
        }
        if (subCreateChatRoomUser) {
            subCreateChatRoomUser.unsubscribe();
        }
        if (subCreateUser) {
            subCreateUser.unsubscribe();
        }

        navigate(`/`);
    };

    const handleSubmitMessage = async (event, messageText) => {
        // Prevent the page from reloading
        event.preventDefault();
        // Try make the mutation to graphql API
        try {
            const created_message = await API.graphql({
                query: createMessage,
                variables: {
                    input: {
                        // id is auto populated by AWS Amplify
                        content: messageText, // the message content the user submitted (from state)
                        chatRoomMessagesId: chatRoom.id,
                        userMessageId: user.id, // this is the id of the current user
                        status: "SENT",
                    },
                },
            });
            console.log("Created Message", created_message);
            if (false) {
                await API.graphql({
                    query: updateChatRoom,
                    variables: {
                        input: {
                            // id: chatroom.id,
                            // newMessages: 10,
                            // _version: 1,
                        },
                    },
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateChat = async (selected_user) => {
        console.log("handleCreateChat", chatRoomList, user.id, selected_user.id);

        // check if user logged and selected_user is already in chat room
        const userfoundchatroom = chatRoomList.find((room) => {
            if (!Boolean(room.group)) { // not group chat
                let needle = [user.id, selected_user.id];
                var haystack = room.chatRoomUsers.items.map(item => item.user.id);
                let result = needle.every(item => haystack.includes(item));
                return result;
            }
        });
        console.log('handleCreateChat Found', userfoundchatroom);
        if (!Boolean(userfoundchatroom)) {
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
            handleChatRoomID(userfoundchatroom.id);
        }
    };

    const handleChatRoom = async (chatroom) => {
        console.log("handleChatRoom", chatroom);
        setMessageList([]);
        setOpenChat(true);

        if (subCreateMessage) {
            subCreateMessage.unsubscribe();
        }
        if (subUpdateMessage) {
            subUpdateMessage.unsubscribe();
        }
        //console.log('Subscribe to onCreateMessageByChatRoomMessagesId');
        subCreateMessage = API.graphql(
            graphqlOperation(onCreateMessageByChatRoomMessagesId, {
                chatRoomMessagesId: chatroom.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onCreateMessageByChatRoomMessagesId", value);
                setMessageList((list) => [
                    ...list,
                    value.data.onCreateMessageByChatRoomMessagesId,
                ]);

                // TODO: set Read if your not the owner
                if (
                    user &&
                    user.id !==
                    value.data.onCreateMessageByChatRoomMessagesId
                        .userMessageId
                ) {
                    handleReadMessage(
                        value.data.onCreateMessageByChatRoomMessagesId.id
                    );
                }
            },
            error: (error) => console.warn(error),
        });

        //console.log('Subscribe to onUpdateMessageByChatRoomMessagesId');
        subUpdateMessage = API.graphql(
            graphqlOperation(onUpdateMessageByChatRoomMessagesId, {
                chatRoomMessagesId: chatroom.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateMessageByChatRoomMessagesId", value);
                // setMessageList((list) => [
                //     ...list,
                //     value.data.onUpdateMessageByChatRoomMessagesId,
                // ]);
                handleMessageStatusUpdates(
                    value.data.onUpdateMessageByChatRoomMessagesId.id,
                    value.data.onUpdateMessageByChatRoomMessagesId.status
                );
            },
            error: (error) => console.warn(error),
        });

        const result = await API.graphql(
            graphqlOperation(getChatRoom, {id: chatroom.id})
        );
        //console.log('getChatRoom', result.data.getChatRoom);
        //fetchMessages(chatroom.id);
        setMessageList(result.data.getChatRoom.messages.items);
        setChatRoom({
            id: result.data.getChatRoom.id,
            name: chatroom.name,
            users: result.data.getChatRoom.chatRoomUsers.items,
        });

        // Set All message to READ
        result.data.getChatRoom.messages.items.forEach((item) => {
            if (item.userMessageId !== user.id && item.status !== "READ") {
                //console.log('handleUnreadMessage', item);
                handleUnreadMessage(item.id);
            }
        });
    };

    const handleReadMessage = async (message_id) => {
        console.log("handleReadMessage", message_id);
        await API.graphql(
            graphqlOperation(updateMessage, {
                input: {
                    id: message_id,
                    status: "READ",
                    _version: 1,
                },
            })
        );
    };

    const handleUnreadMessage = async (message_id) => {
        console.log("handleUnreadMessage", message_id);
        await API.graphql(
            graphqlOperation(updateMessage, {
                input: {
                    id: message_id,
                    status: "READ",
                    _version: 1,
                },
            })
        );
    };

    const handleMessageStatusUpdates = async (message_id, message_status) => {
        console.log("handleMessageStatusUpdates", message_id);
        //const new_message_list = [...messageList];
        // console.log('Message List', messageList);
        setMessageList((list) =>
            list.map((item) =>
                item.id === message_id
                    ? {...item, status: message_status}
                    : item
            )
        );
    };

    // Open chat toggle
    const handleCloseChat = async () => {
        setOpenChat(false);
    }

    // open chat room using room ID
    const handleChatRoomID = async (id) => {
        console.log('handleChatRoomID', id);
        setOpenChat(true);
        setChatRoomID(id);
    }
    // OTHER FUNCTIONS
    const filterChatRoom = async (chatroom) => {
        // TODO: filter chatroom by graphQL
        // filter chatroom belong to user
        const filteredchatrooms = chatroom.filter((i) =>
            i.chatRoomUsers.items.find((j) => j.user.id === user.id)
        );

        const filtereduserchatrooms = filteredchatrooms.map((room) => {
            if (!Boolean(room.group)) {
                // Change name to the one you are chatting with
                const modifiedname = room.chatRoomUsers.items.find((item) => {
                    return item.user.id !== user.id ? item.user.name : "";
                });
                room.name = modifiedname.user.name;
            }
            return room;
        });
        //console.log('filtereduserchatrooms', filtereduserchatrooms);
        setChatRoomList([...filtereduserchatrooms]);
    };

    // const fetchMessages = async (chatroom_id) => {
    //     try {
    //         const request = await API.graphql({
    //             query: listMessages,
    //         });
    //         setMessageList([...request.data.listMessages.items]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    const fetchUser = async (user_id) => {
        if (!user_id) return;
        try {
            // get logged user from User Table to get status.
            const item = await API.graphql(
                graphqlOperation(userByClinicaID, {clinicaID: user_id})
            );
            if (item.data.userByClinicaID.items) {
                setUser(item.data.userByClinicaID.items[0]);
                return item.data.userByClinicaID.items[0];
            }
        } catch (e) {
            console.log(e);
        }
    };
    const fetchChatRoom = async () => {
        if (!user) return;
        //console.log('fetching users');
        try {
            const result = await API.graphql({
                query: listChatRooms,
            });
            //console.log('fetchChatRoom', result.data.listChatRooms.items, user.id);
            filterChatRoom(result.data.listChatRooms.items);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchUsers = async () => {
        //console.log('fetching users');
        try {
            const result = await API.graphql({
                query: listUsers,
            });
            setUserList([...result.data.listUsers.items]);
        } catch (error) {
            console.error(error);
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
        const user_id = localStorage.getItem("user_id");
        const auth_token = localStorage.getItem("auth_token");
        const refresh_token = localStorage.getItem("refresh_token");

        fetchUser(user_id).then((user_list) => {
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

        // Subscribe to creation of user
        subCreateUser = API.graphql(graphqlOperation(onCreateUser)).subscribe({
            next: ({provider, value}) => {
                setUserList((list) => [...list, value.data.onCreateUser]);
            },
            error: (error) => console.warn(error),
        });
        // Subscribe to update of chatroom
        subUpdateChatRoom = API.graphql(
            graphqlOperation(onUpdateChatRoom)
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateChatRoom", value.data.onUpdateChatRoom);
                // setUserList((list) => [
                //     ...list,
                //     value.data.onCreateUser,
                // ]);
            },
            error: (error) => console.warn(error),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch Users and Chatroom once user is loaded
    useEffect(() => {
        if (user) {
            console.log("USER: ", user.id);
            fetchUsers();
            fetchChatRoom();

            console.log(
                "Subscribe to onCreateChatRoomUserByChatRoomUserUserId"
            );
            subCreateChatRoomUser = API.graphql(
                graphqlOperation(onCreateChatRoomUserByChatRoomUserUserId, {
                    chatRoomUserUserId: user.id,
                })
            ).subscribe({
                next: ({provider, value}) => {
                    console.log(
                        "onCreateChatRoomUserByChatRoomUserUserId",
                        value
                    );
                    fetchChatRoom();
                },
                error: (error) => console.warn(error),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // open room when chatroom is loaded
    useEffect(() => {
        if (chatRoomList.length) {
            console.log("useEffect chatRoomList Loaded", chatRoomList, chatRoomID);
            if (chatRoomID) {
                const foundchatroom = chatRoomList.find(
                    (item) => item.id === chatRoomID
                );
                if (foundchatroom) {
                    console.log('useEffect handleChatRoom Found', chatRoomID);
                    handleChatRoom(foundchatroom);
                }
            }
        }
    }, [chatRoomID, chatRoomList]);

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
            <div className="relative flex flex-col flex-1" x-ref="contentarea">
                <main>
                    <div className="relative flex">
                        {/* Messages sidebar */}
                        <ChatSidebar
                            user={user}
                            chatRoomID={chatRoomID}
                            openChat={openChat}
                            setOpenChat={setOpenChat}
                            userList={userList}
                            chatRoomList={chatRoomList}
                            handleLogout={handleLogout}
                            handleChatRoom={handleChatRoom}
                            handleChatRoomID={handleChatRoomID}
                            handleCreateChat={handleCreateChat}
                        />

                        {/* Messages body */}
                        <ChatBody
                            user={user}
                            openChat={openChat}
                            chatRoom={chatRoom}
                            messageList={messageList}
                            handleSubmitMessage={handleSubmitMessage}
                            handleCloseChat={handleCloseChat}
                        />
                    </div>
                </main>
            </div>
        </div>

    );
};

export default Chat;
