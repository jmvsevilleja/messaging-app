import React, {useEffect, useState} from "react";
function ChatInfo({
    user,
    openInfo,
    handleCloseInfo
}) {

    return (
        <div
            id="rightsidebar"
            className={"bg-white dark:bg-slate-900  z-20 w-full md:w-64 lg:w-80 xl:w-96 md:static top-auto bottom-auto border-0 border-gray-200 dark:border-gray-500"
                + (openInfo ? " translate-x-0 md:border-l" : " translate-x-64 !w-0")}
        >

            <div className="justify-between item-center p-5 py-5 xs:py-8">
                <div className="flex justify-between items-center" >

                    <div className="font-bold text-gray-600"></div>
                    <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={handleCloseInfo}
                    >
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center p-5 pt-0">

            </div>
        </div >
    );
}

export default ChatInfo;
