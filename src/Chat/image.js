import React, {useState} from "react";
import {Dialog} from "@headlessui/react";

function Image({file, src}) {

    const [isOpen, setIsOpen] = useState(false);
    //const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     console.log('useEffect Create Room');
    //     // if (userList) {
    //     //     console.log('Create Room User list', userList);
    //     // }
    // }, []);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                <img className="rounded-md" src={src} alt={file.name} />
            </button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed z-30 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />

                    <div className="inline-block overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl mx-5">
                        <div className="relative">
                            <button className="absolute top-3 right-3 text-white hover:text-gray-400 drop-shadow"
                                onClick={(e) => {
                                    setIsOpen(false);
                                }}
                            >
                                <div className="sr-only">Close</div>
                                <svg className="w-4 h-4 fill-current">
                                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                                </svg>
                            </button>
                            <img className="rounded-md" src={src} alt={file.name} />
                        </div>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default Image