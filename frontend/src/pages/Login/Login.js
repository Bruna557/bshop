import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { login } from '../../services/mocks/userService'

const Login = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const loginSubmit = (e) => {
        e.preventDefault()
        login(email, password)
            .then((isSuccess) => {
                if (isSuccess) {
                    toast.success('You are logged in!')
                    navigate('/')
                } else {
                    toast.error('Login failed')
                }
            })
    }

    return (
        <>
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <form id="loginform" onSubmit={loginSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="EmailInput"
                            name="EmailInput"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
