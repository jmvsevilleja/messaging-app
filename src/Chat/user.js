import React from "react";
import "./message.css";

export default function Message({user, handleChat}) {
    return (
        <li>
            <a className="hover:bg-gray-100  px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" onClick={() => {
                handleChat(user)
            }}>
                <img className="h-10 w-10 rounded-full object-cover"
                    src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="username" />
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-base text-gray-600 ">{user.name}</span>
                        <span className="block ml-2 text-sm text-gray-600">5 minutes</span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">{user.status}</span>
                </div>
            </a>
        </li>
    );
}

