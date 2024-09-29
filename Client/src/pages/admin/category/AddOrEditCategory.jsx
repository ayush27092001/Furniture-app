import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCategoryStart, updateCategoryStart } from '../../../redux/action/category.action'




let initialState = {}


export default function AddOrEditCategory() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let { id } = useParams()

    const categories = useSelector(state => state.category.categories)

    let category;

    if (id) {
        category = categories.find(category => category._id === id)

        if (category) {
            initialState = category
        } else {
            initialState = {
                name: '',
                image: '',
                status: '0'
            }
        }

    } else {
        initialState = {
            name: '',
            image: '',
            status: '0'
        }
    }


    let [formData, setFormData] = useState(initialState);
    let { name, image, status } = formData

    const inputChange = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const submit = (event) => {
        event.preventDefault()



        if (id) {
            // console.log(formData, id);

            dispatch(updateCategoryStart(formData, id))
        } else {

            dispatch(addCategoryStart(formData))
        }

        setTimeout(() => {
            navigate('/admin/category')
        }, 800);
    }



    const uploadFiles = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            image: event.target.files[0]
        }))
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
                                    <h1>{id? "Edit": "Add"} Category</h1>

                                    <Link to="/admin/category" className='btn btn-primary'>Back </Link>
                                </div>
                                <div className="card-body">

                                    <form onSubmit={submit} >

                                        <div className="mb-3">
                                            <label htmlFor='name' className="form-label">Category Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id='name'
                                                name='name'
                                                value={name}
                                                onChange={inputChange}
                                                placeholder="Category Name"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor='image' className="form-label">Category Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id='image'
                                                name='image'
                                                onChange={uploadFiles}

                                            />
                                            {
                                                image && <div className="mt-4">
                                                    <img src={ process.env.REACT_APP_BACKEND_API_URL + image} alt="" height={"90px"} />

                                                </div>
                                            }
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
