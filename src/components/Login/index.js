import React from 'react'
import './login.css';
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div class="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div class="w-full sm:max-w-md p-5 mx-auto">
                    <div class="justify-center flex"><img
                        class="w-9/12"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
                        alt=""
                    /></div>
                    <form>
                        <div class="mt-6">
                            <Link to="/login"><button class="w-full inline-flex items-center justify-center px-4 py-2 bg-cyan-600 border border-transparent font-semibold capitalize text-white hover:bg-cyan-700 active:bg-cyan-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-700 disabled:opacity-25 transition">Login</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
