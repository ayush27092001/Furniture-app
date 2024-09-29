import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductStart, getProductStart } from '../../../redux/action/product.action'

export default function Products() {

    let products = useSelector(state => state.product.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductStart())
    }, [products.length])



    const deleteProduct = (product) => {
        dispatch(deleteProductStart(product))
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
                                    <h1>Product</h1>

                                    <Link to="/admin/product/create" className='btn btn-primary'>Add Product </Link>
                                </div>
                                <div className="card-body">

                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th >Image</th>
                                                <th >Name</th>
                                                <th >Slug</th>
                                                <th >Short Description</th>
                                                <th >Quantity</th>
                                                <th >Status</th>
                                                <th >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products.length > 0 && products.map((product, index) => (
                                                    <tr key={index}>
                                                        <th >{index + 1}</th>
                                                        <td>
                                                            <img src={ process.env.REACT_APP_BACKEND_API_URL + product.image} height={"50px"} alt="product " />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>{product.slug}</td>
                                                        <td>{product.shortDescription}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.status === true ? "Active" : "Inactive"}</td>
                                                        <td >
                                                            <Link to={`/admin/product/edit/${product._id}`} className='btn btn-secondary mx-2'>Edit</Link>
                                                            <button onClick={() => deleteProduct(product)} className='btn btn-danger'>Delete</button>
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
