import React from 'react'
import HeroSection from '../../components/HeroSection'
import WhyChooseUs from '../../components/WhyChooseUs'
import { Link } from 'react-router-dom'
import CategoryItem from '../../components/categoryItem'
import { useSelector } from 'react-redux'

export default function Home() {
    let categories = useSelector(state => state.category.categories)

    return (
        <>

            <HeroSection />

            {/* <!-- Start Product Section --> */}
            <div className="product-section">
                <div className="container">
                    <div className="row">

                        {/* <!-- Start Column 1 --> */}
                        <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                            <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
                            <p className="mb-4">Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. </p>
                            <p><Link to="/shop" className="btn">Explore</Link></p>
                        </div>
                        {/* <!-- End Column 1 --> */}

                        {/* <!-- Start Column 2 --> */}

                        {
                            categories.length > 0 && categories.map((category, index) => (

                                <CategoryItem key={index} category = {category} />
                            ))
                        }




                    </div>
                </div>
            </div>
            {/* <!-- End Product Section --> */}

            {/* <!-- Start Why Choose Us Section --> */}
            <WhyChooseUs />
            {/* <!-- End Why Choose Us Section --> */}

            {/* <!-- Start We Help Section --> */}
            <div className="we-help-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="imgs-grid">
                                <div className="grid grid-1"><img src="/assets/images/img-grid-1.jpg" alt="Untree.co" /></div>
                                <div className="grid grid-2"><img src="/assets/images/img-grid-2.jpg" alt="Untree.co" /></div>
                                <div className="grid grid-3"><img src="/assets/images/img-grid-3.jpg" alt="Untree.co" /></div>
                            </div>
                        </div>
                        <div className="col-lg-5 ps-lg-5">
                            <h2 className="section-title mb-4">We Help You Make Modern Interior Design</h2>
                            <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada</p>

                            <ul className="list-unstyled custom-list my-4">
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                                <li>Donec vitae odio quis nisl dapibus malesuada</li>
                            </ul>
                            <p><a href="##" className="btn">Explore</a></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End We Help Section --> */}

            {/* <!-- Start Popular Product --> */}
            <div className="popular-product">
                <div className="container">
                    <div className="row">

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="/assets/images/product-1.png" alt="Img" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Nordic Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><a href="##">Read More</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="/assets/images/product-2.png" alt="Img" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Kruzo Aero Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><a href="##">Read More</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src="/assets/images/product-3.png" alt="Img" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Ergonomic Chair</h3>
                                    <p>Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio </p>
                                    <p><a href="##">Read More</a></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- End Popular Product --> */}



            {/* <!-- Start Blog Section --> */}
            <div className="blog-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-6">
                            <h2 className="section-title">Recent Blog</h2>
                        </div>
                        <div className="col-md-6 text-start text-md-end">
                            <a href="##" className="more">View All Posts</a>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="##" className="post-thumbnail"><img src="/assets/images/post-1.jpg" alt="Img" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="##">First Time Home Owner Ideas</a></h3>
                                    <div className="meta">
                                        <span>by <a href="##">Kristin Watson</a></span> <span>on <a href="##">Dec 19, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="##" className="post-thumbnail"><img src="/assets/images/post-2.jpg" alt="Img" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="##">How To Keep Your Furniture Clean</a></h3>
                                    <div className="meta">
                                        <span>by <a href="##">Robert Fox</a></span> <span>on <a href="##">Dec 15, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="##" className="post-thumbnail"><img src="/assets/images/post-3.jpg" alt="Img" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="##">Small Space Furniture Apartment Ideas</a></h3>
                                    <div className="meta">
                                        <span>by <a href="##">Kristin Watson</a></span> <span>on <a href="##">Dec 12, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* <!-- End Blog Section -->	 */}




        </>
    )
}
