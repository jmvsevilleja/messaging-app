import React from "react";
import Picture from "./Picture";

function User({user, selectedUsers, handleSelectedUsers}) {
    return (
        <li>
            <label className="flex items-center  justify-between hover:bg-indigo-100 rounded p-2 cursor-pointer text-sm">
                <span className="flex items-center">

                    <Picture
                        name={user.name}
                        image={user.imageUri}
                        small={true}
                    />

                    <span className="block ml-2 font-medium text-base text-gray-600">{user.name}</span>
                </span>
                <span>
                    <input
                        type="checkbox"
                        name="participants"
                        value={user.id}
                        className="w-4 h-4 rounded-md focus:ring-1 text-primary" onChange={(e) => {
                            handleSelectedUsers(e, user);
                        }}
                        checked={Boolean(selectedUsers.find((item) => item.id === user.id))}
                    />
                </span>
            </label>
        </li >
    )
}

export default User

