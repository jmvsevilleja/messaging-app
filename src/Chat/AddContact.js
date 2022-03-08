import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {getUserById, getChatRooms, getAccountById, getAccountByEmail} from "../api/queries";
import {addUser, addChatRoom, addChatRoomUser} from "../api/mutations";
import QrReader from 'react-qr-reader'
import {checkSubscription, sendInvitation} from "../api/api";

function AddContact({user, handleChatRoomID}) {

    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [readQR, setreadQR] = useState(false);
    const [showSub, setShowSub] = useState(false);
    const [inviting, setInviting] = useState(false);
    const [invited, setInvited] = useState(null);


    const handleScan = data => {
        if (data) {
            handleQRSubmit(data);
        }
    }

    const handleError = err => {
        setError("QR Reader is not working on your device!");
        console.log(err);
    }

    const handleReset = () => {
        setLoading(false);
        setIsOpen(false);
        setUserEmail("");
        setreadQR(false);
        setShowSub(false);
        setCountryCode("");
        setUserPhone("");
        setInvited(false);
    }

    const handleCreateChat = async (selected_user) => {
        console.log("handleCreateChat", user.id, selected_user.id);
        // check if user logged and selected_user is already in chat room
        getChatRooms(user.id).then((chatroom_list) => {
            const found_user = chatroom_list.find((room) => {
                if (!Boolean(room.chatroom.group)) { // not a group chat
                    let needle = [user.id, selected_user.id];
                    var haystack = room.chatroom.chatRoomUsers.items.map(item => item.user.id);
                    return needle.every(item => haystack.includes(item));
                }
                return false;
            });

            console.log('handleCreateChat Found', found_user);
            if (!Boolean(found_user)) {
                // Creating Chat Room
                const chatroom_name = user.name + " - " + selected_user.name;
                addChatRoom(user.id, chatroom_name).then((chatroom) => {
                    addChatRoomUser(selected_user.id, chatroom.id).then(() => {
                        addChatRoomUser(user.id, chatroom.id).then(() => {
                            handleChatRoomID(chatroom.id).then(() => {
                                handleReset();
                            });
                        });
                    });
                });

            } else {
                // open chatroom from users list
                handleChatRoomID(found_user.chatroom.id).then(() => {
                    handleReset();
                });
            }
        });
    };

    const handleSendInvite = async () => {
        console.log('handleSendInvite', userEmail);
        setInviting(true);
        sendInvitation(user.name, userEmail, countryCode + userPhone).then((result) => {
            console.log('sendInvitation', result);
            setInvited(true);
            setInviting(false);
        })
    }
    const handleAddUserSubmit = async (event) => {
        event.preventDefault();
        console.log('handleAddUserSubmit', userEmail);
        // prevent double submit
        if (loading || error) return;


        if ((userEmail || userPhone)) {
            var re = /\S+@\S+\.\S+/;
            ;
            if (!userPhone && !re.test(userEmail)) {
                setError("Invalid email");
                return;
            }

            setLoading(true);
            getAccountByEmail(userEmail).then(async (account_found) => {
                console.log('account_found', account_found);
                if (account_found) {
                    if (account_found.id === user.id) {
                        setError("Invalid email");
                        setLoading(false);
                        return;
                    }
                    const ignoreNote = await checkSubscription(account_found.id).then((apps) => {
                        if (apps) {
                            const conva = apps.find((item) => (item.application.id === "2f7a4695-6ccb-467a-b1eb-d9f0394529bf"));
                            console.log('CONVA', conva);
                            if (conva) {
                                //if user is subscribed, continue to chat
                                getUserById(account_found.id).then((user_found) => {
                                    //User Found, check Subscription by ID
                                    if (user_found) {
                                        handleCreateChat(user_found);
                                    }
                                    if (!user_found) {
                                        const name = account_found.first_name + " " + account_found.last_name;
                                        console.log("user not found create to users table", account_found.id, name);
                                        addUser(account_found.id, name).then((user_created) => {
                                            handleCreateChat(user_created);
                                        });
                                    }
                                });
                                return true;
                            }
                        }
                    });
                    if (ignoreNote) return;
                }
                // Contact not found, show subscription note
                setShowSub(true);
                setLoading(false);
            });

            // // TODO: Check subscription of email or phone
            // // if Subscribed continue adding User

            // return;
            return;
        }
        setError("Please enter an email address or a phone number!");


    };

    const handleQRSubmit = async (qr_code) => {
        console.log('handleQRSubmit', qr_code);
        // prevent double submit
        if (loading) return;
        setLoading(true);

        getAccountById(qr_code).then((account_found) => {
            if (account_found) {
                if (account_found.id !== user.id) {
                    getUserById(account_found.id).then((user_found) => {
                        if (user_found) {
                            handleCreateChat(user_found);
                        }
                        if (!user_found) {
                            const name = account_found.first_name + " " + account_found.last_name;
                            console.log("user not found create to users table", account_found.id, name);
                            addUser(account_found.id, name).then((user_created) => {
                                handleCreateChat(user_created);
                            });
                        }
                    });
                    return;
                }
            }
            setError("Contact not found!");
            setLoading(false);
        });
    };

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const countryCodes = [
        {code: "", value: "", label: "Country Code"},
        {code: "DZ", value: "213", label: "Algeria (+213)"},
        {code: "AD", value: "376", label: "Andorra (+376)"},
        {code: "AO", value: "244", label: "Angola (+244)"},
        {code: "AI", value: "1264", label: "Anguilla (+1264)"},
        {code: "AG", value: "1268", label: "Antigua & Barbuda (+1268)"},
        {code: "AR", value: "54", label: "Argentina (+54)"},
        {code: "AM", value: "374", label: "Armenia (+374)"},
        {code: "AW", value: "297", label: "Aruba (+297)"},
        {code: "AU", value: "61", label: "Australia (+61)"},
        {code: "AT", value: "43", label: "Austria (+43)"},
        {code: "AZ", value: "994", label: "Azerbaijan (+994)"},
        {code: "BS", value: "1242", label: "Bahamas (+1242)"},
        {code: "BH", value: "973", label: "Bahrain (+973)"},
        {code: "BD", value: "880", label: "Bangladesh (+880)"},
        {code: "BB", value: "1246", label: "Barbados (+1246)"},
        {code: "BY", value: "375", label: "Belarus (+375)"},
        {code: "BE", value: "32", label: "Belgium (+32)"},
        {code: "BZ", value: "501", label: "Belize (+501)"},
        {code: "BJ", value: "229", label: "Benin (+229)"},
        {code: "BM", value: "1441", label: "Bermuda (+1441)"},
        {code: "BT", value: "975", label: "Bhutan (+975)"},
        {code: "BO", value: "591", label: "Bolivia (+591)"},
        {code: "BA", value: "387", label: "Bosnia Herzegovina (+387)"},
        {code: "BW", value: "267", label: "Botswana (+267)"},
        {code: "BR", value: "55", label: "Brazil (+55)"},
        {code: "BN", value: "673", label: "Brunei (+673)"},
        {code: "BG", value: "359", label: "Bulgaria (+359)"},
        {code: "BF", value: "226", label: "Burkina Faso (+226)"},
        {code: "BI", value: "257", label: "Burundi (+257)"},
        {code: "KH", value: "855", label: "Cambodia (+855)"},
        {code: "CM", value: "237", label: "Cameroon (+237)"},
        {code: "CA", value: "1", label: "Canada (+1)"},
        {code: "CV", value: "238", label: "Cape Verde Islands (+238)"},
        {code: "KY", value: "1345", label: "Cayman Islands (+1345)"},
        {code: "CF", value: "236", label: "Central African Republic (+236)"},
        {code: "CL", value: "56", label: "Chile (+56)"},
        {code: "CN", value: "86", label: "China (+86)"},
        {code: "CO", value: "57", label: "Colombia (+57)"},
        {code: "KM", value: "269", label: "Comoros (+269)"},
        {code: "CG", value: "242", label: "Congo (+242)"},
        {code: "CK", value: "682", label: "Cook Islands (+682)"},
        {code: "CR", value: "506", label: "Costa Rica (+506)"},
        {code: "HR", value: "385", label: "Croatia (+385)"},
        {code: "CU", value: "53", label: "Cuba (+53)"},
        {code: "CY", value: "90392", label: "Cyprus North (+90392)"},
        {code: "CY2", value: "357", label: "Cyprus South (+357)"},
        {code: "CZ", value: "42", label: "Czech Republic (+42)"},
        {code: "DK", value: "45", label: "Denmark (+45)"},
        {code: "DJ", value: "253", label: "Djibouti (+253)"},
        {code: "DM", value: "1809", label: "Dominica (+1809)"},
        {code: "DO", value: "1809", label: "Dominican Republic (+1809)"},
        {code: "EC", value: "593", label: "Ecuador (+593)"},
        {code: "EG", value: "20", label: "Egypt (+20)"},
        {code: "SV", value: "503", label: "El Salvador (+503)"},
        {code: "GQ", value: "240", label: "Equatorial Guinea (+240)"},
        {code: "ER", value: "291", label: "Eritrea (+291)"},
        {code: "EE", value: "372", label: "Estonia (+372)"},
        {code: "ET", value: "251", label: "Ethiopia (+251)"},
        {code: "FK", value: "500", label: "Falkland Islands (+500)"},
        {code: "FO", value: "298", label: "Faroe Islands (+298)"},
        {code: "FJ", value: "679", label: "Fiji (+679)"},
        {code: "FI", value: "358", label: "Finland (+358)"},
        {code: "FR", value: "33", label: "France (+33)"},
        {code: "GF", value: "594", label: "French Guiana (+594)"},
        {code: "PF", value: "689", label: "French Polynesia (+689)"},
        {code: "GA", value: "241", label: "Gabon (+241)"},
        {code: "GM", value: "220", label: "Gambia (+220)"},
        {code: "GE", value: "7880", label: "Georgia (+7880)"},
        {code: "DE", value: "49", label: "Germany (+49)"},
        {code: "GH", value: "233", label: "Ghana (+233)"},
        {code: "GI", value: "350", label: "Gibraltar (+350)"},
        {code: "GR", value: "30", label: "Greece (+30)"},
        {code: "GL", value: "299", label: "Greenland (+299)"},
        {code: "GD", value: "1473", label: "Grenada (+1473)"},
        {code: "GP", value: "590", label: "Guadeloupe (+590)"},
        {code: "GU", value: "671", label: "Guam (+671)"},
        {code: "GT", value: "502", label: "Guatemala (+502)"},
        {code: "GN", value: "224", label: "Guinea (+224)"},
        {code: "GW", value: "245", label: "Guinea - Bissau (+245)"},
        {code: "GY", value: "592", label: "Guyana (+592)"},
        {code: "HT", value: "509", label: "Haiti (+509)"},
        {code: "HN", value: "504", label: "Honduras (+504)"},
        {code: "HK", value: "852", label: "Hong Kong (+852)"},
        {code: "HU", value: "36", label: "Hungary (+36)"},
        {code: "IS", value: "354", label: "Iceland (+354)"},
        {code: "IN", value: "91", label: "India (+91)"},
        {code: "ID", value: "62", label: "Indonesia (+62)"},
        {code: "IR", value: "98", label: "Iran (+98)"},
        {code: "IQ", value: "964", label: "Iraq (+964)"},
        {code: "IE", value: "353", label: "Ireland (+353)"},
        {code: "IL", value: "972", label: "Israel (+972)"},
        {code: "IT", value: "39", label: "Italy (+39)"},
        {code: "JM", value: "1876", label: "Jamaica (+1876)"},
        {code: "JP", value: "81", label: "Japan (+81)"},
        {code: "JO", value: "962", label: "Jordan (+962)"},
        {code: "KZ", value: "7", label: "Kazakhstan (+7)"},
        {code: "KE", value: "254", label: "Kenya (+254)"},
        {code: "KI", value: "686", label: "Kiribati (+686)"},
        {code: "KP", value: "850", label: "Korea North (+850)"},
        {code: "KR", value: "82", label: "Korea South (+82)"},
        {code: "KW", value: "965", label: "Kuwait (+965)"},
        {code: "KG", value: "996", label: "Kyrgyzstan (+996)"},
        {code: "LA", value: "856", label: "Laos (+856)"},
        {code: "LV", value: "371", label: "Latvia (+371)"},
        {code: "LB", value: "961", label: "Lebanon (+961)"},
        {code: "LS", value: "266", label: "Lesotho (+266)"},
        {code: "LR", value: "231", label: "Liberia (+231)"},
        {code: "LY", value: "218", label: "Libya (+218)"},
        {code: "LI", value: "417", label: "Liechtenstein (+417)"},
        {code: "LT", value: "370", label: "Lithuania (+370)"},
        {code: "LU", value: "352", label: "Luxembourg (+352)"},
        {code: "MO", value: "853", label: "Macao (+853)"},
        {code: "MK", value: "389", label: "Macedonia (+389)"},
        {code: "MG", value: "261", label: "Madagascar (+261)"},
        {code: "MW", value: "265", label: "Malawi (+265)"},
        {code: "MY", value: "60", label: "Malaysia (+60)"},
        {code: "MV", value: "960", label: "Maldives (+960)"},
        {code: "ML", value: "223", label: "Mali (+223)"},
        {code: "MT", value: "356", label: "Malta (+356)"},
        {code: "MH", value: "692", label: "Marshall Islands (+692)"},
        {code: "MQ", value: "596", label: "Martinique (+596)"},
        {code: "MR", value: "222", label: "Mauritania (+222)"},
        {code: "YT", value: "269", label: "Mayotte (+269)"},
        {code: "MX", value: "52", label: "Mexico (+52)"},
        {code: "FM", value: "691", label: "Micronesia (+691)"},
        {code: "MD", value: "373", label: "Moldova (+373)"},
        {code: "MC", value: "377", label: "Monaco (+377)"},
        {code: "MN", value: "976", label: "Mongolia (+976)"},
        {code: "MS", value: "1664", label: "Montserrat (+1664)"},
        {code: "MA", value: "212", label: "Morocco (+212)"},
        {code: "MZ", value: "258", label: "Mozambique (+258)"},
        {code: "MN2", value: "95", label: "Myanmar (+95)"},
        {code: "NA", value: "264", label: "Namibia (+264)"},
        {code: "NR", value: "674", label: "Nauru (+674)"},
        {code: "NP", value: "977", label: "Nepal (+977)"},
        {code: "NL", value: "31", label: "Netherlands (+31)"},
        {code: "NC", value: "687", label: "New Caledonia (+687)"},
        {code: "NZ", value: "64", label: "New Zealand (+64)"},
        {code: "NI", value: "505", label: "Nicaragua (+505)"},
        {code: "NE", value: "227", label: "Niger (+227)"},
        {code: "NG", value: "234", label: "Nigeria (+234)"},
        {code: "NU", value: "683", label: "Niue (+683)"},
        {code: "NF", value: "672", label: "Norfolk Islands (+672)"},
        {code: "NP2", value: "670", label: "Northern Marianas (+670)"},
        {code: "NO", value: "47", label: "Norway (+47)"},
        {code: "OM", value: "968", label: "Oman (+968)"},
        {code: "PW", value: "680", label: "Palau (+680)"},
        {code: "PA", value: "507", label: "Panama (+507)"},
        {code: "PG", value: "675", label: "Papua New Guinea (+675)"},
        {code: "PY", value: "595", label: "Paraguay (+595)"},
        {code: "PE", value: "51", label: "Peru (+51)"},
        {code: "PH", value: "63", label: "Philippines (+63)"},
        {code: "PL", value: "48", label: "Poland (+48)"},
        {code: "PT", value: "351", label: "Portugal (+351)"},
        {code: "PR", value: "1787", label: "Puerto Rico (+1787)"},
        {code: "QA", value: "974", label: "Qatar (+974)"},
        {code: "RE", value: "262", label: "Reunion (+262)"},
        {code: "RO", value: "40", label: "Romania (+40)"},
        {code: "RU", value: "7", label: "Russia (+7)"},
        {code: "RW", value: "250", label: "Rwanda (+250)"},
        {code: "SM", value: "378", label: "San Marino (+378)"},
        {code: "ST", value: "239", label: "Sao Tome & Principe (+239)"},
        {code: "SA", value: "966", label: "Saudi Arabia (+966)"},
        {code: "SN", value: "221", label: "Senegal (+221)"},
        {code: "CS", value: "381", label: "Serbia (+381)"},
        {code: "SC", value: "248", label: "Seychelles (+248)"},
        {code: "SL", value: "232", label: "Sierra Leone (+232)"},
        {code: "SG", value: "65", label: "Singapore (+65)"},
        {code: "SK", value: "421", label: "Slovak Republic (+421)"},
        {code: "SI", value: "386", label: "Slovenia (+386)"},
        {code: "SB", value: "677", label: "Solomon Islands (+677)"},
        {code: "SO", value: "252", label: "Somalia (+252)"},
        {code: "ZA", value: "27", label: "South Africa (+27)"},
        {code: "ES", value: "34", label: "Spain (+34)"},
        {code: "LK", value: "94", label: "Sri Lanka (+94)"},
        {code: "SH", value: "290", label: "St. Helena (+290)"},
        {code: "KN", value: "1869", label: "St. Kitts (+1869)"},
        {code: "SC2", value: "1758", label: "St. Lucia (+1758)"},
        {code: "SD", value: "249", label: "Sudan (+249)"},
        {code: "SR", value: "597", label: "Suriname (+597)"},
        {code: "SZ", value: "268", label: "Swaziland (+268)"},
        {code: "SE", value: "46", label: "Sweden (+46)"},
        {code: "CH", value: "41", label: "Switzerland (+41)"},
        {code: "SI2", value: "963", label: "Syria (+963)"},
        {code: "TW", value: "886", label: "Taiwan (+886)"},
        {code: "TJ", value: "7", label: "Tajikstan (+7)"},
        {code: "TH", value: "66", label: "Thailand (+66)"},
        {code: "TG", value: "228", label: "Togo (+228)"},
        {code: "TO", value: "676", label: "Tonga (+676)"},
        {code: "TT", value: "1868", label: "Trinidad & Tobago (+1868)"},
        {code: "TN", value: "216", label: "Tunisia (+216)"},
        {code: "TR", value: "90", label: "Turkey (+90)"},
        {code: "TM", value: "7", label: "Turkmenistan (+7)"},
        {code: "TM2", value: "993", label: "Turkmenistan (+993)"},
        {code: "TC", value: "1649", label: "Turks & Caicos Islands (+1649)"},
        {code: "TV", value: "688", label: "Tuvalu (+688)"},
        {code: "UG", value: "256", label: "Uganda (+256)"},
        {code: "GB", value: "44", label: "UK (+44)"},
        {code: "UA", value: "380", label: "Ukraine (+380)"},
        {code: "AE", value: "971", label: "United Arab Emirates (+971)"},
        {code: "UY", value: "598", label: "Uruguay (+598)"},
        {code: "US", value: "1", label: "USA (+1)"},
        {code: "UZ", value: "7", label: "Uzbekistan (+7)"},
        {code: "VU", value: "678", label: "Vanuatu (+678)"},
        {code: "VA", value: "379", label: "Vatican City (+379)"},
        {code: "VE", value: "58", label: "Venezuela (+58)"},
        {code: "VN", value: "84", label: "Vietnam (+84)"},
        {code: "VG", value: "84", label: "Virgin Islands - British (+1284)"},
        {code: "VI", value: "84", label: "Virgin Islands - US (+1340)"},
        {code: "WF", value: "681", label: "Wallis & Futuna (+681)"},
        {code: "YE", value: "969", label: "Yemen (North)(+969)"},
        {code: "YE2", value: "967", label: "Yemen (South)(+967)"},
        {code: "ZM", value: "260", label: "Zambia (+260)"},
        {code: "ZW", value: "263", label: "Zimbabwe (+263)"}
    ];


    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="outline-none focus:outline-none mr-2 text-gray-400 hover:text-gray-500"
                title="Add Contact"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
            <Dialog
                open={isOpen}
                onClose={() => {
                    handleReset();
                }}
                className="fixed z-30 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                        <Dialog.Title
                            as="h3"
                            className="mb-3 text-lg font-medium leading-6 text-gray-600"
                        >
                            Add Contact
                        </Dialog.Title>


                        {error &&
                            <div className="px-4 py-2 rounded-sm text-sm bg-red-100 border border-red-200 text-red-600">
                                <div className="flex w-full justify-between items-start">
                                    <div className="flex">
                                        <svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
                                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
                                        </svg>
                                        <div>{error}</div>
                                    </div>
                                    <button className="opacity-70 hover:opacity-80 ml-3 mt-[3px]"
                                        onClick={() => {
                                            setError("");
                                        }}>
                                        <div className="sr-only">Close</div>
                                        <svg className="w-4 h-4 fill-current">
                                            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>}

                        {readQR && <div className="py-2">
                            {!loading &&
                                <QrReader
                                    facingMode={"environment"}
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{width: '100%'}}
                                />}
                            {loading && <svg fill='none' className="animate-spin m-auto opacity-20" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                <path clipRule='evenodd'
                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                    fill='currentColor' fillRule='evenodd' />
                            </svg>}
                        </div>}

                        <form
                            onSubmit={(e) => {
                                handleAddUserSubmit(e);
                            }}
                        >
                            {!invited && showSub && <div className="flex flex-col justify-center">
                                <div className="pt-5 pb-10 text-center">
                                    {userEmail && <>The email address <b>{userEmail}</b> is not yet subscribed to our Conva Messaging App.</>}
                                    {userPhone && <>The phone number <b>+{countryCode} {userPhone}</b> is not yet subscribed to our Conva Messaging App.</>}
                                </div>
                                <div className="flex self-end">
                                    <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                        onClick={() => {
                                            setShowSub(false);
                                            setInviting(false);
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 rounded"
                                        onClick={() => {
                                            handleSendInvite(false);
                                        }}>
                                        {inviting && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                            <path clipRule='evenodd'
                                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                fill='currentColor' fillRule='evenodd' />
                                        </svg>}
                                        {!inviting && <span className="py-2">Send an Invitation</span>}
                                    </button>
                                </div>
                            </div>}
                            {invited && <div className="flex flex-col justify-center">
                                <div className="p-5 text-center">
                                    Invitation Sent
                                </div>
                                <div className="flex self-end">
                                    <button type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 py-2 rounded"
                                        onClick={() => {
                                            handleReset();
                                        }}>
                                        Ok
                                    </button>

                                </div>
                            </div>}
                            {!showSub && !readQR && <><div className="relative text-gray-600 focus-within:text-gray-400">
                                <input
                                    aria-placeholder="Email"
                                    placeholder="Email"
                                    type="text"
                                    className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    onChange={(e) => {
                                        setError("");
                                        setUserPhone("");
                                        setUserEmail(e.target.value);
                                    }}
                                    value={userEmail}
                                />
                            </div>
                                <div className="flex justify-center -my-2"><span className="text-sm text-primary">or</span></div>
                                <div className="relative text-gray-600 focus-within:text-gray-400">
                                    <div className="justify-center grid grid-cols-1 xs:grid-cols-2 gap-2">
                                        <select
                                            className="text-gray-600 rounded p-2 my-3 w-full bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                            name="countryCode"
                                            defaultValue={countryCode}
                                            onChange={(e) => {
                                                setCountryCode(e.target.value);
                                            }}
                                        >
                                            {countryCodes && countryCodes.map(
                                                ({code, value, label}) => <option key={code} value={value}>{label}</option>
                                            )}
                                        </select>
                                        <input
                                            aria-placeholder="Phone"
                                            placeholder="Phone"
                                            type="text"
                                            className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                            onChange={(e) => {
                                                setError("");
                                                setUserEmail("");
                                                setUserPhone(e.target.value);
                                            }}
                                            value={userPhone}
                                        />
                                    </div></div>
                                <div className="flex justify-center -mt-2 mb-1"><span className="text-sm text-primary">or</span></div>
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded"
                                        onClick={() => {
                                            setError("");
                                            setreadQR(true);
                                        }}>
                                        <span className="py-2">Scan QR</span>
                                    </button>
                                </div>
                            </>
                            }
                            {readQR &&
                                <div className="flex justify-center mt-2">
                                    <button
                                        type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded"
                                        onClick={() => {
                                            setError("");
                                            setreadQR(false);
                                        }}>
                                        <span className="py-2">Cancel</span>
                                    </button>
                                </div>}
                            {!showSub && !readQR && <div className="mt-4 flex flex-col">
                                <div className="flex self-end">
                                    <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 rounded">

                                        {loading && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                            <path clipRule='evenodd'
                                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                fill='currentColor' fillRule='evenodd' />
                                        </svg>}
                                        {!loading && <span className="py-2">Add Contact</span>}
                                    </button>

                                </div>
                            </div>}
                        </form>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default AddContact