import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';
import { loginedUserStart } from '../../redux/action/user.action';



let initialState = {
    email: '',
    password: ''
}
export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let users = useSelector(state => state.user.users)


    let [formData, setFormData] = useState(initialState)
    let { email, password } = formData

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submit = async (event) => {
        event.preventDefault()

        try {

            dispatch(loginedUserStart(formData))


        } catch (error) {
            console.log(error.message);
        }

        setTimeout(() => {
            navigate('/admin/profile')
        }, 1000);

    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card my-5">

                            <h2 className="text-center text-dark mt-5" style={{
                                fontStyle: "italic", fontWeight: "bolder"
                            }}>Login Form</h2>
                            <form className="card-body cardbody-color p-lg-5" onSubmit={submit}>

                                <div className="text-center">
                                    <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                        width="200px" alt="profile" />
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


                                <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Sign In</button></div>
                                <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                                    Registered? <Link to="/register" className="text-dark fw-bold"> New Registration</Link>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
