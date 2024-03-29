import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

// import {getUserById, getAccountById, getChatRooms, getMessages} from "../api/queries";
// import {addUser, editUser, editMessage, editChatRoom} from "../api/mutations";
// import {
//     subOnUpdateUser,
//     subOnCreateChatRoomUser,
//     subOnCreateChatRoomUserByChatRoomUserUserId,
//     subOnUpdateChatRoom,
//     subOnCreateMessageByChatRoomMessagesId,
//     subOnUpdateMessageByChatRoomMessagesId,
//     subOnUpdateChatRoomUserByChatRoomChatRoomUsersId,
// } from "../api/subscriptions";

import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInfo from "./ChatInfo";
import "./index.css";

let subscriptions = {};

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [user, setUser] = useState(null);
    const [chatRoom, setChatRoom] = useState({});
    const [openChat, setOpenChat] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const [forceOpenChat, setForceOpenChat] = useState(false);
    const [chatRoomID, setChatRoomID] = useState(null);
    let navigate = useNavigate();

    // HANDLE FUNCTIONS
    const toggleDarkMode = async () => {
        setDarkMode((val) => {
            localStorage.setItem("dark_mode", !val);
            return !val
        });
    }

    useEffect(() => {
        setDarkMode(localStorage.getItem("dark_mode") === "true");
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_login");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        document.cookie = "auth_login=; Max-Age=-99999999;";
        document.cookie = "token=; Max-Age=-99999999;";
        // unsubscribe
        delete subscriptions.interval;
        for (const item in subscriptions) {
            if (subscriptions[item]) {
                subscriptions[item].unsubscribe();
            }
        }
        handleUserOnline(false);
        navigate(`/`);
    };

    const handleUserOnline = (online) => {
        if (!user) return;
        // update offline status
        // editUser({
        //     id: user.id,
        //     online: online,
        //     lastOnlineAt: Math.round(new Date().getTime() / 1000)
        // })
    };

    // const handleCreateUser = async (user_id) => {
    //     getAccountById(user_id).then((user_detail) => {
    //         if (user_detail) {
    //             const name = user_detail.first_name + " " + user_detail.last_name;
    //             console.log("user not found create to users table", user_id, name);
    //             addUser(user_id, name).then((result) => {
    //                 //console.log('user created', result);
    //                 setUser({
    //                     id: result.id,
    //                     name: name,
    //                     status: result.status
    //                 });
    //             });
    //         }
    //     }
    //     );
    // };

    // const handleUnsubscribeChatRoom = () => {
    //     ['sub11', 'sub12', 'sub13'].forEach((item) => {
    //         if (subscriptions[item]) {
    //             subscriptions[item].unsubscribe();
    //         }
    //     });
    // }

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
            //newMessages: chatroom.newMessages,
            chatRoomAdminId: chatroom.chatRoomAdminId,
            imageUri: chatroom.imageUri,
        });
        setMessageList([{
            id: 1,
            type: "TEXT",
            content: "Hello",
            createdAt: "123",
        }, {
            id: 2,
            content: "Hello World",
            type: "TEXT",
            createdAt: "234",

        }, {
            id: 2,
            content: "Goodbye...",
            type: "TEXT",
            createdAt: "234",
        }, {
            id: 2,
            audio: {
                name: "audio",
                path: "https://file-examples.com/storage/fef1706276640fa2f99a5a4/2017/11/file_example_MP3_700KB.mp3",

            },
            type: "AUDIO",
            createdAt: "234",
        }, {
            id: 2,
            image: [{
                name: "image",
                path: "https://fujifilm-x.com/wp-content/uploads/2021/01/gfx100s_sample_04_thum-1.jpg",

            }],
            type: "IMAGE",
            createdAt: "234",
        }]);
        // TODO: load the next 100 messages on scroll
        // getMessages(chatroom.id).then((messages) => {
        //     setMessageList(messages);
        //     // Set All message to READ
        //     messages.forEach((item) => {
        //         if (item.userMessageId !== user.id && item.status !== "READ") {
        //             //console.log('handleUnreadMessage', item);
        //             handleUnreadMessage(item.id);
        //         }
        //     });
        //     // remove counter when messages are read
        //     messages.find((item) => {
        //         if (item.userMessageId !== user.id && item.status !== "READ") {
        //             // update removing counter
        //             handleCounterMessage(chatroom.id);
        //             return true;
        //         }
        //         return false;
        //     });
        // });

        // SUBSCRIPTIONS
        // handleUnsubscribeChatRoom();

        // subscriptions.sub11 = subOnCreateMessageByChatRoomMessagesId(chatroom.id, ((value) => {
        //     setMessageList((list) => [
        //         ...list,
        //         value,
        //     ]);
        //     // set READ if your not the owner
        //     if (user && user.id !== value.userMessageId) {
        //         handleUnreadMessage(value.id);
        //     }
        // }));
        // subscriptions.sub12 = subOnUpdateMessageByChatRoomMessagesId(chatroom.id, ((value) => {
        //     if (value.userMessageId === user.id) {
        //         // Update all unread message status
        //         if (value.status === 'READ') {
        //             setMessageList((list) =>
        //                 list.map((item) => item.id === value.id
        //                     ? {...item, status: value.status}
        //                     : item)
        //             );
        //             if (user && user.id === value.userMessageId) {
        //                 // update removing counter
        //                 handleCounterMessage(value.chatRoom.id);
        //             }
        //         }
        //     }
        //     // remove deleted message
        //     if (value.deleted) {
        //         setMessageList((list) =>
        //             list.filter((item) => !(item.id === value.id && !item.deleted))
        //         );
        //         return;
        //     }
        //     // update bookmark message
        //     setMessageList((list) =>
        //         list.map((item) => item.id === value.id
        //             ? {...item, bookmark: value.bookmark}
        //             : item)
        //     );
        // }));
        // subscriptions.sub13 = subOnUpdateChatRoomUserByChatRoomChatRoomUsersId(chatroom.id, ((value) => {
        //     // update typing/deleted in current chatroom
        //     setChatRoom((items) => {
        //         return {
        //             ...items,
        //             users: items.users ? (items.users.map((item) =>
        //                 (item.id === value.id) ? {
        //                     ...item,
        //                     typing: value.typing,
        //                     deleted: value.deleted,
        //                     notification: value.notification
        //                 } : item
        //             )) : null
        //         }
        //     });
        //     // update deleted in chatroomlist
        //     setChatRoomList((list) => list.map((item) => {
        //         return {
        //             ...item,
        //             chatroom: {
        //                 ...item.chatroom,
        //                 chatRoomUsers: {
        //                     ...item.chatroom.chatRoomUsers,
        //                     items: (item.chatroom.chatRoomUsers.items.map((item) =>
        //                         (item.id === value.id) ? {
        //                             ...item,
        //                             deleted: value.deleted,
        //                             notification: value.notification,
        //                         } : item
        //                     ))
        //                 }
        //             }
        //         };
        //     }));
        //     // exit chatroom
        //     if (value.deleted && value.chatRoomUserUserId === user.id) {
        //         console.log('Chatroom exited', value.chatRoomUserUserId)
        //         setChatRoomID(null);
        //         setOpenChat(false);
        //         setOpenInfo(false);
        //         setChatRoom({});
        //         getChatRooms(user.id).then((result) => {
        //             updateChatRoomList(result);
        //         });
        //         handleUnsubscribeChatRoom();
        //     }
        //     // if (!value.deleted && value.chatRoomUserUserId === user.id) {
        //     //     console.log('Chatroom added', value.chatRoomUserUserId);
        //     //     getChatRooms(user.id).then((result) => {
        //     //         updateChatRoomList(result);
        //     //     });
        //     // }
        // }));
    };

    // const handleCounterMessage = async (chatroom_id) => {
    //     console.log("handleCounterMessage", chatroom_id);
    //     editChatRoom({
    //         id: chatroom_id,
    //         newMessages: 0,
    //     });
    // };

    // const handleUnreadMessage = async (message_id) => {
    //     console.log("handleUnreadMessage", message_id);
    //     editMessage({
    //         id: message_id,
    //         status: "READ",
    //     });
    // };

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

    // // OTHER FUNCTIONS
    const updateChatRoomList = async (chatroom) => {
        console.log('chatroom', chatroom);
        // const name_chatroom = chatroom.map((room) => {
        //     if (!Boolean(room.chatroom.group)) {
        //         // Change name to the one you are chatting with
        //         const found_user = room.chatroom.chatRoomUsers.items.find((item) => {
        //             return item.user.id !== user.id ? item.user.name : "";
        //         });
        //         if (found_user) {
        //             room.chatroom.name = found_user.user.name;
        //             room.chatroom.imageUri = found_user.user.imageUri;
        //         }
        //     }
        //     return room;
        // });
        // console.log('updateChatRoomList', name_chatroom);
        setChatRoomList([...chatroom]);
    };

    // USE EFFECTS
    useEffect(() => {
        //if (user) return;
        //const user_id = localStorage.getItem("user_id");
        // const auth_token = localStorage.getItem("auth_token");
        // const refresh_token = localStorage.getItem("refresh_token");
        setUser({
            id: "123",
            name: "Jess Mark",
            status: "online"
        });
        // getUserById(user_id).then((user_found) => {
        //     setUser(user_found);
        //     if (user_id) {
        //         // check if logged user is in  users table. create if not found and query user details.
        //         if (!user_found) {
        //             handleCreateUser(user_id);
        //         }
        //         // 'user found proceed to chat'
        //     } else {
        //         // 'auth not found goto login'
        //         navigate(`/`);
        //         return;
        //     }
        // });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch Users and Chatroom once user is loaded
    useEffect(() => {
        if (!user) return;

        console.log("USER: ", user.id);

        // // update online status every 15 min
        // handleUserOnline(true);
        // subscriptions.interval = setInterval(function () {
        //     handleUserOnline(true);
        // }, 900000);

        // getChatRooms(user.id).then((result) => {
        //     updateChatRoomList(result);
        // });
        updateChatRoomList([{
            id: 1,
            chatroom: {
                id: 1,
                name: "Chat Room 1",
                online: true,
                group: true,
                newMessages: "0",
                lastMessage: "Hello worldz!!",
                updatedAt: 123123,
                chatRoomUsers: {
                    items: [
                        {user: {id: 1, name: "Jess", online: true}},
                        {user: {id: 2, name: "Mark"}}
                    ]
                },
            },

        }, {
            id: 2,
            chatroom: {
                id: 2,
                name: "Chat Room 2",
                online: true,
                group: true,
                newMessages: 3,
                lastMessage: "Goodbye...",
                updatedAt: 23423432,
                chatRoomUsers: {
                    items: [
                        {user: {id: 1, name: "User1", online: true}},
                        {user: {id: 2, name: "User2"}}
                    ]
                },
            }
        }]);
        // // SUBSCRIPTIONS
        // // when adding chatroom user
        // subscriptions.sub1 = subOnCreateChatRoomUser(((value) => {
        //     //console.log('subOnCreateChatRoomUser VALUE', value);
        //     // getChatRooms(user.id).then((result) => {
        //     //     updateChatRoomList(result);
        //     // });
        //     setChatRoom((item) => {
        //         if (item && item.id === value.chatRoomChatRoomUsersId) {
        //             item.users = [...item.users, value];
        //         }
        //         return item;
        //     });
        //     setRender(new Date().getTime());
        // }));

        // // // when creting chatroom
        // // subscriptions.sub2 = subOnCreateChatRoomUserByChatRoomUserUserId(user.id, ((value) => {
        // //     getChatRooms(user.id).then((result) => {
        // //         updateChatRoomList(result);
        // //         if (value.chatRoomUserUserId !== user.id) {
        // //             handleChatRoomID(value.chatRoomChatRoomUsersId);
        // //         }
        // //     });
        // // }));

        // // when updating user profile
        // subscriptions.sub3 = subOnUpdateUser(((value) => {
        //     setUser((item) => {
        //         if (item.id === value.id) {
        //             item.name = value.name
        //             item.status = value.status
        //             item.imageUri = value.imageUri
        //         }
        //         return item;
        //     })
        //     setChatRoomList((list) => list.map((items) => {
        //         return {
        //             ...items,
        //             chatroom: {
        //                 ...items.chatroom,
        //                 chatRoomUsers: {
        //                     ...items.chatroom.chatRoomUsers,
        //                     items: (items.chatroom.chatRoomUsers.items.map((item) =>
        //                         (item.user.id === value.id) ? {
        //                             ...item,
        //                             user: {
        //                                 ...item.user,
        //                                 online: value.online,
        //                                 name: value.name,
        //                                 status: value.status,
        //                                 imageUri: value.imageUri
        //                             }
        //                         } : item
        //                     ))
        //                 }
        //             }
        //         };
        //     }));
        //     // update online in current chatroom
        //     setChatRoom((items) => {
        //         if (items.users) {
        //             return {
        //                 ...items,
        //                 users: (items.users.map((item) =>
        //                     (item.user.id === value.id) ? {
        //                         ...item,
        //                         user: {
        //                             ...item.user,
        //                             online: value.online,
        //                             name: value.name,
        //                             status: value.status,
        //                             imageUri: value.imageUri
        //                         }
        //                     } : item
        //                 ))
        //             }
        //         }
        //         return {
        //             ...items,
        //         }
        //     });
        // }));
        // // when chatroom is updated
        // subscriptions.sub4 = subOnUpdateChatRoom(((value) => {
        //     // when chatroom is deleted
        //     if (value.deleted === true) {
        //         setChatRoom((item) => {
        //             if (item && item.id === value.id) {
        //                 console.log('Chatroom deleted', item.id)
        //                 setChatRoomID(null);
        //                 setOpenChat(false);
        //                 setOpenInfo(false);
        //                 // getChatRooms(user.id).then((result) => {
        //                 //     updateChatRoomList(result);
        //                 // });
        //                 return {};
        //             }
        //             return item;
        //         });
        //     }
        //     // when chatroom name/image is updated
        //     if (value.group && value.deleted !== true) {
        //         setChatRoom((item) => {
        //             if (item && item.id === value.id) {
        //                 return {
        //                     ...item,
        //                     name: value.name,
        //                     imageUri: value.imageUri,
        //                 }
        //             }
        //             return item;
        //         });
        //     }

        //     // Filter non deleted and update chatroom
        //     setChatRoomList((list) => list.filter((item) => !(item.chatroom.id === value.id
        //         && value.deleted === true))
        //         .map((item) => (item.chatroom.id === value.id)
        //             ? {
        //                 ...item,
        //                 chatroom: {
        //                     ...item.chatroom,
        //                     lastMessage: value.lastMessage,
        //                     newMessages: value.newMessages,
        //                     updatedAt: value.updatedAt,
        //                     ...(value.group ? {
        //                         name: value.name,
        //                         imageUri: value.imageUri
        //                     } : {})
        //                 }
        //             }
        //             : item));

        //     // notify recipients for new messages
        //     setLastNotif((message) => {
        //         console.log('Notification', lastNotif, message, value.lastMessage);
        //         if (message !== value.lastMessage) {
        //             const user_notif = value.chatRoomUsers.items.find((items) => (items.chatRoomUserUserId === user.id && items.notification));
        //             if (value.lastMessageBy !== user.id && user_notif && value.lastMessage) {
        //                 console.log('Notification', user_notif, value.newMessages);
        //                 if (Notification.permission === 'granted') {
        //                     navigator.serviceWorker.getRegistration().then(function (reg) {
        //                         reg.showNotification("Message from " + value.name, {icon: "/icon-512x512.png", body: value.lastMessage});
        //                     });
        //                 }
        //             }
        //         }
        //         return value.lastMessage;
        //     });
        // }));
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
                //console.log('useEffect handleChatRoom Found', user_found);
                if (user_found) {
                    console.log('useEffect handleChatRoom Found', chatRoomID);
                    handleChatRoom(user_found.chatroom);
                    setForceOpenChat(false);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomID, forceOpenChat, chatRoomList]);

    // useEffect(() => {
    //     // Notification.requestPermission(function (status) {
    //     //     console.log('Notification permission status:', status);
    //     // });
    //     // TODO: offline when on browser close
    //     return () => {

    //         console.log('UNMOUNTED');
    //         //unsubscribe
    //         if (subscriptions.interval) {
    //             clearInterval(subscriptions.interval);
    //         }
    //         delete subscriptions.interval;
    //         for (const item in subscriptions) {
    //             if (subscriptions[item]) {
    //                 subscriptions[item].unsubscribe();
    //             }
    //         }
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    //console.log('Rendering index.js');
    return (
        <div className={"flex h-screen overflow-hidden" + ((darkMode) ? " dark" : "")}>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-hidden">
                <main>
                    <div className="relative flex">
                        {/* Messages sidebar */}
                        <ChatSidebar
                            user={user}
                            chatRoomID={chatRoomID}
                            openChat={openChat}
                            setOpenChat={setOpenChat}
                            chatRoomList={chatRoomList}
                            handleLogout={handleLogout}
                            handleChatRoom={handleChatRoom}
                            handleChatRoomID={handleChatRoomID}
                            toggleDarkMode={toggleDarkMode}
                            darkMode={darkMode}
                        />

                        {/* Messages body */}
                        <ChatBody
                            nectus={false}
                            user={user}
                            openChat={openChat}
                            chatRoom={chatRoom}
                            messageList={messageList}
                            handleCloseChat={handleCloseChat}
                            handleOpenInfo={handleOpenInfo}
                            handleLogout={handleLogout}
                        />
                    </div>
                </main>
            </div>
            {chatRoom && chatRoom.users &&
                <ChatInfo
                    user={user}
                    openInfo={openInfo}
                    chatRoom={chatRoom}
                    chatRoomList={chatRoomList}
                    messageList={messageList}
                    handleCloseInfo={handleCloseInfo}
                />}
        </div>
    );
};

export default Chat;
