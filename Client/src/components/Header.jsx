import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getCartStart } from '../redux/action/cart.action'

export default function Header() {

	const dispatch = useDispatch()
	const cartItem = useSelector(state => state.cart.cartItem)
	const loginedUser = useSelector(state => state.user.loginedUser)


	useEffect(() => {
		dispatch(getCartStart())
	}, [loginedUser])
	return (
		<>
			{/* <!-- Start Header/Navigation --> */}
			<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

				<div className="container">
					<Link className="navbar-brand" to="/">Furni<span>.</span></Link>

					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarsFurni">
						<ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
							<li className="nav-item ">
								<NavLink className="nav-link" to="/">Home</NavLink>
							</li>
							<li><NavLink className="nav-link" to="/shop">Shop</NavLink></li>
							<li><NavLink className="nav-link" to="/about">About us</NavLink></li>
							<li><NavLink className="nav-link" to="/service">Services</NavLink></li>
							<li><NavLink className="nav-link" to="/blog">Blog</NavLink></li>


						</ul>

						<ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
							{
								loginedUser?.name && <>
									<li><Link className="nav-link" to="/admin/profile"><img src="/assets/images/user.svg" alt='' /></Link></li>
									<li><Link className="nav-link " style={{ marginRight: "30px" }} to="/cart">
										<img src="/assets/images/cart.svg" alt='' />
										{
											cartItem?.items?.length > 0 && <sup style={{ backgroundColor: "white", color: "black", fontWeight: "bold", fontSize: "18px", border: "2px solid black", borderRadius: "50px" }}>{cartItem.items.length}</sup>
										}
									</Link>
									</li>


								</>
							}
							{
								!loginedUser?.name && <>
									<div className="dropdown ">
										<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
											Sign Up/In
										</button>
										<ul className="dropdown-menu " style={{ outline: "0px", padding: "0px", margin: "0px", backgroundColor: 'unset', border: "3px solid black" }}>
											<li><NavLink className="nav-link drop" to="/register">Register</NavLink></li>
											<li><NavLink className="nav-link drop" to="/login">Login</NavLink></li>
										</ul>
									</div>
								</>
							}

						</ul>
					</div>
				</div>

			</nav>
			{/* <!-- End Header/Navigation --> */}
		</>
	)
}
