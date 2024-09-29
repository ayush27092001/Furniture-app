import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrderStart } from '../../redux/action/order.action'
import { useNavigate } from 'react-router-dom'
import Stripe from 'react-stripe-checkout'

export default function Checkout() {

	const cartItem = useSelector(state => state.cart.cartItem)
	const dispatch = useDispatch();
	const navigate = useNavigate();




	let initialState = {
		cartId: cartItem._id,
		name: cartItem.user?.name,
		email: cartItem.user?.email,
		address: cartItem.user?.address,
		contact: cartItem.user?.contact,
		city: cartItem.user?.city,
		state: cartItem.user?.state,
		country: cartItem.user?.country,
		zipCode: cartItem.user?.zipCode,
	}


	let [formData, setFormData] = useState(initialState)
	let [payment, setPayment] = useState('Delivery')

	let { name, email, address, contact, city, state, country, zipCode } = formData

	const inputChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
		}))
	}

	const paymentChange = (event) => {
		setPayment(event.target.value);

	}

	const submit = (event) => {

		dispatch(placeOrderStart(formData))

		setTimeout(() => {
			navigate('/thanks')
		}, 100);

	}


	const handleToken = async (totalAmount, token) => {

		let jwt = localStorage.getItem('jwt_token')


		try {
			let response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/stripe/pay`, {
				headers: {
					"Content-Type": "application/json",
					"Authorization": jwt
				},
				method: "POST",
				body: JSON.stringify({
					token: token,
					amount: totalAmount
				})
			})

			console.log(response);
			submit()
		} catch (error) {
			console.log(error.message);
		}
	}


	const tokenHandler = (token) => {
		handleToken(parseFloat(cartItem.grandTotal), token)
	}

	useEffect(() => {

	}, [cartItem.items.length])

	return (
		<>
			{/* <!-- Start Hero Section --> */}
			<div className="hero">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-5">
							<div className="intro-excerpt">
								<h1>Checkout</h1>
							</div>
						</div>
						<div className="col-lg-7">

						</div>
					</div>
				</div>
			</div>
			{/* <!-- End Hero Section --> */}

			<div className="untree_co-section">
				<div className="container">


					<div className="row">
						<div className="col-md-6 mb-5 mb-md-0">
							<h2 className="h3 mb-3 text-black">Billing Details</h2>
							<div className="p-3 p-lg-5 border bg-white">

								<div className="form-group row">
									<div className="col-md-12">
										<label htmlFor="name" className="text-black"> Name <span className="text-danger">*</span></label>
										<input
											type="text"
											className="form-control"
											id="name"
											name="name"
											value={name}
											onChange={inputChange}
											placeholder='first' />
									</div>

								</div>

								<div className="form-group row">
									<div className="col-md-12">
										<label htmlFor="email" className="text-black">Email Address <span className="text-danger">*</span> </label>
										<input type="email"
											className="form-control"
											id="email"
											name="email"
											value={email}
											onChange={inputChange}
											placeholder="example@gmail.com" />
									</div>
								</div>

								<div className="form-group row">
									<div className="col-md-12">
										<label htmlFor="address" className="text-black">Address <span className="text-danger">*</span></label>
										<input
											type="text"
											className="form-control"
											id="address"
											name="address"
											value={address}
											onChange={inputChange}
											placeholder="Street address" />
									</div>
								</div>

								<div className="form-group row">
									<div className="col-md-12">
										<label htmlFor="contact" className="text-black">Phone <span className="text-danger">*</span></label>
										<input
											type="text"
											className="form-control"
											id="contact"
											name="contact"
											value={contact}
											onChange={inputChange}
											placeholder="Phone Number" />
									</div>
								</div>



								<div className="form-group row">
									<div className="col-md-6">
										<label htmlFor="city" className="text-black">City <span className="text-danger">*</span></label>
										<input
											type="text"
											className="form-control"
											id="city"
											name="city"
											value={city}
											onChange={inputChange}
											placeholder="city" />
									</div>
									<div className="col-md-6">
										<label htmlFor="state" className="text-black">State <span className="text-danger">*</span></label>
										<input
											type="text"
											className="form-control"
											id="state"
											name="state"
											value={state}
											onChange={inputChange}
											placeholder="State" />
									</div>


								</div>

								<div className="form-group row mb-5">
									<div className="col-md-6">
										<label htmlFor="country" className="text-black">Country <span className="text-danger">*</span></label>
										<input
											type="text"
											className="form-control"
											id="country"
											name="country"
											value={country}
											onChange={inputChange}
											placeholder="Country" />
									</div>

									<div className="col-md-6">
										<label htmlFor="zipCode" className="text-black"> ZipCode <span className="text-danger">*</span></label>
										<input
											type="number"
											className="form-control"
											id="zipCode"
											name="zipCode"
											value={zipCode}
											onChange={inputChange}
											placeholder="ZipCode" />
									</div>


								</div>



							</div>
						</div>
						<div className="col-md-6">



							<div className="row mb-5">
								<div className="col-md-12">
									<h2 className="h3 mb-3 text-black">Your Order</h2>
									<div className="p-3 p-lg-5 border bg-white">
										<table className="table site-block-order-table mb-5">
											<thead>
												<tr>
													<th>Product</th>
													<th>Total</th>
												</tr>

											</thead>
											<tbody>

												{
													cartItem.items.length > 0 && cartItem.items.map((item, i) => (

														<tr key={i}>

															<td> 	<img src={process.env.REACT_APP_BACKEND_API_URL + item.product.image} alt="" height={"50px"} /> &nbsp;  {item.product.name}  <strong className="mx-2">x{item.qty} </strong></td>


															<td>${item.product.price * item.qty}</td>
														</tr>
													))
												}




												<tr >
													<td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
													<td className="text-black">${cartItem.subTotal}</td>
												</tr>

												<tr>
													<td className="text-black font-weight-bold"><strong>Cart Tax</strong></td>
													<td className="text-black">${cartItem.tax}</td>
												</tr>
												<tr>
													<td className="text-black font-weight-bold"><strong>Order Total</strong></td>
													<td className="text-black font-weight-bold"><strong>${cartItem.grandTotal}</strong></td>
												</tr>
											</tbody>
										</table>





										<div className="border p-3 ">
											<h3 className="h6 mb-0">
												<input type="radio" name="payment" id="payment" value='delivery' onChange={paymentChange} />
												<label htmlFor="Delivery">Cash on delivery</label>
											</h3>


										</div>

										<div className="border p-3 mb-5">

											<h3 className="h6 mb-0">
												<input type="radio" name="payment" id="payment" value='stripe' onChange={paymentChange} />
												<label htmlFor="Delivery">Stripe</label>

											</h3>
										</div>



										<div className="form-group">
											{
												payment == 'stripe' && <Stripe stripeKey='pk_test_51HqyueDS0O4mepKZvRFaIVN7eKLKUXyiRvl62lnoIo5zoSrYmfUPMJLFJeuA9r87vKicVEz20QZrVZTgJtH57ZOM00M7xl715D' token={tokenHandler} />

											}
											<button className="btn btn-black btn-lg py-3 btn-block mx-3" type='button' onClick={submit}>Place Order</button>
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
