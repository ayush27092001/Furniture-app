import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProductStart, updateProductStart } from '../../../redux/action/product.action'


let initialState = {
  name: '',
  slug: '',
  image: '',
  shortDescription: '',
  description: '',
  price: 0,
  quantity: 0,
  category: '',
  status: ''

}
export default function AddOrEditProduct() {


  let { id } = useParams()



  const dispatch = useDispatch()
  const navigate = useNavigate()

  let categories = useSelector(state => state.category.categories)
  let products = useSelector(state => state.product.products)

  categories = categories.filter(category => category.status === true)


  let [formData, setFormData] = useState(initialState)

  let { name, slug, shortDescription, description, price, quantity, category, image, status } = formData


  if (id) {

    let product = products.find(product => product._id === id)

    if (product) {
      initialState = product
    } else {
      initialState = {
        name: '',
        slug: '',
        image: '',
        shortDescription: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        status: ''
      }
    }

  } else {
    initialState = {
      name: '',
      slug: '',
      image: '',
      shortDescription: '',
      description: '',
      price: 0,
      quantity: 0,
      category: '',
      status: ''
    }
  }

  const inputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))

  }

  const submit = (event) => {
    event.preventDefault()

    if (id) {
      dispatch(updateProductStart(formData, id))
    } else {

      dispatch(addProductStart(formData))
    }
    console.log(formData);

    setTimeout(() => {
      navigate('/admin/product')
    }, 500);

  }

  const uploadFiles = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      image: event.target.files[0]
  }))
  }

  useEffect(() => {

  }, [id])


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
                  <h1> {id ? 'Edit' : 'Add'} Product</h1>

                  <Link to="/admin/product" className='btn btn-primary'>Back </Link>
                </div>
                <div className="card-body">

                  <form onSubmit={submit} >

                    <div className="mb-3">
                      <label htmlFor='name' className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id='name'
                        name='name'
                        value={name}
                        onChange={inputChange}
                        placeholder="Product Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor='slug' className="form-label">Product Slug</label>
                      <input
                        type="text"
                        className="form-control"
                        id='slug'
                        name='slug'
                        value={slug}
                        onChange={inputChange}
                        placeholder="Product Slug"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor='image' className="form-label">Product Image</label>
                      <input
                        type="file"
                        className="form-control"
                        id='image'
                        name='image'
                        onChange={uploadFiles}

                      />
                      {
                        image && <div className="mt-4">
                          <img src={ process.env.REACT_APP_BACKEND_API_URL + image} alt="" height={"90px"} />

                        </div>
                      }
                    </div>
                    <div className="mb-3">
                      <label htmlFor='shortDescription' className="form-label">Short Description</label>
                      <textarea
                        className='form-control'
                        name="shortDescription"
                        id="shortDescription"
                        cols="30"
                        rows="5"
                        defaultValue={shortDescription}
                        onChange={inputChange}>
                      </textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor='description' className="form-label">Description</label>
                      <textarea
                        className='form-control'
                        name="description"
                        id="description"
                        cols="30"
                        rows="5"
                        defaultValue={description}
                        onChange={inputChange}>
                      </textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor='price' className="form-label"> Price</label>
                      <input
                        type="number"
                        className="form-control"
                        id='price'
                        name='price'
                        value={price}
                        onChange={inputChange}
                        placeholder=" Price"
                        step='any'
                        min='0'
                      />
                    </div>


                    <div className="mb-3">
                      <label htmlFor='quantity' className="form-label"> Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        id='quantity'
                        name='quantity'
                        value={quantity}
                        onChange={inputChange}
                        placeholder=" Quantity"
                        min='1'
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor='category' className="form-label">Category</label>
                      <select
                        name="category"
                        id="category"
                        className='form-control'
                        defaultValue={category}
                        onChange={inputChange}
                      >
                        <option value="" hidden >Select Category</option>

                        {
                          categories.length > 0 && categories.map((category, index) => (
                            <option value={category._id} key={index}>{category.name}</option>
                          )
                          )

                        }
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor='status' className="form-label">Status</label>
                      <select
                        name="status"
                        id="status"
                        className='form-control'
                        defaultValue={status}
                        onChange={inputChange}
                      >
                        <option value="" hidden >Select Status</option>

                        <option value="true">Active</option>
                        <option value="false">Inactive </option>
                      </select>
                    </div>

                    <div>
                      <button className='btn btn-primary'>Submit</button>
                      <button className='btn btn-primary mx-2' type='reset'>Reset</button>
                    </div>

                  </form>

                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    </>
  )
}
