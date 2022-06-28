import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { getCopy } from '../../store/localizationSlice'
import { login } from '../../services/userService'
import { setIsLoggedIn } from '../../store/userSlice'

import './Login.css'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const copy = useSelector(getCopy)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const loginSubmit = (e) => {
        e.preventDefault()
        login(email, password)
            .then((isSuccess) => {
                if (isSuccess) {
                    toast.success(copy.sign_in_success)
                    dispatch(setIsLoggedIn(true))
                    navigate('/')
                } else {
                    toast.error(copy.sign_in_failed)
                }
            })
    }

    return (
        <>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-4'>
                    <form id='loginform' onSubmit={loginSubmit}>
                    <div className='form-group'>
                        <label>{copy.email}</label>
                        <input
                            type='email'
                            className='form-control'
                            id='EmailInput'
                            name='EmailInput'
                            aria-describedby='emailHelp'
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label>{copy.password}</label>
                        <input
                            type='password'
                            className='form-control'
                            id='exampleInputPassword1'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary sign-in-btn'>
                        {copy.sign_in}
                    </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
