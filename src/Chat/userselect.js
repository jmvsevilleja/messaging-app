import React from "react";
import Avatar from 'react-avatar';

function User({user, handleSelected}) {
    return (
        <li>
            <label className="flex items-center  justify-between hover:bg-violet-100 rounded p-2 cursor-pointer text-sm">
                <span className="flex items-center">
                    {user && <Avatar size="40" round={true} name={user.name} />}
                    <span className="block ml-2 font-medium text-base text-font ">{user.name}</span>
                </span>
                <span>
                    <input type="checkbox" value={user.id} className="w-4 h-4 rounded-md focus:ring-1 text-violet-600" />
                </span>
            </label>
        </li >
    )
}

export default User

