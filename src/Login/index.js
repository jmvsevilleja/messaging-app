import React, {useEffect} from "react";
import './login.css';
import {Link} from 'react-router-dom'
import ConvoLogo from '../logo.svg';
import {useNavigate} from "react-router-dom";

const Login = () => {

    let navigate = useNavigate();
    useEffect(() => {
        const user_id = localStorage.getItem("user_id");
        if (user_id) {
            navigate(`/chat`);
        }
    }, []);

    return (
        <>
            <div className="w-full min-h-screen bg-gray-50 flex flex-col justify-center items-center pt-6 sm:pt-0">
                <div className="w-full sm:max-w-md p-5 mx-auto">
                    <div className="justify-center flex">
                        <img className=" w-96" src={ConvoLogo} alt="Convo" />
                    </div>
                    <form>
                        <div className="mt-10">
                            <Link to="/login"><button className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary border border-transparent font-semibold capitalize text-white hover:bg-secondary active:bg-secondary focus:outline-none focus:border-secondary focus:ring  disabled:opacity-25 transition">Login</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
