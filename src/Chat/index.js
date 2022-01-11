import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from 'aws-amplify'
import {userByUserID, listMessages, listUsers} from '../graphql/queries'
import {createMessage, createUser} from "../graphql/mutations";
import {onCreateMessage, onCreateUser} from "../graphql/subscriptions";
import {Dialog} from '@headlessui/react'

import Message from "./message";
import User from "./user";
import axios from "axios";
import "./index.css";

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
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
        navigate(`/`);
    };

    const handleSubmit = async (event) => {
        // Prevent the page from reloading
        event.preventDefault();

        // clear the textbox
        setMessageText("");
        const input = {
            // id is auto populated by AWS Amplify
            message: messageText, // the message content the user submitted (from state)
            owner: user.name,
            userId: user.id, // this is the username of the current user
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
        console.log('handleChat', item);
    };

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const auth_token = localStorage.getItem("auth_token");
        const refresh_token = localStorage.getItem("refresh_token");

        fetchUser(user_id).then((user_list) => {
            if (user_id && auth_token && refresh_token) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user_list) {
                    //console.log('user not found create to users table');
                    fetchUserDetails(user_id, auth_token, refresh_token).then((user_detail) => {
                        const name = user_detail.first_name + ' ' + user_detail.last_name
                        addUser(user_id, name).then((result) => {
                            //console.log('user created', result);
                            setUser({
                                id: result.id,
                                userID: user_id,
                                name: name
                            });
                        });
                    });
                }
                // 'user found proceed to chat'
            } else {
                // 'auth not found goto login'
                navigate(`/`);
            }
            fetchMessages();
            fetchUsers();
        });

        // Subscribe to creation of message
        API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next: ({provider, value}) => {
                setMessageList((list) => [
                    ...list,
                    value.data.onCreateMessage,
                ]);
            },
            error: (error) => console.warn(error),
        });


        // Subscribe to creation of user
        API.graphql(
            graphqlOperation(onCreateUser)
        ).subscribe({
            next: ({provider, value}) => {
                // const found = userList.find(o => o.id === value.data.onCreateUser.id);
                // console.log(found);
                // if(!found)
                setUserList((list) => [
                    ...list,
                    value.data.onCreateUser,
                ]);
            },
            error: (error) => console.warn(error),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    const fetchMessages = async () => {
        try {
            const messagesReq = await API.graphql({
                query: listMessages,
            });
            setMessageList([...messagesReq.data.listMessages.items]);
        } catch (error) {
            console.error(error);
        }
    }
    const fetchUser = async (user_id) => {
        if (!user_id) return;
        try {
            // get logged user from User Table to get status.
            const item = await API.graphql(graphqlOperation(userByUserID, {userID: user_id}));
            if (item.data.userByUserID.items) {
                setUser(item.data.userByUserID.items[0]);
                return item.data.userByUserID.items[0];
            }
        } catch (e) {
            console.log(e);
        }
    }
    const fetchUsers = async () => {
        //console.log('fetching users');
        try {
            const messagesReq = await API.graphql({
                query: listUsers,
            });
            setUserList([...messagesReq.data.listUsers.items]);
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
                        userID: user_id,
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
                    <div className="p-10 self-center">
                        <div className="grid grid-cols-3 min-w-full border rounded">
                            <div className="col-span-1 bg-white border-r border-gray-300 ">
                                <div className="my-3 mx-3 ">
                                    <div className="relative text-gray-600 focus-within:text-gray-400">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </span>
                                        <input aria-placeholder="Search" placeholder="Search"
                                            className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required autoComplete="search" />
                                    </div>
                                </div>

                                <ul className="overflow-auto">
                                    <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>

                                    {user && userList
                                        .filter(item => {
                                            return item.id != user.id
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
                            <div className="col-span-2 bg-white">
                                <div className="w-full ">
                                    <div className="flex justify-between item-center border-b border-gray-300 p-3">
                                        <span className="flex items-center">
                                            <img className="h-10 w-10 rounded-full object-cover"
                                                src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                                alt="username" />
                                            <span className="block ml-2 font-bold text-base text-gray-600"> {user && user.name}</span>
                                            <span className="connected text-green-500 ml-2" >
                                                <svg width="6" height="6">
                                                    <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
                                                </svg>
                                            </span>
                                        </span>
                                        <span>
                                            <button onClick={handleLogout} className="outline-none focus:outline-none self-end">
                                                <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
                                            </button>
                                        </span>
                                    </div>

                                    <div id="chat" className="w-full overflow-y-auto p-10 relative flex-col-reverse flex text-center scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 max-h-96" >
                                        {messageList
                                            // sort messages oldest to newest client-side
                                            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                                            .map((message) => (
                                                // map each message into the message component with message as props
                                                <Message
                                                    message={message}
                                                    user={user}
                                                    isMe={user.userId === message.userId}
                                                    key={message.id}
                                                />
                                            ))}
                                    </div>
                                    <form onSubmit={handleSubmit} className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">

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

                                        <button className="outline-none focus:outline-none" type="submit">
                                            <svg className="text-gray-400 h-7 w-7 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                            </svg>
                                        </button>
                                    </form>

                                </div>
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
