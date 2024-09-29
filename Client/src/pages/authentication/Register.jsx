import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addUserStart } from '../../redux/action/user.action'
import { useDispatch } from 'react-redux'
import { registerStart } from '../../redux/action/authentication.action'


let initialState = {
    name: '',
    email: '',
    password: ''
}
export default function Register() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [formData, setFormData] = useState(initialState)

    let { name, email, password } = formData

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submit = async (event) => {
        event.preventDefault()
        try {
            dispatch(registerStart(formData));

        } catch (error) {
            console.log(error.message);

        }

setTimeout(() => {
    navigate('/login')
}, 1000);

    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5">

                        <h2 className="text-center text-dark mt-5" style={{
                            fontStyle: "italic", fontWeight: "bolder"
                        }}>Register Form</h2>
                        <form className="card-body cardbody-color p-lg-5" onSubmit={submit}>

                            <div className="text-center">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile" />
                            </div>

                            <div className="mb-3">
                                <input type="text"
                                    className="form-control"
                                    id="Username"
                                    name='name'
                                    placeholder="User Name"
                                    value={name}
                                    onChange={inputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="email"
                                    className="form-control"
                                    id="email"
                                    name='email'
                                    placeholder="Email"
                                    value={email}
                                    onChange={inputChange} />
                            </div>
                            <div className="mb-3">
                                <input type="password"
                                    className="form-control"
                                    id="password"
                                    name='password'
                                    placeholder="password"
                                    value={password}
                                    onChange={inputChange} />
                            </div>


                            <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Sign Up</button></div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Already
                                Registered? <Link to="/login" className="text-dark fw-bold"> Go for Login</Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
