import React from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Profile() {

    let loginedUser = useSelector(state => state.user.loginedUser)

    
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
                  <h1>Profile</h1>

                  <Link to="/admin/profile/edit" className='btn btn-primary'>Edit Profile </Link>
                </div>
                <div className="card-body">
                  <p className='profile-data'>
                    <span >Name</span>
                    <span >{loginedUser.name}</span>
                  </p>
                  <p className='profile-data'>
                    <span >Email</span>
                    <span >{loginedUser.email}</span>
                  </p>
                  <p className='profile-data'>
                    <span >Image</span>
                    <span ><img src={ process.env.REACT_APP_BACKEND_API_URL + loginedUser.image} height={"60px"} alt="" /></span>
                  </p>
                  <p className='profile-data'>
                    <span >Contact No.</span>
                    <span >{loginedUser.contact}</span>
                  </p>
                  <p className='profile-data'>
                    <span >Address</span>
                    <span >{
                      loginedUser.address + " " +
                      loginedUser.city + " " +
                      loginedUser.state + " " +
                      loginedUser.country + " " +
                      loginedUser.zipCode
                    }</span>
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    </>

    )
}
