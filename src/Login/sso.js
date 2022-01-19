import React from "react"
import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const REDIRECT_LOGIN_URL = "https://www.clinica-sso.com.au/login/?redirect=";
const RETURN_URL = "https://develop.dtx7zjrnqqy6a.amplifyapp.com/login/?";
const RETURN_URL_PROD = "https://master.dtx7zjrnqqy6a.amplifyapp.com/login/?";

const SSO = (props) => {
    const [headerMessage, setHeaderMessage] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {

        const Auth = async (authToken) => {
            await axios({
                url: `https://w2kbuc7s59.execute-api.ap-southeast-2.amazonaws.com/api/token`,
                method: 'GET',
                params: {id: authToken.id, code: authToken.code},
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        const accessToken = {
                            id: response.data.message[0].id,
                            id_token: response.data.message[0].id_token,
                            access_token: response.data.message[0].access_token,
                            refresh_token: response.data.message[0].refresh_token,
                            token_type: response.data.message[0].token_type,
                        };

                        localStorage.setItem("auth_token", accessToken.id_token);
                        localStorage.setItem("refresh_token", accessToken.refresh_token);
                        localStorage.setItem("access_token", accessToken.access_token);
                        localStorage.setItem("user_id", accessToken.id);

                        navigate(`/chat`);
                    }
                })
        }

        let returnurl = RETURN_URL_PROD;
        if (window.location.hostname === "localhost") {
            returnurl = "http://localhost:3000/login?";
        }
        if (window.location.hostname === 'develop.dtx7zjrnqqy6a.amplifyapp.com') {
            returnurl = RETURN_URL;
        }
        let query = window.location.search;

        let c = query.replace("?", "");

        // SSO
        var result = c.split("/");
        const authToken = {
            code: result[result.length - 1],
            ip: result[result.length - 2],
            id: result[result.length - 3],
        };
        if (authToken.code) {
            Auth(authToken);
        } else {
            setHeaderMessage("Redirect to login page...");
            setTimeout(() => {
                window.location.href = REDIRECT_LOGIN_URL + returnurl;
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full h-screen bg-gray-50 flex flex-col justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md p-5 mx-auto text-center">
                <h3>{headerMessage}</h3>
            </div>
        </div>
    );
}

export default SSO