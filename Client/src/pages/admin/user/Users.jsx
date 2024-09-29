import React from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteUserStart, getUserStart } from '../../../redux/action/user.action'

export default function Users() {

    const dispatch = useDispatch()
    
    let users = useSelector(state => state.user.users)


    useEffect(() => {
        dispatch(getUserStart())
    }, [dispatch])

    const deleteUser = (user) => {
        dispatch(deleteUserStart(user))
    }

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container  py-5">
                    <div className="row">
                        <div className="col-sm-3 ">
                            <Sidebar />
                        </div>
                        <div className="col-sm-9">
                            <div className="card" >
                                <div className="card-header d-flex justify-content-between">
                                    <h1>Users</h1>
                                    <Link to={'/admin/user/create'} className='btn btn-primary'>Add User</Link>
                                </div>
                                <div className="card-body">

                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th >Image</th>
                                                <th >Name</th>
                                                <th >Email</th>
                                                <th >Role</th>
                                                <th >Status</th>
                                                <th >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.length > 0 && users.map((user, index) => (
                                                    <tr key={index}>
                                                        <th >{index + 1}</th>
                                                        <td>
                                                            <img src={ process.env.REACT_APP_BACKEND_API_URL + user.image} height={"50px"} alt="user " />
                                                        </td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.role == true ? "Admin" : "Customer"}</td>
                                                        <td>{user.status == true ? "Active" : "Inactive"}</td>

                                                        <td >
                                                            <Link to={`/admin/user/edit/${user._id}`} className='btn btn-secondary mx-2'>Edit</Link>
                                                            <button onClick={() => deleteUser(user)} className='btn btn-danger'>Delete</button>
                                                        </td>
                                                    </tr>

                                                ))
                                            }



                                        </tbody>
                                    </table>



                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
