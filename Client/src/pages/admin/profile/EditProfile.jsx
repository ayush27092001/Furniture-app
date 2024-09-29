import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { profileEditUserStart } from '../../../redux/action/user.action'


export default function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let loginedUser = useSelector(state => state.user.loginedUser)

    let currentUser = { ...loginedUser }

    delete currentUser.password

    let [formData, setFormData] = useState(currentUser)

    const { name = " ", email = " ", image = '', contact = " ", address = " ", city = " ", state = " ", country = " ", zipCode = " ", } = formData


    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value

        }))
    }


    const uploadFiles = (event) => {
        try {
            setFormData((prevState) => ({
                ...prevState,
                image: event.target.files[0]

            }))
        } catch (error) {
            console.log(error.message);
        }

    }


    const submit = (event) => {
        try {
            event.preventDefault()

            dispatch(profileEditUserStart(formData, formData._id))

        } catch (error) {
            console.log(error.message);
        }



        setTimeout(() => {
            navigate("/admin/profile")
        }, 1000);

    }




    return (
        <>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-sm-3">
                            <Sidebar />
                        </div>
                        <div className="col-sm-9">
                            <div className="card" >
                                <div className="card-header d-flex justify-content-between">
                                    <h1>Edit Profile</h1>

                                    <Link to="/admin/profile" className='btn btn-primary'>Back </Link>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submit}>

                                        <div className="mb-3">
                                            <label htmlFor='name' className="form-label"> Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='name'
                                                name='name'
                                                value={name}
                                                onChange={inputChange}
                                                placeholder=" Name"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor='email' className="form-label"> Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id='email'
                                                name='email'
                                                value={email}
                                                onChange={inputChange}
                                                placeholder=" Email"
                                            />
                                        </div>




                                        <div className="mb-3">
                                            <label htmlFor='image' className="form-label">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='image'
                                                name='image'
                                                onChange={uploadFiles}

                                            />
                                            {
                                                image && <div className='my-4'>
                                                    <img src={ process.env.REACT_APP_BACKEND_API_URL + image} alt="" height={"100px"} />
                                                </div>
                                            }
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor='contact' className="form-label">Contact Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='contact'
                                                name='contact'
                                                value={contact}
                                                onChange={inputChange}
                                                placeholder="Contact Number"
                                            />
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor='address' className="form-label">Address</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='address'
                                                name='address'
                                                value={address}
                                                onChange={inputChange}
                                                placeholder="Address"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor='city' className="form-label">City</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='city'
                                                name='city'
                                                value={city}
                                                onChange={inputChange}
                                                placeholder="City"
                                            />
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor='state' className="form-label">State</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='state'
                                                name='state'
                                                value={state}
                                                onChange={inputChange}
                                                placeholder="State"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor='country' className="form-label">Country</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='country'
                                                name='country'
                                                value={country}
                                                onChange={inputChange}
                                                placeholder="Country"
                                            />
                                        </div>



                                        <div className="mb-3">
                                            <label htmlFor='zipCode' className="form-label">zip Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='zipCode'
                                                name='zipCode'
                                                value={zipCode}
                                                onChange={inputChange}
                                                placeholder="zip Code"
                                            />
                                        </div>


                                        <div>
                                            <button className='btn btn-primary'>Submit</button>
                                            <button className='btn btn-primary mx-2' type='reset'>Reset</button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}
