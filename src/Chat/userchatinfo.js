import React from "react";
import Picture from "./Picture";

function User({user, admin, you}) {
    return (
        <li>
            <div
                className="w-full p-2 my-1 flex justify-center items-center overflow-hidden text-sm focus:outline-none"
            >
                <Picture
                    name={user.name}
                    image={user.imageUri}
                    online={user.online}
                />
                <div className="w-full overflow-hidden">
                    <div className="flex justify-between overflow-hidden">
                        <span className="block ml-2 font-medium text-base text-gray-600 dark:text-slate-400 text-left">{user.name}</span>
                    </div>
                </div>
                <div className="text-right">
                    {admin && < div className="text-md text-primary dark:text-white font-bold">Admin</div>}
                    {you && <div className="text-md dark:text-slate-400">You</div>}
                </div>
            </div>
        </li >
    )
}

export default User

