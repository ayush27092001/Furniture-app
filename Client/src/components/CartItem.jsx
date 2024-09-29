import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartStart, deleteCartStart, updateCartStart } from '../redux/action/cart.action'

export default function CartItem({ cart }) {

    const dispatch = useDispatch()

    const cartItem = useSelector(state => state.cart.cartItem)
    const loginedUser = useSelector(state => state.user.loginedUser)
    let [qty, setQty] = useState(parseInt(cart.qty))




    const incrementQty = () => {
        // setQty(qty + 1)

        let Cartt = {
            cartId: cartItem._id,
            productId: cart.product._id,
            userId: loginedUser._id,
            qty: qty + 1
        }
        dispatch(updateCartStart(Cartt))
    }

    const decrementQty = () => {
        if (qty > 1) {
            let Cartt = {
                cartId: cartItem._id,
                productId: cart.product._id,
                userId: loginedUser._id,
                qty: qty - 1
            }
            dispatch(updateCartStart(Cartt))

        }
    }

    const removeItem = () => {
        let Cartt = {
            cartId: cartItem._id,
            productId: cart.product._id,
            userId: loginedUser._id,
        }

        dispatch(deleteCartStart(Cartt))
    }

    useEffect(() => {
        setQty(parseInt(cart.qty))
    }, [cart.qty])

    return (


        <>
            <tr >
                <td className="product-thumbnail">
                    <img src={process.env.REACT_APP_BACKEND_API_URL + cart.product?.image} alt="img" className="img-fluid" />
                </td>
                <td className="product-name">
                    <h2 className="h5 text-black">{cart.product?.name}</h2>
                </td>
                <td>${cart.product?.price}</td>
                <td>
                    <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{
                        maxWidth: "120px"
                    }}>
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-black decrease" type="button" onClick={decrementQty}>&minus;</button>
                        </div>
                        <input
                            type="text"
                            className="form-control text-center quantity-amount"
                            readOnly
                            value={qty}
                            onChange={(event) => { setQty(parseInt(event.target.value)) }}
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-black increase" type="button" onClick={incrementQty}>&#43;</button>
                        </div>
                    </div>

                </td>
                <td>${cart.product?.price * qty}</td>
                <td><button onClick={removeItem} className="btn btn-black btn-sm " type='button'>X</button></td>
            </tr>
        </>
    )
}
