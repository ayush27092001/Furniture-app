import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategoryStart, getCategoryStart } from '../../../redux/action/category.action'


export default function Categories() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categories)

  useEffect(() => {
    dispatch(getCategoryStart(categories))
  }, [categories.length])

  const deleteCategory = (category) => {
    dispatch(deleteCategoryStart(category))
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
                  <h1>Categories</h1>

                  <Link to="/admin/category/create" className='btn btn-primary'>Add Category </Link>
                </div>
                <div className="card-body">

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th >#</th>
                        <th >Image</th>
                        <th >Name</th>
                        <th >Status</th>
                        <th >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        categories.length > 0 && categories.map((category, index) => (
                          <tr key={index}>
                            <th >{index + 1}</th>
                            <td>
                              <img src={ process.env.REACT_APP_BACKEND_API_URL + category.image} height={"50px"} alt="category " />
                            </td>
                            <td>{category.name}</td>
                            <td>{category.status === true ? "Active" : "Inactive"}</td>
                            <td >
                              <Link to={`/admin/category/edit/${category._id}`} className='btn btn-secondary mx-2'>Edit</Link>
                              <button  onClick={()=>deleteCategory(category)} className='btn btn-danger'>Delete</button>
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

