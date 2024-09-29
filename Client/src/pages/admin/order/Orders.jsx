import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderStart } from '../../../redux/action/order.action'

export default function Orders() {

    const dispatch = useDispatch()

    let orders = useSelector(state => state.order.orders)
console.log(orders);

    useEffect(() => {
        dispatch(getOrderStart())
    }, [orders.length])
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
                                    <h1>Orders</h1>

                                </div>
                                <div className="card-body">

                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th >#</th>
                                                <th >Name</th>
                                                <th >SubTotal</th>
                                                <th > Tax</th>
                                                <th >GrandTotal</th>
                                                <th >Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.length > 0 && orders.map((order, index) => (
                                                    <tr key={index}>
                                                        <th >{index + 1}</th>

                                                        <td>{order.address.name}</td>
                                                        <td>${order.subTotal}</td>
                                                        <td>$0</td>
                                                        <td>${order.grandTotal}</td>
                                                        <td >
                                                            <Link to={`/admin/order/edit/${order._id}`} className='btn btn-primary mx-2'>View</Link>
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
