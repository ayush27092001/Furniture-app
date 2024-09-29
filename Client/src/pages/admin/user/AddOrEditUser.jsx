import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUserStart, updateUserStart } from '../../../redux/action/user.action'



let initialState = {
    name: '',
    email: '',
    password: '',
    image: '',
    contact: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    role: '',
    status: '',
}
export default function AddOrEditUser() {

    let { id } = useParams()
    let users = useSelector(state => state.user.users)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    let [formData, setFormData] = useState(initialState)

    let { name, email, password, image, contact, address, city, state, country, zipCode, role, status, } = formData


    if (id) {
        let user = users.find(user => user._id === id)

        if (user) {
            initialState = user
        } else {
            initialState = {
                name: '',
                email: '',
                image: '',
                contact: '',
                address: '',
                city: '',
                state: '',
                country: '',
                zipCode: '',
                role: '',
                status: '',
            }
        }
    } else {
        initialState = {
            name: '',
            email: '',
            password: '',
            image: '',
            contact: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            role: '',
            status: '',
        }
    }


    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }


    const uploadFiles = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            image: event.target.files[0]
        }))
    }


    const submit = async (event) => {

        event.preventDefault()

        if (id) {
            dispatch(updateUserStart(formData, id))
        } else {

            dispatch(addUserStart(formData))
        }
        console.log(formData);

        
        setTimeout(() => {
            navigate("/admin/user")
        }, 1000);

    }

useEffect(()=>{

},[id])
   
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
                                    <h1>{id ? "Edit" : 'Add'} User</h1>

                                    <Link to="/admin/user" className='btn btn-primary'>Back </Link>
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

                                        {
                                            !id && <div className="mb-3">
                                                <label htmlFor='password' className="form-label"> Password</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id='password'
                                                    name='password'
                                                    value={password}
                                                    onChange={inputChange}
                                                    placeholder=" Password"
                                                />
                                            </div>
                                        }


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







                                        <div className="mb-3">
                                            <label htmlFor='role' className="form-label">Role</label>
                                            <select
                                                name="role"
                                                id="role"
                                                className='form-control'
                                                defaultValue={role}
                                                onChange={inputChange}
                                            >
                                                <option value="" hidden >Select Role</option>

                                                <option value="true">Admin</option>
                                                <option value="false">Customer </option>
                                            </select>
                                        </div>


                                        <div className="mb-3">
                                            <label htmlFor='status' className="form-label">Status</label>
                                            <select
                                                name="status"
                                                id="status"
                                                className='form-control'
                                                defaultValue={status}
                                                onChange={inputChange}
                                            >
                                                <option value="" hidden >Select Status</option>

                                                <option value="true">Active</option>
                                                <option value="false">Inactive </option>
                                            </select>
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
