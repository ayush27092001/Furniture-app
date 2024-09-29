import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUserStart } from '../../redux/action/user.action'

export default function Sidebar() {


    let loginedUser = useSelector(state => state.user.loginedUser)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(logoutUserStart())

        setTimeout(() => {
            navigate('/login')
        }, [500])
    }

    return (

        <>
            <ul className="list-group" >
                <li className="list-group-item active " id='sidebar' aria-current="true">Sidebar</li>

                <li className="list-group-item" >
                    <Link to={'/admin/profile'} >Profile</Link>
                </li>

                <li className="list-group-item">
                    <Link to={'/admin/order'} >Orders</Link>
                </li>
                {
                    loginedUser.role == true && (
                        <>

                            <li className="list-group-item">
                                <Link to={'/admin/category'} >Categories</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to={'/admin/product'} >Products</Link>
                            </li>

                            <li className="list-group-item">
                                <Link to={'/admin/user'} >Users</Link>
                            </li>
                        </>
                    )
                }

                {/* <>

                    <li className="list-group-item">
                        <Link to={'/admin/category'} >Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={'/admin/product'} >Products</Link>
                    </li>

                    <li className="list-group-item">
                        <Link to={'/admin/user'} >Users</Link>
                    </li>
                </> */}
                <li className="list-group-item">
                    <Link onClick={logout} >Logout</Link>
                </li>

            </ul>
        </>
    )
}
