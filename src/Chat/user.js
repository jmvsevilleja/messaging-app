import React from "react";
import Avatar from 'react-avatar';

function User({user, handleChat}) {
    return (
        <li>
            <div className="hover:bg-blue-100 rounded p-2 cursor-pointer flex items-center text-sm" onClick={() => {
                handleChat(user)
            }}>

                {user && <Avatar size="40" round={true} name={user.name} />}
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-medium text-base text-font ">{user.name}</span>
                    </div>
                    <span className="block mt-1 ml-2 text-sm text-font">{user.status}</span>
                </div>
            </div>
        </li>
    )
}

export default User

