import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from 'aws-amplify'
import {userByClinicaID, listUsers} from '../graphql/queries'
import {getChatRoom, listChatRooms} from '../graphql/custom-queries'
import {createMessage, createUser, createChatRoom, createChatRoomUser, updateMessage} from "../graphql/mutations";
import {
    onCreateUser,
    onCreateChatRoomUserByChatRoomUserUserId,
    onCreateMessageByChatRoomMessagesId,
    onUpdateMessageByChatRoomMessagesId
} from "../graphql/custom-subscriptions";
import {Dialog} from '@headlessui/react'

import Message from "./message";
import User from "./user";
import ChatRoom from "./chatroom";
import axios from "axios";
import "./index.css";
import Avatar from 'react-avatar';

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

let subCreateChatRoomUser;
let subCreateUser;
let subCreateMessage;
let subUpdateMessage;
let chatRoomID;

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [conversation, setConversation] = useState(false);
    const [chatRoom, setChatRoom] = useState({});

    //const [accounts, setAccounts] = useState({});

    let navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_login");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        eraseCookie("auth_login");
        eraseCookie("token");

        // unsubscribe on logout
        if (subCreateMessage) {
            subCreateMessage.unsubscribe();
        }
        if (subUpdateMessage) {
            subUpdateMessage.unsubscribe();
        }
        if (subCreateChatRoomUser) {
            subCreateChatRoomUser.unsubscribe();
        }
        if (subCreateUser) {
            subCreateUser.unsubscribe();
        }

        navigate(`/`);
    };

    const handleSubmitMessage = async (event) => {
        // Prevent the page from reloading
        event.preventDefault();
        setMessageText("");
        const input = {
            // id is auto populated by AWS Amplify
            content: messageText, // the message content the user submitted (from state)
            chatRoomMessagesId: chatRoom.id,
            userMessageId: user.id, // this is the id of the current user
            status: 'SENT'
        };
        // Try make the mutation to graphql API
        try {
            await API.graphql({
                query: createMessage,
                variables: {
                    input: input,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChat = async (item) => {
        // TODO: Check selected user if included in the chat room. HandleChatRoom or CreateChatRoom.
        console.log('handleChat', user.id, item.id);
        //listChatRooms
        // const customChatRooms = /* GraphQL */ `
        // query ListChatRooms($filter: ModelChatRoomFilterInput $limit: Int) {
        //   listChatRooms(filter: $filter, limit: $limit) {items {id name}}}`;

        // const chatrooms = await API.graphql({
        //     // query: customChatRooms,
        //     query: listChatRooms,
        //     variables: {
        //         filter: {chatRoomAdminId: {eq: user.id}},
        //     }
        // });
        // console.log(chatrooms);
        // if (chatrooms.data.listChatRooms.items.length) {
        //     //console.log('Chatroom ID:', chatrooms.data.listChatRooms.items[0]);
        //     handleChatRoom(chatrooms.data.listChatRooms.items[0]);

        // }
        //  else {
        if (true) {
            // Creating Chat Room
            const chatroom = await API.graphql(graphqlOperation(createChatRoom, {
                input: {
                    name: user.name + ' - ' + item.name,
                    chatRoomAdminId: user.id, // Creator of the Chatroom
                }
            }))
            console.log('createChatRoom', chatroom, chatroom.data.createChatRoom.id);
            //Creating Chat Room User
            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomUserUserId: user.id,
                    chatRoomChatRoomUsersId: chatroom.data.createChatRoom.id, // Relationship of Chatroom
                }
            }))
            //console.log('createChatRoomUser', chatroomadmin.data.createChatRoomUser.id);
            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomUserUserId: item.id,
                    chatRoomChatRoomUsersId: chatroom.data.createChatRoom.id, // Relationship of Chatroom
                }
            }))
            //console.log('createChatRoomUser', chatroomuser.data.createChatRoomUser.id);
            // Open ChatRoom with this Id
            chatRoomID = chatroom.data.createChatRoom.id;
            // }
        }

    };

    const handleChatRoom = async (chatroom) => {
        console.log('handleChatRoom', chatroom);
        setConversation(true);
        setMessageList([]);

        if (subCreateMessage) {
            subCreateMessage.unsubscribe();
        }
        if (subUpdateMessage) {
            subUpdateMessage.unsubscribe();
        }
        //console.log('Subscribe to onCreateMessageByChatRoomMessagesId');
        subCreateMessage = API.graphql(
            graphqlOperation(onCreateMessageByChatRoomMessagesId, {chatRoomMessagesId: chatroom.id})
        ).subscribe({
            next: ({provider, value}) => {
                console.log('onCreateMessageByChatRoomMessagesId', value)
                setMessageList((list) => [
                    ...list,
                    value.data.onCreateMessageByChatRoomMessagesId,
                ]);

                // TODO: set Read if your not the owner
                if (user && user.id !== value.data.onCreateMessageByChatRoomMessagesId.userMessageId) {
                    handleReadMessage(value.data.onCreateMessageByChatRoomMessagesId.id);
                }
            },
            error: (error) => console.warn(error),
        });

        //console.log('Subscribe to onUpdateMessageByChatRoomMessagesId');
        subUpdateMessage = API.graphql(
            graphqlOperation(onUpdateMessageByChatRoomMessagesId, {chatRoomMessagesId: chatroom.id})
        ).subscribe({
            next: ({provider, value}) => {
                console.log('onUpdateMessageByChatRoomMessagesId', value)
                // setMessageList((list) => [
                //     ...list,
                //     value.data.onUpdateMessageByChatRoomMessagesId,
                // ]);
                handleMessageStatusUpdates(
                    value.data.onUpdateMessageByChatRoomMessagesId.id,
                    value.data.onUpdateMessageByChatRoomMessagesId.status,
                );
            },
            error: (error) => console.warn(error),
        });

        const result = await API.graphql(graphqlOperation(getChatRoom, {id: chatroom.id}));
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
            if (item.userMessageId !== user.id && item.status !== 'READ') {
                //console.log('handleUnreadMessage', item);
                handleUnreadMessage(item.id);
            }
        })
    };

    const handleReadMessage = async (message_id) => {
        console.log('handleReadMessage', message_id);
        await API.graphql(graphqlOperation(updateMessage, {
            input: {
                id: message_id,
                status: 'READ',
                _version: 1,
            }
        }));
    };

    const handleUnreadMessage = async (message_id) => {
        console.log('handleUnreadMessage', message_id);
        await API.graphql(graphqlOperation(updateMessage, {
            input: {
                id: message_id,
                status: 'READ',
                _version: 1,
            }
        }));
    };

    const handleMessageStatusUpdates = async (message_id, message_status) => {
        console.log('handleMessageStatusUpdates', message_id);
        //const new_message_list = [...messageList];
        // console.log('Message List', messageList);
        setMessageList((list) => list.map(item =>
            item.id === message_id
                ? {...item, status: message_status}
                : item
        ));
    };

    const filterChatRoom = async (chatroom) => {
        // TODO: filter chatroom by graphQL
        // filter chatroom belong to user
        const filteredchatrooms = chatroom.filter((i) =>
            (i.chatRoomUsers.items.find(j => j.user.id === user.id)));

        const filtereduserchatrooms = filteredchatrooms.map(i => {
            if (i.chatRoomUsers.items.length === 2) {
                // Change name to the one you are chatting with
                const modifiedname = (i.chatRoomUsers.items.find(j => {
                    return j.user.id !== user.id ? j.user.name : '';
                }));
                i.name = modifiedname.user.name;
            }
            return i;
        });
        //console.log('filtereduserchatrooms', filtereduserchatrooms);
        setChatRoomList([...filtereduserchatrooms]);
    }

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const auth_token = localStorage.getItem("auth_token");
        const refresh_token = localStorage.getItem("refresh_token");

        fetchUser(user_id).then((user_list) => {
            if (user_id && auth_token && refresh_token) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user_list) {
                    fetchUserDetails(user_id, auth_token, refresh_token).then((user_detail) => {
                        const name = user_detail.first_name + ' ' + user_detail.last_name;
                        console.log('user not found create to users table', user_id, name);
                        addUser(user_id, name).then((result) => {
                            //console.log('user created', result);
                            setUser({
                                id: result.id,
                                clinicaID: user_id,
                                name: name
                            });
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

        // Subscribe to creation of user
        subCreateUser = API.graphql(
            graphqlOperation(onCreateUser)
        ).subscribe({
            next: ({provider, value}) => {
                setUserList((list) => [
                    ...list,
                    value.data.onCreateUser,
                ]);
            },
            error: (error) => console.warn(error),
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch Users and Chatroom once user is loaded
    useEffect(() => {
        if (user) {
            console.log('USER: ', user.id);
            fetchUsers();
            fetchChatRoom();

            console.log('Subscribe to onCreateChatRoomUserByChatRoomUserUserId');
            subCreateChatRoomUser = API.graphql(
                graphqlOperation(onCreateChatRoomUserByChatRoomUserUserId, {chatRoomUserUserId: user.id})
            ).subscribe({
                next: ({provider, value}) => {
                    console.log('onCreateChatRoomUserByChatRoomUserUserId', value);
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
            console.log('chatRoomList Loaded', chatRoomList, chatRoomID);
            if (chatRoomID) {
                const openchatroom = chatRoomList.find(i => i.id === chatRoomID);
                handleChatRoom(openchatroom);
                chatRoomID = null;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomList]);


    const fetchUserDetails = async (user_id, auth_token, refresh_token) => {
        if (!user_id || !auth_token || !refresh_token) return;
        try {
            return await axios({
                url: `https://n0mkkv2gg1.execute-api.ap-southeast-2.amazonaws.com/api/user-account`,
                method: 'GET',
                params: {userID: user_id},
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                    'X-REFRESH-TOKEN': refresh_token
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.data.message;
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }
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
            const item = await API.graphql(graphqlOperation(userByClinicaID, {clinicaID: user_id}));
            if (item.data.userByClinicaID.items) {
                setUser(item.data.userByClinicaID.items[0]);
                return item.data.userByClinicaID.items[0];
            }
        } catch (e) {
            console.log(e);
        }
    }
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
    }
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
    }
    const addUser = async (user_id, name) => {
        if (!user_id || !name) return;
        try {
            const item = await API.graphql({
                query: createUser,
                variables: {
                    input: {
                        clinicaID: user_id,
                        name: name,
                        status: 'Hi there! I\'m using Clinica Messenger'
                    },
                },
            });
            return item.data.createUser;
        } catch (err) {
            console.error(err);
        }

    }
    //console.log('Rendering index.js');
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Payment successful
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Your payment has been successfully submitted. We’ve sent you
                                an email with all of the details of your order.
                            </p>
                        </div>

                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                onClick={() => setIsOpen(false)}
                            >
                                Got it, thanks!
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
            <div className="min-h-screen flex flex-col">
                <div className="bg-cyan-600 flex-1">
                    {/* Header */}
                </div>
                <div className="bg-cyan-600 flex-1">
                    <div className="p-10 h-screen">
                        <div className="flex border rounded shadow-lg h-full">
                            <div className="w-1/3 flex flex-col bg-white border-r border-gray-300">
                                <div className="my-3 mx-3 ">
                                    <div className="flex justify-between item-center p-3 pl-0">
                                        <span className="flex items-center">
                                            {user && <Avatar size="40" round={true} name={user.name} />}
                                            <span className="block ml-2 font-bold text-base text-gray-600"> {user && user.name}</span>
                                            <span className="connected text-green-500 ml-2" >
                                                <svg width="6" height="6">
                                                    <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                                                </svg>
                                            </span>
                                        </span>
                                        <span>
                                            <button onClick={handleLogout} title="Logout" className="outline-none focus:outline-none self-end">
                                                <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                            </button>
                                        </span>
                                    </div>
                                    <div className="relative text-gray-600 focus-within:text-gray-400">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </span>
                                        <input aria-placeholder="Search" placeholder="Search"
                                            className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required autoComplete="search" />
                                    </div>
                                </div>

                                <ul className="overflow-auto">
                                    {Boolean(chatRoomList.length) && <h2 className="ml-3 mb-2 text-gray-600 text-lg my-2">Chat Room</h2>}

                                    {user && chatRoomList
                                        .filter(item => {
                                            return item.id !== user.id
                                        })
                                        // sort user by name
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((item) => (
                                            <ChatRoom
                                                user={item}
                                                handleChatRoom={handleChatRoom}
                                                key={item.id}
                                            // unread={12}
                                            />
                                        ))}
                                </ul>

                                <ul className="overflow-auto">
                                    <h2 className="ml-3 mb-2 text-gray-600 text-lg my-2">Users</h2>

                                    {user && userList
                                        .filter(item => {
                                            return item.id !== user.id
                                        })
                                        // sort user by name
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((item) => (
                                            <User
                                                user={item}
                                                handleChat={handleChat}
                                                key={item.id}
                                            />
                                        ))}
                                </ul>
                            </div>
                            <div className="w-2/3 flex flex-col bg-white">

                                {!conversation &&
                                    <div className="h-screen w-full flex flex flex-col justify-center items-center">
                                        <div className=""><img
                                            className="h-80 w-80"
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
                                            alt=""
                                        /></div>
                                    </div>
                                }
                                {conversation &&
                                    <div className="w-full h-full flex flex-col">
                                        <div className="justify-between item-center border-b border-gray-300 p-3">
                                            <span className="flex items-center">
                                                {chatRoom && <Avatar size="40" round={true} name={chatRoom.name} />}
                                                <span className="block ml-2 font-bold text-base text-gray-600"> {chatRoom && chatRoom.name}</span>

                                                <span className="connected text-green-500 ml-2" >
                                                    <svg width="6" height="6">
                                                        <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                                                    </svg>
                                                </span>
                                            </span>
                                        </div>
                                        <div id="chat" className="h-full p-5 overflow-y-auto relative flex-col-reverse flex text-center scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100" >
                                            {messageList
                                                // sort messages oldest to newest client-side
                                                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                                                .map((message) => (
                                                    // map each message into the message component with message as props
                                                    <Message
                                                        message={message}
                                                        chatroom={chatRoom}
                                                        user_id={user.id}
                                                        key={message.id}
                                                    />
                                                ))}
                                        </div>
                                        <form onSubmit={handleSubmitMessage} className="w-full flex py-3 px-3 items-center justify-between border-t border-gray-300">
                                            <button className="outline-none focus:outline-none">
                                                <svg className="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                            <button className="outline-none focus:outline-none ml-1">
                                                <svg className="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                </svg>
                                            </button>

                                            <input
                                                value={messageText}
                                                onChange={(e) => setMessageText(e.target.value)}
                                                aria-placeholder="Write message..."
                                                placeholder="Write message..."
                                                className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
                                                type="text"
                                                id="message"
                                                name="message"
                                                autoFocus
                                                required
                                                autoComplete="off"
                                            ></input>

                                            <button className="outline-none focus:outline-none" type="submit" title="Submit">
                                                <svg className="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                                </svg>
                                            </button>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                    </div >
                </div>
                <div className="bg-cyan-600 flex-1">
                    {/* Footer */}
                </div>
            </div>



        </>
    )
}

export default Chat
