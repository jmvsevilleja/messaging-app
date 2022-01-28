import React from 'react'

function AudioPlayer({recordedAudio, isUploading, handleDeleteAudioUpload}) {
    const objectURL = URL.createObjectURL(recordedAudio);
    return <div className="flex justify-center items-center">
        <audio src={objectURL} controls controlsList="nodownload noplaybackrate" />
        {!isUploading && <button className="text-gray-400 hover:text-gray-500" onClick={(e) => {
            URL.revokeObjectURL(objectURL);
            handleDeleteAudioUpload(e);
        }}>
            <div className="sr-only">Close</div>
            <svg className="w-4 h-4 fill-current m-2">
                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
            </svg>
        </button>}
        {isUploading && <div className="text-gray-500">
            <svg fill='none' className="w-8 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                <path clipRule='evenodd'
                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                    fill='currentColor' fillRule='evenodd' />
            </svg></div>}

    </div>;
}

export default AudioPlayer;
