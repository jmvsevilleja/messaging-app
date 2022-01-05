import React from 'react'
import './login.css';
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div >
                <h1 class="text-3xl font-bold underline">LOGO HERE</h1>
            </div>

            <div >
                <Link to="/login"><button class="bg-sky-600 hover:bg-sky-700 ...">Login</button></Link>
            </div>
        </>
    )
}

export default Login
