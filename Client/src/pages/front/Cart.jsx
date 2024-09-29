import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/CartItem';
import { Link } from 'react-router-dom';
import { getCartStart } from '../../redux/action/cart.action';

export default function Cart() {

  const cartItem = useSelector(state => state.cart.cartItem)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getCartStart())

  }, [cartItem.items.length])
  return (
    <>
      {/* <!-- Start Hero Section --> */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Hero Section --> */}



      <div className="untree_co-section before-footer-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" >
              <div className="site-blocks-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      cartItem.items.length > 0 && cartItem.items.map((cart, index) => (
                        <CartItem key={index} cart={cart} />
                      ))

                    }



                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <Link to={'/shop'} className="btn btn-outline-black btn-sm btn-block">Continue Shopping</Link>
                </div>

              </div>

            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">

                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${cartItem.subTotal}</strong>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Tax</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${cartItem.tax}</strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${cartItem.grandTotal}</strong>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <Link to={'/checkout'} className="btn btn-black btn-lg py-3 btn-block" >Proceed To Checkout</Link >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
