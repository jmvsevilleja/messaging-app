import React, {useEffect, useState} from "react";
import './chat.css';
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from 'aws-amplify'
import {getUser} from '../../graphql/queries'
import Message from "./message";
import {listMessages} from "../../graphql/queries";
import {createMessage} from "../../graphql/mutations";
import {onCreateMessage} from "../../graphql/subscriptions";

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

const Chat = () => {
    const [stateMessages, setStateMessages] = useState([]);
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
            owner: user.name, // this is the username of the current user
        };
        console.log(input);
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
        fetchUser().then(() => {
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

    }, []);

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

    const fetchUser = async () => {
        try {
            const user = await API.graphql(graphqlOperation(getUser, {id: '55b5409c-df3f-40f8-a484-2eadb7ff3775'}));
            //console.log(user);
            setUser(user.data.getUser);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className={'background'}>
                <div className={'container'}>
                    <h1 className="text-3xl font-bold underline">Messanging App</h1>
                    <div className={'chatbox'}>

                        {stateMessages
                            // sort messages oldest to newest client-side
                            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                            .map((message) => (
                                // map each message into the message component with message as props
                                <Message
                                    message={message}
                                    user={user}
                                    isMe={user.name === message.owner}
                                    key={message.id}
                                />
                            ))}
                    </div>
                    <div >
                        <div className={'formContainer'}>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="message"
                                    name="message"
                                    autoFocus
                                    required
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Type your message here"
                                />
                                <button>Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Chat
