import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {encrypt} from "../utilities/icloud";
import {checkAccount} from "./api/api";
import {checkSubscription} from "../api/api";
import {useNavigate} from "react-router-dom";

function AddAccount({handleClinicaSignIn, handleCreateAccount, handleClinicaSignOut}) {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isSub, setIsSub] = useState(false);
    const [checking, setChecking] = useState(false);
    const [relogin, setRelogin] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        navigate(`/chat`);
    }
    const handleSubscription = async () => {
        const user_id = localStorage.getItem("user_id");
        const code = localStorage.getItem("code");
        const ip = localStorage.getItem("ip");
        window.open(`https://www.clinicapay.com/pricing?product=prod_L84vb6dsVu8iu2&code=${code}&ip_address=${ip}&user_id=${user_id}`, "_blank");

    };

    const handleCheckSubscription = () => {
        // check subscription before signin
        setChecking(true);
        const user_id = localStorage.getItem("user_id");
        console.log(user_id);
        if (!user_id) {
            setRelogin(true);
        }
        if (user_id) {
            checkSubscription(user_id, (result) => {
                if (!result) {
                    setRelogin(true);
                }
            }).then((apps) => {
                if (apps) {
                    // find Email Service subscription
                    const conva = apps.find((item) => (item.application.id === "2f7a4695-6ccb-467a-b1eb-d9f0394529bf"));
                    if (conva) {
                        setChecking(false);
                        setIsSub(true);
                        return;
                    }
                }
                setChecking(false);
            });
        }
    }
    const handleAddAccount = async (event) => {
        event.preventDefault();
        console.log('handleAddAccount', userEmail);
        // prevent double submit
        if (loading || error) return;

        if (!(userEmail && userPassword)) {
            setError("Please enter your email and password");
            return;
        }

        if ((userEmail)) {
            var re = /\S+@\S+\.\S+/;
            if (!re.test(userEmail)) {
                setError("Invalid email");
                return;
            }
        }
        //console.log(userEmail && userPassword);
        setLoading(true);
        const encrypted = encrypt({username: userEmail, password: userPassword});
        //console.log('Encrypted', encrypted);
        localStorage.setItem("clinica", encrypted);

        checkAccount((result) => {
            if (result) {
                handleClinicaSignIn();
            } else {
                handleClinicaSignOut();
                setError("Failed to sign in. Please check your credentials and try again.");
            }
            setLoading(false);
        });

    }
    const handleReset = () => {
        setLoading(false);
        setIsOpen(false);
        setUserEmail("");
        setRelogin(false);
        setError("");
    }
    return (
        <>
            <button
                type="button"
                onClick={() => {
                    handleCheckSubscription();
                    setIsOpen(true);
                }}
                className="outline-none bg-white text-gray-600 font-base rounded font-base py-2 px-4 border shadow-md text-base"
                title="Add Account"
            >Connect your Clinica Account</button>
            {
                isOpen && <Dialog
                    open={isOpen}
                    onClose={() => {
                        handleReset();
                    }}
                    className="fixed z-30 inset-0 overflow-y-auto"
                >
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                            <Dialog.Title
                                as="h3"
                                className="mb-3 text-lg font-medium leading-6 text-gray-600"
                            >Clinica Technologies Account
                            </Dialog.Title>
                            {error &&
                                <div className="px-4 py-2 rounded-sm text-sm bg-red-100 border border-red-200 text-red-600">
                                    <div className="flex w-full justify-between items-start">
                                        <div className="flex">
                                            <svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
                                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
                                            </svg>
                                            <div>{error}</div>
                                        </div>
                                        <button className="opacity-70 hover:opacity-80 ml-3 mt-[3px]"
                                            onClick={() => {
                                                setError("");
                                            }}>
                                            <div className="sr-only">Close</div>
                                            <svg className="w-4 h-4 fill-current">
                                                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>}

                            <form
                                onSubmit={(e) => {
                                    handleAddAccount(e);
                                }}
                            >
                                {relogin && <div className="flex flex-col justify-center">
                                    <div className="pt-5 pb-10 text-center">
                                        Your session is expired. Please relogin to continue.
                                    </div>
                                    <div className="flex self-end">
                                        <button
                                            type="button"
                                            className="bg-primary hover:bg-secondary text-white font-base w-30 py-2 px-4 rounded"
                                            onClick={() => {
                                                handleLogout();
                                            }}>
                                            <span className="py-2">Relogin</span>
                                        </button>
                                    </div>
                                </div>}
                                {checking && !relogin && <div className="flex flex-col justify-center">
                                    <div className="text-primary mt-5"><svg fill='none' className="w-28 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                        <path clipRule='evenodd'
                                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                            fill='currentColor' fillRule='evenodd' />
                                    </svg></div>
                                    <div className="py-5 flex justify-center text-center">
                                        Checking Clinica Email Service Subscription
                                    </div>

                                </div>}
                                {!checking && isSub && < div className="relative text-gray-600">
                                    <input
                                        aria-placeholder="Email"
                                        placeholder="Email"
                                        type="text"
                                        className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                        onChange={(e) => {
                                            setError("");
                                            setUserEmail(e.target.value);
                                        }}
                                        value={userEmail}
                                    /><input
                                        aria-placeholder="Password"
                                        placeholder="Password"
                                        type="password"
                                        className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                        onChange={(e) => {
                                            setError("");
                                            setUserPassword(e.target.value);
                                        }}
                                        value={userPassword}
                                    />
                                    <div className="text-sm text-center my-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsOpen(false);
                                                handleCreateAccount();
                                            }}
                                            className="text-primary">Create an account</button>
                                    </div>
                                </div>
                                }

                                {!checking && isSub && <div className="mt-4 flex flex-col">
                                    <div className="flex self-end">
                                        <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                            onClick={() => {
                                                handleReset();
                                            }}>
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 rounded">

                                            {loading && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                                <path clipRule='evenodd'
                                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                    fill='currentColor' fillRule='evenodd' />
                                            </svg>}
                                            {!loading && <span className="py-2">Sign In</span>}
                                        </button>

                                    </div>
                                </div>}

                                {!checking && !relogin && !isSub && <div className="flex flex-col justify-center">
                                    <div className="py-10 flex justify-center text-center">
                                        Sorry, you are not currently subscribed. <br /> To continue using email services, <br />please subscribe to our Clinica Email Service App.
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
                            </form>
                        </div>
                    </div>
                </Dialog >
            }
        </>
    )
}

export default AddAccount