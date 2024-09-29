import React from 'react'
import HeroSection from '../../components/HeroSection'
import ProductItem from '../../components/ProductItem'
import { useSelector } from 'react-redux'

export default function Shop() {
	let products = useSelector(state => state.product.products)

	return (
		<>
			<HeroSection />

			<div className="untree_co-section product-section before-footer-section">
				<div className="container">
					<div className="row">
						{
							products.length > 0 && products.map((product, index) => (

								<ProductItem key={index} product={product} />
							))
						}

					</div>
				</div>
			</div>
		</>
	)
}
