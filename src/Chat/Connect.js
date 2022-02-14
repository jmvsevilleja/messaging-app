import React, {useState} from "react";
import {Dialog} from "@headlessui/react";
import Iframe from 'react-iframe'

function Connect({user, chatRoom}) {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenConnect = async (e) => {
        setIsOpen(true);
    };

    const user_id = localStorage.getItem("user_id");
    const code = localStorage.getItem("code");
    const to = chatRoom.users.find((item) => {
        return (item.user.id != user.id)
    }).user.id;
    const transaction_id =
        Date.now().toString().substring(0, 4) +
        Date.now().toString().substring(9);
    const iframe_url = `https://clinicaconnect.com/login/true/${user_id}/112.204.187.130/${code}?to=${to}&transaction_id=${transaction_id}&from=conva`;

    return (
        <>
            {!chatRoom.group && <div className="flex mx-1"
                onClick={handleOpenConnect}>
                <button className="text-primary hover:text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                </button>
            </div>}
            {!chatRoom.group && <div className="flex mx-1 mr-4"
                onClick={handleOpenConnect}>
                <button className="text-primary hover:text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                </button>
            </div>}
            <Dialog
                open={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
                className="fixed z-30 inset-0 overflow-y-auto"
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <div className="inline-block w-full min-h-screen overflow-hidden text-left align-middle transition-all transform bg-white">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 absolute right-2 top-2 z-10 bg-white rounded-full "
                        onClick={() => {
                            setIsOpen(false)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="my-0 mx-0">
                        <Iframe url={iframe_url}
                            position="absolute"
                            width="100%"
                            id="myId"
                            className="myClassname"
                            height="100%" />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Connect