import React, {useState} from "react";
import {Dialog} from "@headlessui/react";
import Iframe from 'react-iframe'
import {checkSubscription} from "../api/api";

function Connect({user, chatRoom}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isSub, setIsSub] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleOpenConnect = async (e) => {
        setChecking(true);
        setIsSub(true);
        checkSubscription(user.id).then((apps) => {
            if (apps) {
                // find Connect App subscription
                const connect = apps.find((item) => (item.application.id == "893ae9d6-27c7-446d-9ac0-c49c38cc63e7"));
                if (connect) {
                    setIsOpen(true);
                    return;
                }
            }
            setChecking(false);
        });

    };

    const user_id = localStorage.getItem("user_id");
    const code = localStorage.getItem("code");
    const ip = localStorage.getItem("ip");
    const to = chatRoom.users.find((item) => {
        return (item.user.id !== user.id)
    });
    const from = chatRoom.users.find((item) => {
        return (item.user.id === user.id)
    });

    const handleSubscription = async () => {
        window.open(`https://www.clinicapay.com/pricing?product=prod_L84vb6dsVu8iu2&code=${code}&ip_address=${ip}&user_id=${user_id}`, "_blank");

    };
    const transaction_id = to.user.id;

    // Date.now().toString().substring(0, 4) +
    // Date.now().toString().substring(9);
    const iframe_url = `https://develop.d9jtdzsj058zk.amplifyapp.com/login/true/${user_id}/${ip}/${code}/null/null?to=${to.user.id}&to_name=${to.user.name}&from=${from.user.id}&from_name=${from.user.name}&transaction_id=${transaction_id}&app=conva`;

    return (
        <>
            {!chatRoom.group && <div className="flex mx-1"
                onClick={handleOpenConnect}>
                <button className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                </button>
            </div>}
            {!chatRoom.group && <div className="flex mx-1 mr-4"
                onClick={handleOpenConnect}>
                <button className="text-primary hover:text-secondary dark:text-secondary dark:hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                </button>
            </div>}
            <Dialog
                open={isSub}
                onClose={() => {
                    setIsSub(false)
                }}
                className="fixed z-30 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                        <div className="text-gray-400 hover:text-gray-500 relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSub(false);
                                }}
                                className="absolute -right-2 -top-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {checking && <div className="flex flex-col justify-center">
                            <div className="text-primary mt-5"><svg fill='none' className="w-28 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                <path clipRule='evenodd'
                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                    fill='currentColor' fillRule='evenodd' />
                            </svg></div>
                            <div className="py-5 flex justify-center text-center">
                                Checking Clinica Connect subscription
                            </div>

                        </div>}
                        {!checking && <div className="flex flex-col justify-center">
                            <div className="py-10 flex justify-center text-center">
                                Sorry, you are not currently subscribed. <br /> To continue using audio and video calls, <br />Please subscribe to our Clinica Connect App.
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    handleSubscription();
                                }}
                                className="bg-primary hover:bg-secondary text-white font-base p-2 px-4 rounded">
                                <span className="py-2">Get Subscription</span>
                            </button>
                        </div>}
                    </div>
                </div>
            </Dialog>
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
                            height="100%"
                            allow="camera *;microphone *"
                        />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Connect