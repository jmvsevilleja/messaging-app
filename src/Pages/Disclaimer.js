import ConvoLogo from '../logo.svg';

const DisclaimerPage = () => {
    return <div>
        <div className="w-full flex justify-between px-4 py-2 border-b border-gray-100">
            <div className="pl-2 md:pl-4">
                <img className="h-14 w-auto" src={ConvoLogo} alt="Conva Messenger" />
            </div>
        </div>
        <div className="flex justify-center bg-primary py-20">
            <h1 className="font-normal text-xl md:text-5xl text-white">Disclaimer</h1>
        </div>
        <div className="mx-4 md:mx-32 my-10">
            <p>
                Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following disclaimer, together with our terms and conditions of use.
            </p>
            <br />
            <p>
                The information contained in this website is for general information purposes only and is provided by Conva-messenger.com. While we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. You need to make your own enquiries to determine if the information or products are appropriate for your intended use.
            </p>
            <br />
            <p>
                In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
            <br />
            <p>
                Through this website, you may be able to link to other websites which are not under the control of Conva-messenger.com. We have no control over the nature, content, and availability of those websites. The inclusion of any links does not imply recommendation, nor endorsement of the views expressed within them.
            </p>
            <br />
            <p>
                Every effort is made to keep the website up and running smoothly. However, Conva-messenger.com takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
            </p>
            <br />
            <h5 className="uppercase font-semibold text-gray-700">
                COPYRIGHT NOTICE
            </h5>
            <br />
            <p>
                This website and its content are the copyright of Clinica Technologies Pty Ltd – © 2021. All rights reserved.
            </p>
            <br />
            <p>
                Any redistribution or reproduction of a part or all of its content in any form is prohibited other than the following. You may print or download content to a local hard disk for your personal and non-commercial use only. You may copy some extracts only to individual third parties for their personal use, but only if you acknowledge the website as the source of the material.
            </p>
            <br />
            <p>
                You may not, except with our express written permission, distribute or commercially exploit the content. You may not transmit it or store it on any other website or other form of electronic retrieval system.
            </p>
            <br />
        </div>
    </div>
}

export default DisclaimerPage;