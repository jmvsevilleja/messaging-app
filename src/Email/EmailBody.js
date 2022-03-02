import React, {useEffect, useState} from "react";

import ConvoLogo from '../logo.svg';

function EmailBody({
    user,
}) {

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className="bg-white dark:bg-slate-900 grow flex flex-col md:translate-x-0 transform transition-transform duration-200 ease-in-out h-screen overflow-hidden border-0 md:border-l border-gray-200 dark:border-gray-500"
        >
            {true && (
                <div className="h-screen w-full flex flex-col justify-center items-center p-2">
                    <div className="">
                        <img className="w-96" src={ConvoLogo} alt="Conva" />
                    </div>
                </div>
            )}


        </div >
    )
}

export default EmailBody
