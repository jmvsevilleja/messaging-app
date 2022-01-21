import React, {useState} from "react";
import Avatar from 'react-avatar';

function User({user, handleCreateChat}) {

    const [loading, setLoading] = useState(false);

    return (
        <li>
            <button
                className="hover:bg-indigo-100 w-full rounded p-2 cursor-pointer flex items-center text-sm focus:outline-none"
                onClick={() => {
                    if (!loading) {
                        setLoading(true);
                        handleCreateChat(user).then(() => {
                            // prevent double submit
                            setLoading(false);
                        });
                    }
                }}
            >

                {user && <Avatar size="40" round={true} name={user.name} />}
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-medium text-base text-gray-600 text-left">{user.name}</span>
                    </div>
                    <span className="block mt-1 ml-2 text-sm text-gray-600 text-left">{user.status}</span>
                </div>
                {loading && <svg className="w-10 animate-spin text-primary" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd'
                        d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                        fill='currentColor' fill-rule='evenodd' />
                </svg>}
            </button>
        </li>
    )
}

export default User

