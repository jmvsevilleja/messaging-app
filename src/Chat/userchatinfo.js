import React, {useState} from "react";
import Avatar from 'react-avatar';

function User({user, admin, you}) {
    return (
        <li>
            <div
                className="w-full p-2 my-1 flex justify-center items-center overflow-hidden text-sm focus:outline-none"
            >
                <div className="relative">
                    {user && <Avatar size="40" round={true} name={user.name} />}
                    <div className={"absolute bottom-0 right-1 w-3 h-3 border-2 border-white rounded-full " + (user.online ? "bg-green-500" : "bg-gray-500")}></div>
                </div>
                <div className="w-full overflow-hidden">
                    <div className="flex justify-between overflow-hidden">
                        <span className="block ml-2 font-medium text-base text-gray-600 text-left">{user.name}</span>
                    </div>
                </div>
                <div className="text-right">
                    {admin && < div className="text-md text-primary font-bold">Admin</div>}
                    {you && <div className="text-md">You</div>}
                </div>
            </div>
        </li >
    )
}

export default User

