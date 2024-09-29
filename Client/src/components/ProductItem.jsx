import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
// import { addToCartHelper } from '../helper/cart.helper';
import { addCartStart } from '../redux/action/cart.action';

export default function ProductItem({ product }) {

    const dispatch = useDispatch()
    let loginedUser = useSelector(state => state.user.loginedUser)
    let categories = useSelector(state => state.category.categories)


    // const getCategory = (catId) => {
    //     let category = categories.find(cat => cat._id === catId)
    //     if (category) {
    //         return category.name
    //     }
    // }



    const navigate = useNavigate()


    const addToCart = () => {

        if (!loginedUser.name) {
            setTimeout(() => {
                navigate("/login")
            }, 100);
        } else {
            let cartItemObject = {
                productId: product._id,
                qty: 2
            }
            dispatch(addCartStart(cartItemObject, loginedUser._id));
        }
    }


    return (

        <>
            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">

                <Link className="product-item" to={'/cart'} type='button' onClick={addToCart}>

                    <img src={process.env.REACT_APP_BACKEND_API_URL + product.image} className="img-fluid product-thumbnail" alt='' />

                    <h3 className="product-title">{product.name}</h3>
                    <h3 className="product-title">{product.shortDescription}</h3>
                    <h3 className="product-title">${product.price}</h3>

                    <span className="icon-cross">
                        <img src="/assets/images/cross.svg" className="img-fluid" alt='' />
                    </span>

                </Link>

            </div>
        </>
    )
}
