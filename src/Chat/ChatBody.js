import React, {useEffect, useState} from "react";
import {API, graphqlOperation} from "aws-amplify";
import {
    createMessage,
    updateChatRoomUser
} from "../graphql/custom-mutations";

import Avatar from "react-avatar";

import Message from "./message";
import Image from "./image";
import AudioRecorder from "./AudioRecorder";
import AudioPlayer from "./AudioPlayer";

import ConvoLogo from '../logo.svg';
import axios from "axios";
import Resizer from "react-image-file-resizer";

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            1440,
            1080,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });

function ChatBody({
    nectus,
    user,
    chatRoom,
    openChat,
    messageList,
    handleCloseChat
}) {

    const [messageText, setMessageText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [userTyping, setUserTyping] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [isUploading, setIsUploading] = useState(false);


    const messageInput = React.useRef(null);
    const fileRef = React.useRef();
    const imageRef = React.useRef();

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        if (isUploading) {return;}
        // prepare input
        const input = {
            content: messageText, // the message content the user submitted (from state)
            chatRoomMessagesId: chatRoom.id,
            userMessageId: user.id, // this is the id of the current user
            status: "SENT",
            type: "TEXT",
        }
        // check if its a link message
        const has_url = messageText.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
        if (has_url !== null) {
            input.type = "LINK";
        }

        // prepare needed attachments
        if (selectedImages.length !== 0) {
            // Upload file before submitting
            input.type = "IMAGE";
            input.image = await Promise.all(selectedImages.map(async (file, key) => {
                console.log("Image file", file, file.type);
                setIsUploading(true);
                return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/attachment`, {
                    filename: file.name
                }, {headers: {"X-ROUTE": "public"}}).then(async res => {
                    if (res.status === 200) {
                        const {presigned_url, public_url, filename} = res.data.message;
                        console.log('Uploading ... ', filename);
                        return await axios.put(presigned_url, file, {headers: {"Content-Type": file.type}}).then(async res => {
                            if (res.status === 200) {
                                console.log("Upload Success", filename, public_url);
                                return {
                                    name: filename,
                                    path: public_url
                                }
                            }
                        });
                    }
                });
            }));
        }

        if (selectedFiles.length !== 0) {
            input.type = "FILE";
            input.file = await Promise.all(selectedFiles.map(async (file, key) => {
                console.log("Document file", file, file.type);
                setIsUploading(true);
                return axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/attachment`, {
                    filename: file.name
                }, {headers: {"X-ROUTE": "public"}}).then(async res => {
                    if (res.status === 200) {
                        const {presigned_url, public_url, filename} = res.data.message;
                        console.log('Uploading ... ', filename);
                        return await axios.put(presigned_url, file, {headers: {"Content-Type": file.type}}).then(async res => {
                            if (res.status === 200) {
                                console.log("Upload Success", filename, public_url);
                                return {
                                    name: filename,
                                    path: public_url
                                }
                            }
                        });
                    }
                });
            }));
        }

        if (recordedAudio) {
            input.type = "AUDIO";
            setIsUploading(true);
            const filename = 'audio-file-' + Date.now() + '.mp3';
            input.audio = await axios.post(`https://wcbv7e9z4d.execute-api.ap-southeast-2.amazonaws.com/api/attachment`, {
                filename: filename
            }, {headers: {"X-ROUTE": "public"}}).then(async res => {
                if (res.status === 200) {
                    const {presigned_url, public_url} = res.data.message;
                    console.log('Uploading ... ', filename);
                    return await axios.put(presigned_url, recordedAudio, {headers: {"Content-Type": recordedAudio.type}}).then(async res => {
                        if (res.status === 200) {
                            console.log("Upload Success", filename, public_url);
                            return {
                                name: filename,
                                path: public_url
                            }
                        }
                    });
                }
            });
        }

        try {
            const created_message = await API.graphql({
                query: createMessage,
                variables: {
                    input: input,
                },
            });
            console.log("Created Message", created_message, chatRoom);
            handleResetChat();
            setMessageText("");
            if (messageText) {
                messageInput.current.focus();
            }
        } catch (err) {
            console.error(err);
        }
    };
    const handleDeleteChat = () => {
        console.log('Delete Chat');
    }
    const handleResetChat = () => {
        setIsUploading(false);
        setSelectedFiles([]);
        setSelectedImages([]);
        setRecordedAudio(null);
        messageInput.current.required = true;
        imageRef.current.value = null;
        fileRef.current.value = null;
    }
    const handleAudioUpload = (audio) => {
        setSelectedImages([]);
        setSelectedFiles([]);
        setRecordedAudio(null);
        messageInput.current.required = false;
        setRecordedAudio(audio);
    };
    const handleFileUpload = (e) => {
        if (e.target.files.length === 0) return;
        setSelectedImages([]);
        setRecordedAudio(null);
        messageInput.current.required = false;
        setSelectedFiles([...e.target.files]);
    };
    const handleImageUpload = async (e) => {
        if (e.target.files.length === 0) return;
        setSelectedFiles([]);
        setRecordedAudio(null);
        messageInput.current.required = false;
        fileRef.current.value = null;
        const resized_images = await Promise.all([...e.target.files].map(async (item) => {
            return await resizeFile(item);
        }));
        setSelectedImages(resized_images);
    };
    const handleDeleteFileUpload = (e, index) => {
        const new_files = selectedFiles.filter((item, i) => i !== index);
        if (!Boolean(new_files.length)) {
            fileRef.current.value = null;
            messageInput.current.required = true;
        }
        setSelectedFiles(new_files);
    }
    const handleDeleteImageUpload = (e, index) => {
        const new_files = selectedImages.filter((item, i) => i !== index);
        if (!Boolean(new_files.length)) {
            imageRef.current.value = null;
            messageInput.current.required = true;
        }
        setSelectedImages(new_files);
    }
    const handleDeleteAudioUpload = (e) => {
        messageInput.current.required = true;
        setRecordedAudio(null);
    }

    const handleTyping = async (focused) => {
        if (focused) {
            if (!isTyping) {
                handleTypingUpdate(true);
            }
        }
        if (!(focused)) {
            if (isTyping) {
                handleTypingUpdate(false);
            }

        };
    }
    const handleTypingUpdate = (typing) => {
        console.log('handleTypingUpdate', typing);
        const typist = chatRoom.users.find((item) => (user.id === item.user.id));
        if (!typist) return;
        API.graphql(
            graphqlOperation(updateChatRoomUser, {
                input: {
                    id: typist.id,
                    typing: typing
                },
            })
        );
        setIsTyping(typing);
    };

    useEffect(() => {
        if (!chatRoom.users) return;
        const online = chatRoom.users.find((item) => (user.id !== item.user.id && item.user.online));
        const typing = chatRoom.users.filter((item) => (user.id !== item.user.id && item.user.online && item.typing));
        //console.log('isOnline', online);
        setIsOnline(online);
        //console.log('isTyping', typing, chatRoom.users);
        setUserTyping("");
        if (typing && typing.length) {
            if (typing.length === 1) {
                setUserTyping(typing[0].user.name + " is typing");
            }
            if (typing.length > 1) {
                setUserTyping("+" + typing.length + " others are typing");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoom]);

    useEffect(() => {
        if (messageList.length) {
            handleResetChat();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageList]);
    return (
        <div
            className="bg-white grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out h-screen overflow-hidden  border-0 md:border-l-2 border-gray-200"
        >
            {!nectus || !(openChat || Object.keys(chatRoom).length !== 0) && (
                <div className="h-screen w-full flex flex-col justify-center items-center p-2">
                    <div className="">
                        <img className=" w-96" src={ConvoLogo} alt="Conva" />
                    </div>
                </div>
            )}
            {Object.keys(chatRoom).length !== 0 && (
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="justify-between item-center border-b border-gray-300 p-3 xs:p-5">
                        <span className="flex items-center overflow-hidden">
                            {!nectus && <button
                                className="md:hidden text-gray-400 hover:text-gray-500 mr-4"
                                onClick={handleCloseChat}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <svg
                                    className="w-6 h-6 fill-current"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
                                    />
                                </svg>
                            </button>}
                            {chatRoom && (
                                <div className="relative">
                                    <Avatar
                                        size="40"
                                        round={true}
                                        name={chatRoom.name}
                                    />
                                    <div className={"absolute bottom-0 right-1 w-3 h-3 border-2 border-white rounded-full " + (isOnline ? "bg-green-500" : "bg-gray-500")}></div>
                                </div>
                            )}
                            <div className="w-full overflow-hidden">
                                <div className="flex items-center">
                                    <span className="block ml-2 font-bold text-base text-gray-600">
                                        {" "}
                                        {chatRoom && chatRoom.name}
                                    </span>

                                </div>
                                {chatRoom.group &&
                                    <span className="block ml-2 text-sm text-gray-600 truncate overflow-hidden">
                                        {chatRoom.users
                                            .sort((a, b) => b.user.name.localeCompare(a.user.name))
                                            .map((item) => (
                                                item.user.name
                                            )).join(", ")}
                                    </span>}
                            </div>
                            <div className="flex"
                                onClick={() => {
                                    handleDeleteChat();
                                }}>
                                <button className="text-gray-400 hover:text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                            </div>
                        </span>
                    </div>
                    <div
                        id="chat"
                        className="h-full p-5 overflow-y-auto relative flex-col-reverse flex text-center scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 xl:px-32"
                    >
                        {messageList
                            // sort messages oldest to newest client-side
                            .sort((a, b) =>
                                b.createdAt.localeCompare(
                                    a.createdAt
                                )
                            )
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
                    {userTyping &&
                        <div className="flex justify-center items-center absolute inset-x-0 bottom-16">
                            <div>
                                <svg
                                    className="fill-current text-primary"
                                    viewBox="0 0 15 3"
                                    width="30"
                                    height="10"
                                >
                                    <circle cx="1.5" cy="1.5" r="1.5">
                                        <animate
                                            attributeName="opacity"
                                            dur="1s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.1"
                                        />
                                    </circle>
                                    <circle cx="7.5" cy="1.5" r="1.5">
                                        <animate
                                            attributeName="opacity"
                                            dur="1s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.2"
                                        />
                                    </circle>
                                    <circle cx="13.5" cy="1.5" r="1.5">
                                        <animate
                                            attributeName="opacity"
                                            dur="1s"
                                            values="0;1;0"
                                            repeatCount="indefinite"
                                            begin="0.3"
                                        />
                                    </circle>
                                </svg>
                            </div>
                            <div className="text-sm text-primary ml-2">{userTyping}</div>
                        </div>}
                    {selectedFiles.length !== 0 && <div className="absolute inset-x-0 bottom-16 bg-white bg-opacity-90 overflow-y-auto scrollable  p-2">
                        {selectedFiles.map((file, index) => {
                            return (
                                <div key={file.name}>
                                    <div className="m-1 inline-flex break-all shadow-md mb-1 rounded-lg p-2 text-sm text-left text-gray-500 bg-gray-50 rounded-tl-none">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>

                                                <div className="mx-2">{file.name}</div>
                                            </div>
                                            {!isUploading && <button className="text-gray-400 hover:text-gray-500" onClick={(e) => {
                                                handleDeleteFileUpload(e, index);
                                            }}>
                                                <div className="sr-only">Close</div>
                                                <svg className="w-4 h-4 fill-current">
                                                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                                </svg>
                                            </button>}
                                            {isUploading && <div className="text-gray-500"><svg fill='none' className="w-8 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                                <path clipRule='evenodd'
                                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                    fill='currentColor' fillRule='evenodd' />
                                            </svg></div>}

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                    {selectedImages.length !== 0 && <div className="flex justify-start md:justify-center items-center absolute inset-x-0 bottom-16 bg-white bg-opacity-90 overflow-y-auto scrollable  p-2">
                        {selectedImages.map((file, index) => {
                            const objectURL = URL.createObjectURL(file);
                            return (
                                <div key={file.name}>
                                    <div className="relative w-40 mx-2">
                                        {!isUploading && <button className="absolute top-1 right-2 text-white hover:text-gray-400 drop-shadow"
                                            onClick={(e) => {
                                                URL.revokeObjectURL(objectURL);
                                                handleDeleteImageUpload(e, index);
                                            }}
                                        >
                                            <div className="sr-only">Close</div>
                                            <svg className="w-4 h-4 fill-current">
                                                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                                            </svg>
                                        </button>}
                                        <Image file={file} src={objectURL} />
                                        {isUploading && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"><svg fill='none' className="w-14 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                            <path clipRule='evenodd'
                                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                fill='currentColor' fillRule='evenodd' />
                                        </svg></div>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                    {recordedAudio && <div className="absolute inset-x-0 bottom-16 bg-white bg-opacity-90 p-2">
                        <AudioPlayer recordedAudio={recordedAudio} isUploading={isUploading} handleDeleteAudioUpload={handleDeleteAudioUpload} />
                    </div>}
                    <form
                        onSubmit={(e) => {
                            handleSubmitMessage(e, messageText);
                        }}
                        className="w-full flex py-3 px-3 items-center justify-between"
                    >
                        <input
                            ref={imageRef}
                            multiple={true}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageUpload} />
                        <button className="outline-none focus:outline-none text-gray-400 hover:text-gray-500"
                            onClick={() => imageRef.current.click()}
                            type="button"
                            title="Attach Image"
                        >
                            <svg
                                className=" h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </button>
                        <input
                            ref={fileRef}
                            multiple={true}
                            type="file"
                            accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                            hidden
                            onChange={handleFileUpload} />
                        <button
                            className="outline-none focus:outline-none ml-1 text-gray-400 hover:text-gray-500"
                            onClick={() => fileRef.current.click()}
                            type="button"
                            title="Attach File"
                        >

                            <svg
                                className=" h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                        </button>

                        <input
                            value={messageText}
                            onChange={(e) => {
                                setMessageText(e.target.value);
                                handleTyping(true);
                            }
                            }
                            aria-placeholder="Write a message..."
                            placeholder="Write a message..."
                            className="py-2 mx-3 pl-5 block w-full text-sm xs:text-normal rounded-full bg-gray-100  border-none outline-0 focus:text-gray-700"
                            type="text"
                            id="message"
                            name="message"
                            required
                            autoComplete="off"
                            ref={messageInput}
                            onBlur={() => {
                                handleTyping(false);
                            }}
                        ></input>
                        <AudioRecorder handleAudioUpload={handleAudioUpload} />
                        <button
                            className="hidden xs:block outline-none focus:outline-none text-gray-400 hover:text-gray-500"
                            type="submit"
                            title="Send"
                        >

                            <svg
                                className="h-7 w-7 origin-center transform rotate-90"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>

                        </button>
                    </form>
                </div>
            )
            }
        </div >
    )
}

export default ChatBody
