import React, {useEffect} from "react";
import Avatar from "react-avatar";
import QRCode from "react-qr-code";

function ChatSettingQR({
    user,
    openSettingQR,
    handleCloseSettingQR,
}) {
    // const [userStatus, setUserStatus] = useState(user.status);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar  bg-gray-100  duration-200 ease-in-out " + (openSettingQR ? "translate-x-0" : "-translate-x-full")}
            >
                <div className="justify-between item-center p-5 bg-white">
                    <div className="flex items-center" >
                        <button
                            className="text-gray-400 hover:text-gray-500 mr-4"
                            onClick={handleCloseSettingQR}
                        >
                            <span className="sr-only">Close Setting</span>
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
                                />
                            </svg>

                        </button>
                        <div className=" font-bold text-gray-600">Setting</div>
                    </div>
                </div>
                <div className="justify-between item-center p-5">
                    <div className="flex justify-center -mb-10">
                        <Avatar
                            size="80"
                            round={true}
                            name={user.name}
                        />
                    </div>
                    <div className="bg-white rounded-3xl px-4 py-8 m-4">
                        <div className="flex justify-center mb-5 relative text-gray-600 ">
                            {user.name}
                        </div>

                        <div className="flex justify-center" >
                            <QRCode value={user.id} size={150} />
                        </div>
                    </div>
                    <div className="text-center text-gray-600 p-4 text-sm">
                        Your QR Code is private. If you share it with someone, they can scan it with their Conva App camera to add you as contact
                    </div>


                </div>

            </div>

        </div>);
}

export default ChatSettingQR;
