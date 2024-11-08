import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import LoginLoader from '../components/LoginLoader'

import { login } from '../services/auth'
import { removeSelectedCourseCookies } from '../services/course'
import { removeAppliedProjectsCookies } from '../services/project'

import '../styles/login.css'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        console.log('Loggin in with:', email )

        if (!email || !password) {
            alert('Please fill username and password.')
            return
        }

        try {
            await login(email, password)
            removeSelectedCourseCookies()
            removeAppliedProjectsCookies()
            navigate('/courseSelection')

        } catch (error) {
            console.error(error)
            alert('Invalid email or password. Please try again.')
            setIsLoading(false)

        }
    }

    return (
        <div className="login-container">
            {isLoading && <LoginLoader message="Logging in..." />}
            <LoginForm
                handleLogin={handleLogin}
                handleEmailChange={handleEmailChange}
                handlePasswordChange={handlePasswordChange}
                email={email}
                password={password}
            />
        </div>
    )
}

export default Login
