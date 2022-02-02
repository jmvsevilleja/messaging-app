import React, {useState, useEffect} from "react";

const initialState = {
    recordingMinutes: 0,
    recordingSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null,
};

function AudioRecorder({handleAudioUpload}) {

    const [recorderState, setRecorderState] = useState(initialState);
    const {recordingMinutes, recordingSeconds, initRecording} = recorderState;

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            setRecorderState((prevState) => {
                return {
                    ...prevState,
                    initRecording: true,
                    mediaStream: stream,
                };
            });
        } catch (err) {
            console.log(err);
        }
    }

    const saveRecording = async () => {
        if (recorderState.mediaRecorder.state !== "inactive") recorderState.mediaRecorder.stop();
    }

    const cancelRecording = async () => {
        setRecorderState(initialState)
    }

    useEffect(() => {
        const MAX_RECORDER_TIME = 5;
        let recordingInterval = null;

        if (recorderState.initRecording)
            recordingInterval = setInterval(() => {
                setRecorderState((prevState) => {
                    if (
                        prevState.recordingMinutes === MAX_RECORDER_TIME &&
                        prevState.recordingSeconds === 0
                    ) {
                        clearInterval(recordingInterval);
                        return prevState;
                    }

                    if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
                        return {
                            ...prevState,
                            recordingSeconds: prevState.recordingSeconds + 1,
                        };

                    if (prevState.recordingSeconds === 59)
                        return {
                            ...prevState,
                            recordingMinutes: prevState.recordingMinutes + 1,
                            recordingSeconds: 0,
                        };
                });
            }, 1000);
        else clearInterval(recordingInterval);

        return () => clearInterval(recordingInterval);
    });

    useEffect(() => {
        if (recorderState.mediaStream)
            setRecorderState((prevState) => {
                return {
                    ...prevState,
                    mediaRecorder: new MediaRecorder(prevState.mediaStream),
                };
            });
    }, [recorderState.mediaStream]);

    useEffect(() => {
        if (recorderState.audio) {
            console.log(recorderState.audio);
            handleAudioUpload(recorderState.audio);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recorderState.audio]);

    useEffect(() => {
        const recorder = recorderState.mediaRecorder;
        let chunks = [];

        if (recorder && recorder.state === "inactive") {
            recorder.start();

            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, {type: "audio/mpeg-3"});
                chunks = [];

                setRecorderState((prevState) => {
                    if (prevState.mediaRecorder)
                        return {
                            ...initialState,
                            audio: blob,
                        };
                    else return initialState;
                });
            };
        }

        return () => {
            if (recorder) {
                recorder.stream.getAudioTracks().forEach((track) => track.stop());
            }
        };
    }, [recorderState.mediaRecorder]);

    return (
        <div className="flex justify-between items-center">
            <div className="">
                {initRecording && (
                    <div className="flex justify-between items-center mr-2">
                        <div className="m-1 text-primary font-bold">
                            {initRecording && <div className="recording-indicator"></div>}
                            <span>{recordingMinutes < 10 ? `0${recordingMinutes}` : recordingMinutes}</span>
                            <span>:</span>
                            <span>{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}</span>
                        </div>
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-600"
                            title="Cancel recording"
                            onClick={cancelRecording}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="text-green-500 hover:text-green-600 m-1"
                            title="Save recording"
                            disabled={recordingSeconds === 0}
                            onClick={saveRecording}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div className="flex">
                {initRecording ? (
                    <div className=" bg-primary  text-white rounded-full text-center p-2 mr-2">
                        <span className="flex">
                            <span className="animate-pulse rounded-full bg-red-600 m-1 w-4 h-4"></span>
                        </span>
                    </div>
                ) : (
                    <button
                        className="outline-none focus:outline-none mr-0 xs:mr-2 "
                        type="button"
                        title="Start recording"
                        onClick={startRecording}
                    >
                        <div className=" bg-primary hover:bg-secondary text-white rounded-full text-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    </button>
                )}

            </div>
        </div>
    );
}

export default AudioRecorder;
