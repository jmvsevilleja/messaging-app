import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from 'aws-amplify'
import {userByUserID, listMessages} from '../graphql/queries'
import {createMessage, createUser} from "../graphql/mutations";
import {onCreateMessage, onCreateUser} from "../graphql/subscriptions";

import Message from "./message";
import axios from "axios";
import "./index.css";

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

const Chat = () => {
    const [stateMessages, setStateMessages] = useState([]);
    const [stateUsers, setStateUsers] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [user, setUser] = useState(null);
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

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const auth_token = localStorage.getItem("auth_token");
        const refresh_token = localStorage.getItem("refresh_token");

        fetchUser(user_id).then((user) => {
            if (user_id && auth_token && refresh_token) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user) {
                    console.log('user not found create to users table');
                    fetchUserDetails(user_id, auth_token, refresh_token).then((user_details) => {
                        const name = user_details.first_name + ' ' + user_details.last_name
                        addUser(user_id, name).then(() => {
                            console.log('user created');
                            setUser({
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
        });

        // Subscribe to creation of message
        API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next: ({provider, value}) => {
                setStateMessages((stateMessages) => [
                    ...stateMessages,
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
                console.log(value.data.onCreateUser);
                // setStateUsers((stateUsers) => [
                //     ...stateUsers,
                //     value.data.onCreateUser,
                // ]);
            },
            error: (error) => console.warn(error),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserDetails = async (user_id, auth_token, refresh_token) => {
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
            setStateMessages([...messagesReq.data.listMessages.items]);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUser = async (user_id) => {
        try {
            // get logged user from User Table to get status.
            const user = await API.graphql(graphqlOperation(userByUserID, {userID: user_id}));
            if (user.data.userByUserID.items) {
                setUser(user.data.userByUserID.items[0]);
                return user.data.userByUserID.items[0];
            }
        } catch (e) {
            console.log(e);
        }
    }

    const addUser = async (user_id, name) => {
        if (!user_id || !name) return;
        try {
            await API.graphql({
                query: createUser,
                variables: {
                    input: {
                        userID: user_id,
                        name: name,
                        status: 'Hi there! I\'m using Clinica Messenger'
                    },
                },
            });
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <>
            <div className="min-h-screen flex flex-col text-center">
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
                                    <li>
                                        <a className="hover:bg-gray-100  px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" href="/#">
                                            <img className="h-10 w-10 rounded-full object-cover"
                                                src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                                alt="username" />
                                            <div className="w-full pb-2">
                                                <div className="flex justify-between">
                                                    <span className="block ml-2 font-semibold text-base text-gray-600 ">Mark</span>
                                                    <span className="block ml-2 text-sm text-gray-600">5 minutes</span>
                                                </div>
                                                <span className="block ml-2 text-sm text-gray-600">Hello world!!</span>
                                            </div>
                                        </a>
                                        <a className="bg-gray-100 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" href="/#">
                                            <img className="h-10 w-10 rounded-full object-cover"
                                                src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                                alt="username" />
                                            <div className="w-full pb-2">
                                                <div className="flex justify-between">
                                                    <span className="block ml-2 font-semibold text-base text-gray-600 ">Jess</span>
                                                    <span className="block ml-2 text-sm text-gray-600">15 minutes</span>
                                                </div>
                                                <span className="block ml-2 text-sm text-gray-600">I am fine</span>
                                            </div>
                                        </a>
                                        <a className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" href="/#" >
                                            <img className="h-10 w-10 rounded-full object-cover"
                                                src="https://images.pexels.com/photos/6238133/pexels-photo-6238133.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                                                alt="username" />
                                            <div className="w-full pb-2">
                                                <div className="flex justify-between">
                                                    <span className="block ml-2 font-semibold text-base text-gray-600 ">Celia</span>
                                                    <span className="block ml-2 text-sm text-gray-600">1 hour</span>
                                                </div>
                                                <span className="block ml-2 text-sm text-gray-600">Last message</span>
                                            </div>
                                        </a>
                                    </li>
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
                                        {stateMessages
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
