import React from 'react'
import './login.css';
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div >
                <h1 className="text-3xl font-bold underline">LOGO HERE</h1>
            </div>

            <div >
                <Link to="/login"><button>Login</button></Link>
            </div>
        </>
    )
}

export default Login
