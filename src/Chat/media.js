import React from "react";
import Image from "./image";
import File from "./file";

function Media({message}) {

    function handleDownloadFile(url, name) {
        fetch(url)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                // the filename you want
                a.download = name;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(() => alert('Download failed. Please try again.'));
    }

    return (
        <>
            {message.type === "IMAGE" && message.image &&
                <>
                    {message.image.map((file, index) => {
                        return (file && file.name && file.path &&
                            <div className="w-30 m-2 float-right" key={file.name}>
                                <Image file={file} src={file.path} />
                            </div>

                        )
                    })}
                </>
            }
            {message.type === "FILE" && message.file &&
                <div>
                    {message.file.map((file, index) => {
                        return (file && file.name && file.path &&
                            <div className="flex items-center m-2 mx-0" key={file.name}>
                                <File file={file} src={file.path}
                                    handleDownloadFile={handleDownloadFile} />
                            </div>

                        )
                    })}
                </div>
            }
            {message.type === "LINK" &&
                <div>
                    {message.content && <div className="break-all shadow-md mb-1 rounded-lg p-2 text-base text-left text-white bg-primary" >
                        <p>{message.content}</p>
                    </div>}
                </div>
            }
        </>
    );
}
export default Media;