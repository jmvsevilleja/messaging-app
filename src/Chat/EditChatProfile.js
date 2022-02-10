import React, {useState} from "react";
import {editUser} from "../api/mutations";

import {Dialog} from "@headlessui/react";
import Resizer from "react-image-file-resizer";
import {uploadFile} from "../api/api";
import Picture from "./Picture";

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "file",
        );
    });

function EditChatProfile({user}) {

    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState(user.name);
    const [userAbout, setUserAbout] = useState(user.status);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const imageRef = React.useRef();

    const handleEditChatProfile = async (event) => {
        event.preventDefault();
        console.log('Handle Edit Profile', user);
        if (loading) return;
        setLoading(true);
        let changes = {
            id: user.id,
            name: userName,
        }
        if (selectedImage) {
            uploadFile(selectedImage).then((file) => {
                changes.imageUri = file.path;
                editUser(changes).then(() => {
                    setIsOpen(false);
                    setLoading(false);
                });
            });
            return
        }
        editUser(changes).then(() => {
            setIsOpen(false);
            setLoading(false);
        });
    }

    const handleImageUpload = async (e) => {
        if (e.target.files.length === 0) return;
        console.log('Image Upload', e.target.files);
        resizeFile(e.target.files[0]).then((image) => {
            setSelectedImage(image);
        });
    };

    const handleReset = () => {
        setIsOpen(false);
    }

    return <>
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            title="Edit Profile"
            className="absolute bottom-1 -right-8 text-gray-400 hover:text-gray-500 outline-none focus:outline-none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
        </button>
        <Dialog
            open={isOpen}
            onClose={handleReset}
            className="fixed z-30 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                    <Dialog.Title
                        as="h3"
                        className="mb-3 text-lg font-medium leading-6 text-gray-600"
                    >
                        Edit Profile
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            handleEditChatProfile(e);
                        }}
                    >
                        <div className="flex flex-col items-center">
                            {!selectedImage && <Picture
                                name={user.name}
                                image={user.imageUri}
                                big={true}
                            />}
                            {selectedImage && <div className="w-24"><img
                                src={URL.createObjectURL(selectedImage)}
                                className="rounded-full object-cover h-24 w-24"
                            /></div>}

                            <input
                                ref={imageRef}
                                multiple={false}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload} />
                            <button
                                type="button"
                                className="bg-primary hover:bg-secondary text-white font-base px-4 rounded mt-2"
                                onClick={() => imageRef.current.click()}>
                                <span className="py-2">Upload Image</span>
                            </button>
                        </div>
                        <div className="relative text-gray-600">
                            <label className="text-base">Name:
                                <input
                                    aria-placeholder="Name"
                                    placeholder="Name"
                                    type="text"
                                    className="block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    required
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                    value={userName}
                                />
                            </label>
                        </div>

                        <div className="mt-4 relative text-gray-600">
                            <label className="text-base">About:
                                <input
                                    aria-placeholder="About"
                                    placeholder="About"
                                    type="text"
                                    className="block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    required
                                    onChange={(e) => {
                                        setUserAbout(e.target.value);
                                    }}
                                    value={userAbout}
                                />
                            </label>
                        </div>

                        <div className="mt-4 flex flex-col">
                            <div className="flex self-end">
                                <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4" onClick={handleReset}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded">
                                    {loading && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                        <path clipRule='evenodd'
                                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                            fill='currentColor' fillRule='evenodd' />
                                    </svg>}
                                    {!loading && <span className="py-2">Save</span>}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog >
    </>

}

export default EditChatProfile;
