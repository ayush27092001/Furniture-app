import React from 'react'
import { Link } from 'react-router-dom';

export default function CategoryItem({category}) {

    return (
        <>

                    <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0" >
                        <Link className="product-item" to="/shop">
                            <img src={ process.env.REACT_APP_BACKEND_API_URL + category.image} className="img-fluid product-thumbnail" alt='' />
                            <h3 className="product-title">{category.name}</h3>

                            <span className="icon-cross">
                                <img src="/assets/images/cross.svg" className="img-fluid" alt='' />
                            </span>
                        </Link>
                    </div>
              

        </>
    )
}
