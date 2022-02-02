import React from "react"
import axios from "axios";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSearchParams} from "react-router-dom";

const Nectus = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    if (false) {setSearchParams();}

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
                        localStorage.setItem("to", authToken.to);

                        navigate(`/nectus-chat`);
                    }
                })
        }


        const authToken = {
            code: searchParams.get("code"),
            ip: searchParams.get("ip"),
            id: searchParams.get("id"),
            to: searchParams.get("to"),
        };

        if (authToken.code) {
            Auth(authToken);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center p-2">
            <div className=" text-primary opacity-50"><svg fill='none' className="w-40 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                <path clipRule='evenodd'
                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                    fill='currentColor' fillRule='evenodd' />
            </svg></div>

        </div>
    );
}

export default Nectus