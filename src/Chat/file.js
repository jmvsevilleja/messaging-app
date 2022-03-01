import React from "react";

function File({file, src, handleDownloadFile}) {

    return (
        <>
            <button className="pr-8 text-gray-400 hover:text-gray-500"
                onClick={(e) => {
                    handleDownloadFile(src, file.name);
                }}
            >
                <div className="inline-flex break-all shadow-md mb-1 rounded-lg p-2 text-sm text-left bg-gray-50 rounded-tl-none">
                    <div className="flex w-full justify-between items-start">
                        <div className="flex">
                            <div className="text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="ml-2 text-gray-500 break-all">{file.name}</div>
                            <div className="ml-2">
                                <div className="sr-only">Download</div>


                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

            </button>

        </>
    )
}

export default File