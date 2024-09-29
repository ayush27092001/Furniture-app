import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

export default function ViewOrders() {

    let { id } = useParams();
    let orders = useSelector(state => state.order.orders)
    const navigate = useNavigate()

    console.log(orders);
    let [order, setOrder] = useState({})

    useEffect(() => {

        let findOrder = orders.find(ord => ord._id === id)
        console.log(findOrder);
        if (findOrder) {
            setOrder(findOrder)
           
        } else {
            navigate('/admin/order')
        }

    }, [orders?.id])

    console.log(order);
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
                                    <h2>Order #{order._id}</h2>

                                    <Link to="/admin/order" className='btn btn-primary'>Back </Link>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        <li className="list-group-item active" id='sidebar' aria-current="true">Order Summary</li>
                                        <li className="list-group-item">SubTotal : {order.subTotal}</li>
                                        <li className="list-group-item">Tax : {order.tax}0</li>
                                        <li className="list-group-item">GrandTotal : {order.grandTotal}</li>

                                    </ul>

                                    <ul className="list-group my-4">
                                        <li className="list-group-item active " id='sidebar' aria-current="true">Billing Address</li>
                                        <li className="list-group-item">Customer Name : {order.address?.name}</li>
                                        <li className="list-group-item">Customer Email : {order.address?.email}</li>
                                        <li className="list-group-item">Customer Address : {order.address?.address}</li>
                                        <li className="list-group-item">Customer City : {order.address?.city}</li>
                                        <li className="list-group-item">Customer State : {order.address?.state}</li>
                                        <li className="list-group-item">Customer Country : {order.address?.country}</li>
                                        <li className="list-group-item">Customer zipCode : {order.address?.zipCode}</li>
                                        <li className="list-group-item">Customer Contact : {order.address?.contact}</li>

                                    </ul>

                                    <ul className="list-group">
                                        <li className="list-group-item active" id='sidebar' aria-current="true">Products</li>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th >#</th>
                                                    <th >Image</th>
                                                    <th >Name</th>
                                                    <th >Short Description</th>
                                                    <th >price</th>
                                                    <th >Quantity</th>
                                                    <th >Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    order.items?.length > 0 && order.items?.map((item, index) => (
                                                        <tr key={index}>
                                                            <th >{index + 1}</th>
                                                            <td>
                                                                <img src={process.env.REACT_APP_BACKEND_API_URL + item.product.image} height={"50px"} alt="item " />
                                                            </td>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.product.shortDescription}</td>
                                                            <td>{item.product.price}</td>
                                                            <td>{item.product.quantity}</td>
                                                            <td>{item.product.status == true ? "Active" : "Inactive"}</td>

                                                        </tr>
                                                    ))
                                                }



                                            </tbody>
                                        </table>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </>
    )
}
