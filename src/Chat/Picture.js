import React from 'react'
import Avatar from 'react-avatar';

function Picture({name, image, online, big, small}) {
    return (<>

        {!big && !small && <div className="relative">
            {!image && <Avatar size="40" round={true} name={name} />}
            {image && <div className="w-12"><img
                src={image}
                className="rounded-full object-cover h-12 w-12"
            /></div>}
            <div className={"absolute bottom-0 right-1 w-3 h-3 border-2 border-white rounded-full " + (online ? "bg-green-500" : "bg-gray-500")}></div>
        </div>}

        {big && <div className="relative">
            {!image && <Avatar size="100" round={true} name={name} />}
            {image && <div className="w-24"><img
                src={image}
                className="rounded-full object-cover h-24 w-24"
            /></div>}
        </div>}
        {small && <div className="relative">
            {!image && <Avatar size="40" round={true} name={name} />}
            {image && <div className="w-12"><img
                src={image}
                className="rounded-full object-cover h-12 w-12"
            /></div>}
        </div>}
    </>)
}

export default Picture