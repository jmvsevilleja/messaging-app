import React from "react";
import Messages from "./Messages";
import Nav from "../components/Nav";
import ConvoLogo from '../logo.svg';
import MessageCreate from './MessageCreate';
import EmailSetting from './EmailSetting';

function EmailSidebar({
    user,
    isSigned,
    isLoading,
    openMessage,
    messageList,
    handleMessage,
    handleOutlookSignIn,
    handleOutlookSignOut,
    refreshMessages
}) {


    return (
        <div
            id="messages-sidebar"
            className={"bg-white dark:bg-slate-900 absolute z-20 top-0 bottom-0 md:static md:top-auto md:bottom-auto md:translate-x-0 transform transition-transform duration-200 ease-in-out w-full md:w-96"
                + (!openMessage ? " translate-x-0" : " -translate-x-full")}
        >
            <div className="flex justify-between item-center p-5 py-5">
                <div className="flex items-center w-full" >
                    <div className=" font-bold text-gray-600 dark:text-white">Outlook</div>
                </div>
                {isSigned && <EmailSetting user={user} />}
                {isSigned && <button type="button"
                    onClick={handleOutlookSignOut}
                    className="text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>}
            </div>
            < div className="px-5"><Nav /></div>
            {!isSigned && <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)]">
                <div className="my-10">
                    <img className="w-60 mx-5" src={ConvoLogo} alt="Conva" />
                </div>
                <div className="text-gray-600 dark:text-slate-400">
                    Welcome to Conva!
                </div>
                <div className="m-5 text-sm text-gray-600 dark:text-slate-400 text-center">
                    Access your accounts anytime, anywhere! Monitor your emails by reading, replying, and communicate with multimedia content.
                    <br /><br />With convenience and efficiency, experience the latest features of managing your emails on the go.
                </div>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="215"
                        height="41"
                        style={{
                            cursor: "pointer",
                        }}
                        className="microsoftButton"
                        onClick={handleOutlookSignIn}
                    >
                        <path fill="#ffffff" d="M0 0h215v41H0z" />
                        <path fill="#8c8c8c" d="M214 1v39H1V1h213m1-1H0v41h215V0z" />

                        <path
                            fill="#5e5e5e"
                            d="M45.812 25.082v-1.794a2.77 2.77 0 0 0 .573.4 4.484 4.484 0 0 0 .706.3 5.486 5.486 0 0 0 .745.187 3.954 3.954 0 0 0 .687.065 2.928 2.928 0 0 0 1.634-.365 1.2 1.2 0 0 0 .537-1.062 1.167 1.167 0 0 0-.178-.649 1.939 1.939 0 0 0-.5-.5 5.412 5.412 0 0 0-.757-.435q-.435-.209-.932-.436-.533-.285-.994-.578a4.285 4.285 0 0 1-.8-.648 2.724 2.724 0 0 1-.533-.8 2.6 2.6 0 0 1-.194-1.047 2.416 2.416 0 0 1 .333-1.285 2.794 2.794 0 0 1 .877-.9 4.019 4.019 0 0 1 1.239-.528 5.906 5.906 0 0 1 1.418-.172 5.692 5.692 0 0 1 2.4.374v1.721a3.817 3.817 0 0 0-2.295-.645 4.093 4.093 0 0 0-.771.074 2.335 2.335 0 0 0-.687.241 1.5 1.5 0 0 0-.494.433 1.06 1.06 0 0 0-.189.637 1.221 1.221 0 0 0 .145.608 1.573 1.573 0 0 0 .428.468 4.321 4.321 0 0 0 .688.414c.27.134.584.28.939.436q.548.285 1.034.6a4.881 4.881 0 0 1 .856.7 3.075 3.075 0 0 1 .585.846 2.493 2.493 0 0 1 .215 1.058 2.625 2.625 0 0 1-.322 1.348 2.584 2.584 0 0 1-.866.892 3.786 3.786 0 0 1-1.254.5 6.959 6.959 0 0 1-1.5.155c-.176 0-.392-.014-.647-.04s-.518-.067-.786-.117a7.75 7.75 0 0 1-.76-.187 2.373 2.373 0 0 1-.58-.269zM55.109 16.426a1.021 1.021 0 0 1-.713-.272.891.891 0 0 1-.3-.688.917.917 0 0 1 .3-.7 1.009 1.009 0 0 1 .713-.278 1.041 1.041 0 0 1 .732.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.035 1.035 0 0 1-.732.282zm.841 9.074h-1.7V18h1.7zM64.979 24.9q0 4.131-4.146 4.131a6.166 6.166 0 0 1-2.551-.491v-1.554a4.712 4.712 0 0 0 2.332.7 2.341 2.341 0 0 0 2.668-2.628v-.818h-.029a2.938 2.938 0 0 1-4.733.436 4.046 4.046 0 0 1-.837-2.684 4.738 4.738 0 0 1 .9-3.04 2.988 2.988 0 0 1 2.471-1.128 2.38 2.38 0 0 1 2.2 1.216h.029V18h1.7zM63.3 22.064v-.973a1.91 1.91 0 0 0-.523-1.352 1.71 1.71 0 0 0-1.3-.559 1.789 1.789 0 0 0-1.51.714 3.223 3.223 0 0 0-.545 2 2.78 2.78 0 0 0 .523 1.769 1.675 1.675 0 0 0 1.385.662 1.8 1.8 0 0 0 1.426-.632 2.4 2.4 0 0 0 .544-1.629zM73.853 25.5h-1.7v-4.227q0-2.1-1.483-2.1a1.616 1.616 0 0 0-1.279.582 2.167 2.167 0 0 0-.505 1.469V25.5h-1.7V18h1.7v1.245h.029a2.669 2.669 0 0 1 2.428-1.421 2.257 2.257 0 0 1 1.863.795 3.57 3.57 0 0 1 .644 2.3zM80.892 16.426a1.017 1.017 0 0 1-.713-.272.889.889 0 0 1-.3-.688.915.915 0 0 1 .3-.7 1 1 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.84 9.074h-1.7V18h1.7zM90.614 25.5h-1.7v-4.227q0-2.1-1.483-2.1a1.62 1.62 0 0 0-1.28.582 2.167 2.167 0 0 0-.5 1.469V25.5h-1.7V18h1.7v1.245h.03a2.668 2.668 0 0 1 2.427-1.421 2.258 2.258 0 0 1 1.864.795 3.576 3.576 0 0 1 .643 2.3zM106.865 18l-2.208 7.5h-1.776l-1.36-5.083a3.291 3.291 0 0 1-.1-.659h-.029a3.018 3.018 0 0 1-.132.644l-1.477 5.1h-1.741l-2.2-7.5H97.6l1.36 5.405a3.308 3.308 0 0 1 .087.645h.053a3.384 3.384 0 0 1 .117-.659L100.725 18h1.593l1.345 5.428a3.832 3.832 0 0 1 .095.644h.052a3.3 3.3 0 0 1 .109-.644l1.33-5.428zM108.977 16.426a1.017 1.017 0 0 1-.713-.272.889.889 0 0 1-.3-.688.915.915 0 0 1 .3-.7 1 1 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.915.915 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.84 9.074h-1.7V18h1.7zM115.979 25.42a2.944 2.944 0 0 1-1.307.248q-2.18 0-2.179-2.094v-4.241h-1.25V18h1.25v-1.736l1.7-.483V18h1.79v1.333h-1.79v3.75a1.478 1.478 0 0 0 .242.952 1 1 0 0 0 .8.285 1.16 1.16 0 0 0 .745-.248zM124.094 25.5h-1.7v-4.1q0-2.226-1.483-2.226a1.555 1.555 0 0 0-1.258.644 2.573 2.573 0 0 0-.511 1.649V25.5h-1.7V14.4h1.7v4.849h.029a2.679 2.679 0 0 1 2.428-1.421q2.492 0 2.492 3.055zM141.719 25.5h-1.726v-6.8q0-.835.1-2.043h-.03a6.992 6.992 0 0 1-.285.988l-3.126 7.855h-1.2l-3.136-7.793a7.371 7.371 0 0 1-.277-1.047h-.029q.059.63.058 2.058V25.5h-1.608V15h2.449l2.756 7a10.415 10.415 0 0 1 .409 1.2h.036c.181-.551.327-.962.439-1.23l2.808-6.97h2.362zM144.964 16.426a1.019 1.019 0 0 1-.713-.272.892.892 0 0 1-.3-.688.918.918 0 0 1 .3-.7 1.007 1.007 0 0 1 .713-.278 1.038 1.038 0 0 1 .731.278.911.911 0 0 1 .3.7.9.9 0 0 1-.3.678 1.033 1.033 0 0 1-.731.282zm.841 9.074h-1.7V18h1.7zM153.378 25.156a4.185 4.185 0 0 1-2.127.52 3.6 3.6 0 0 1-2.69-1.044 3.7 3.7 0 0 1-1.024-2.706 4.074 4.074 0 0 1 1.1-2.978 3.93 3.93 0 0 1 2.942-1.124 4.281 4.281 0 0 1 1.806.36v1.582a2.73 2.73 0 0 0-1.667-.586 2.312 2.312 0 0 0-1.762.728 2.669 2.669 0 0 0-.687 1.908 2.54 2.54 0 0 0 .647 1.838 2.291 2.291 0 0 0 1.736.674 2.708 2.708 0 0 0 1.725-.652zM159.4 19.619a1.4 1.4 0 0 0-.884-.242 1.514 1.514 0 0 0-1.258.682 3.047 3.047 0 0 0-.5 1.852V25.5h-1.7V18h1.7v1.545h.029a2.6 2.6 0 0 1 .764-1.233 1.72 1.72 0 0 1 1.151-.444 1.425 1.425 0 0 1 .7.14zM163.788 25.676a3.71 3.71 0 0 1-2.767-1.051 3.8 3.8 0 0 1-1.035-2.787 3.7 3.7 0 0 1 3.985-4.014 3.581 3.581 0 0 1 2.733 1.033 3.994 3.994 0 0 1 .98 2.864 3.938 3.938 0 0 1-1.056 2.875 3.8 3.8 0 0 1-2.84 1.08zm.08-6.5a1.932 1.932 0 0 0-1.571.7 2.913 2.913 0 0 0-.578 1.919 2.744 2.744 0 0 0 .585 1.856 1.957 1.957 0 0 0 1.564.678 1.862 1.862 0 0 0 1.539-.666 2.95 2.95 0 0 0 .537-1.9 2.99 2.99 0 0 0-.537-1.911 1.851 1.851 0 0 0-1.539-.672zM168.94 25.266v-1.575a3.383 3.383 0 0 0 2.1.725q1.535 0 1.535-.908a.714.714 0 0 0-.132-.436 1.263 1.263 0 0 0-.354-.318 2.864 2.864 0 0 0-.526-.25c-.2-.072-.428-.155-.677-.248a7.074 7.074 0 0 1-.829-.389 2.526 2.526 0 0 1-.615-.465 1.758 1.758 0 0 1-.369-.59 2.168 2.168 0 0 1-.124-.769 1.775 1.775 0 0 1 .256-.955 2.224 2.224 0 0 1 .687-.7 3.294 3.294 0 0 1 .979-.425 4.49 4.49 0 0 1 1.129-.139 5.163 5.163 0 0 1 1.856.315v1.487a3.127 3.127 0 0 0-1.812-.542 2.323 2.323 0 0 0-.582.066 1.477 1.477 0 0 0-.442.183.893.893 0 0 0-.285.282.677.677 0 0 0-.1.363.779.779 0 0 0 .1.41.936.936 0 0 0 .3.3 2.675 2.675 0 0 0 .482.234q.282.105.648.23a9.5 9.5 0 0 1 .866.4 2.872 2.872 0 0 1 .654.465 1.789 1.789 0 0 1 .416.6 2.034 2.034 0 0 1 .147.81 1.855 1.855 0 0 1-.263 1 2.212 2.212 0 0 1-.7.7 3.28 3.28 0 0 1-1.013.413 5.2 5.2 0 0 1-1.209.136 5.1 5.1 0 0 1-2.123-.41zM179.183 25.676a3.711 3.711 0 0 1-2.768-1.051 3.8 3.8 0 0 1-1.034-2.787 3.7 3.7 0 0 1 3.984-4.014 3.585 3.585 0 0 1 2.734 1.033 3.993 3.993 0 0 1 .979 2.864 3.934 3.934 0 0 1-1.056 2.875 3.794 3.794 0 0 1-2.839 1.08zm.08-6.5a1.934 1.934 0 0 0-1.572.7 2.919 2.919 0 0 0-.578 1.919 2.749 2.749 0 0 0 .585 1.856 1.959 1.959 0 0 0 1.565.678 1.864 1.864 0 0 0 1.539-.666 2.956 2.956 0 0 0 .537-1.9 3 3 0 0 0-.537-1.911 1.852 1.852 0 0 0-1.539-.672zM188.787 15.781a1.523 1.523 0 0 0-.782-.2q-1.235 0-1.235 1.4V18h1.74v1.333h-1.733V25.5h-1.7v-6.167H183.8V18h1.279v-1.216a2.37 2.37 0 0 1 .775-1.871 2.817 2.817 0 0 1 1.937-.684 2.866 2.866 0 0 1 .994.138zM193.94 25.42a2.944 2.944 0 0 1-1.307.248q-2.179 0-2.179-2.094v-4.241H189.2V18h1.25v-1.736l1.7-.483V18h1.79v1.333h-1.79v3.75a1.472 1.472 0 0 0 .242.952 1 1 0 0 0 .8.285 1.162 1.162 0 0 0 .745-.248z"
                        />
                        <path fill="#f25022" d="M13 11h9v9h-9z" />
                        <path fill="#00a4ef" d="M13 21h9v9h-9z" />
                        <path fill="#7fba00" d="M23 11h9v9h-9z" />
                        <path fill="#ffb900" d="M23 21h9v9h-9z" />
                    </svg>
                </div>
                <div className="m-5 text-sm font-base text-black dark:text-slate-400">
                    Read our&nbsp;
                    <a className="mt-5 text-primary hover:text-secondary" href="/privacy-policy">Privacy policy</a>
                    &nbsp;and the&nbsp;
                    <a className="mt-5 text-primary hover:text-secondary" href="/terms-and-condition">Terms of service</a>
                </div>
            </div>}
            {isSigned && isLoading && <div className="flex items-center justify-center h-[calc(100vh-130px)]">
                <div className="text-gray-600 dark:text-slate-400 opacity-50">
                    <svg fill='none' className="w-40 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg></div></div>}
            {isSigned && isLoading && <div className="flex items-center justify-center h-[calc(100vh-130px)]">
                <div className="text-gray-600 dark:text-slate-400 opacity-50">
                    <svg fill='none' className="w-40 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg></div></div>}
            {isSigned && !isLoading && <div className="flex justify-center mb-3 px-5">
                <div className="w-full flex justify-center items-center">
                    <MessageCreate />
                </div>
                <div className="flex items-center">
                    <button className="text-gray-400 hover:text-gray-500"
                        title="Refresh"
                        onClick={refreshMessages}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>}
            {isSigned && !isLoading && <div className="scrollable px-5 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-130px)] w-full md:w-96">
                <ul>
                    {messageList && messageList.length !== 0 && messageList
                        .map((message) => (<li key={message.id}>
                            <Messages
                                message={message}
                                handleEmail={() => {
                                    handleMessage(message.id)
                                }}
                            />
                        </li>
                        ))}
                </ul>
            </div>}

        </div >
    )
}

export default EmailSidebar
