import React from "react";
import Image from "./image";
import File from "./file";
import MessageDropdown from "./messageDropdown"

function handleDownloadFile(url, name) {
    fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('Download failed. Please try again.'));
}

function Message({user_id, message, chatroom}) {

    const names = Object.fromEntries((chatroom.users.map(item => [item.user.id, item.user.name])));

    const isme = user_id === message.userMessageId;
    var dateobj = new Date(message.createdAt);
    const created = dateobj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});

    return (
        <div
            className={
                "flex flex-col float-right m-2 " + (isme ? "justify-end items-end" : "justify-start items-start mr-14")
            }
        >

            {!isme && <p className="text-xs text-primary dark:text-white font-medium">{names[message.userMessageId]}</p>}

            {message.type === 'AUDIO' && message.audio &&
                <div className={"flex w-full relative " + (isme ? "justify-end items-end" : "justify-start items-start")}>
                    <audio className="my-2 inline-flex mr-8" src={message.audio.path} controls controlsList="nodownload noplaybackrate" />
                    <MessageDropdown isme={isme} message={message} />
                </div>
            }
            {message.type === 'IMAGE' && message.image &&
                <div className="relative">
                    <div>
                        {message.image.map((file, index) => {
                            return (file && file.name && file.path &&
                                <div className="flex items-center w-48 m-2 mx-0" key={file.name}>
                                    <Image file={file} src={file.path} />
                                    <button className=" text-gray-400 hover:text-gray-500 rounded border-gray-400 border ml-2"
                                        onClick={(e) => {
                                            handleDownloadFile(file.path, file.name);
                                        }}
                                    >
                                        <div className="sr-only">Download</div>

                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                </div>

                            )
                        })}
                    </div>
                    <MessageDropdown isme={isme} message={message} />
                </div>
            }
            {message.type === 'FILE' && message.file &&
                <div>
                    {message.file.map((file, index) => {
                        return (file && file.name && file.path &&
                            <div className="flex items-center m-2 mx-0 relative" key={file.name}>
                                <File file={file} src={file.path}
                                    handleDownloadFile={handleDownloadFile} />
                                <MessageDropdown isme={isme} message={message} />
                            </div>

                        )
                    })}
                </div>
            }
            {message.content && <div className="relative">
                {(message.type === "TEXT" || message.type === "LINK") && <MessageDropdown isme={isme} message={message} />}
                <div className={"pr-8 break-normal xs:break-normal xl:max-w-xl shadow-md mb-1 rounded-lg p-2 text-base text-left" + (isme ? " text-white bg-primary rounded-tr-none" : " text-primary bg-gray-100 dark:bg-gray-200 rounded-tl-none")}>
                    <p className={"text-sm xs:text-base" + (message.type === "LINK" ? " break-all" : "")}>{message.content}</p>
                </div></div >}
            <div className="flex items-center justify-between">
                {message.bookmark &&
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mx-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                }
                <div className="mt-1 mr-1 text-xs text-gray-500 font-normal">{created}</div>
                {isme && message.status === "SENT" &&
                    <svg
                        className="w-3 h-3 shrink-0 fill-current text-gray-400"
                        viewBox="0 0 12 12"
                    >
                        <path
                            d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                        />
                    </svg>
                }
                {isme && message.status === "READ" &&
                    <svg
                        className="w-5 h-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 20 12"
                    >
                        <path
                            d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z"
                        />
                    </svg>
                }
            </div>
        </div>
    );
}

export default Message;