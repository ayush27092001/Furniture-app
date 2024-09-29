import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/front/Home'
import About from '../pages/front/About'
import Contact from '../pages/front/Contact'
import Shop from '../pages/front/Shop'
import Blog from '../pages/front/Blog'
import Service from '../pages/front/Service'
import Profile from '../pages/admin/profile/Profile'
import EditProfile from '../pages/admin/profile/EditProfile'
import Orders from '../pages/admin/order/Orders'
import ViewOrders from '../pages/admin/order/ViewOrders'
import Categories from '../pages/admin/category/Categories'
import AddOrEditCategory from '../pages/admin/category/AddOrEditCategory'
import Products from '../pages/admin/product/Products'
import AddOrEditProduct from '../pages/admin/product/AddOrEditProduct'
import Users from '../pages/admin/user/Users'
import AddOrEditUser from '../pages/admin/user/AddOrEditUser'
import Register from '../pages/authentication/Register'
import Login from '../pages/authentication/Login'
import Auth from '../pages/admin/Auth'
import Cart from '../pages/front/Cart'
import Checkout from '../pages/front/Checkout'
import PageNotFound from '../pages/front/PageNotFound'
import Thanks from '../pages/front/Thanks'

export default function Router() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/service' element={<Service />} />
                <Route path='/thanks' element={<Thanks />} />


                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />

                <Route path='/admin' element={<Auth />}>
                    <Route path='profile' >
                        <Route path='' element={<Profile />} />
                        <Route path='edit' element={<EditProfile />} />
                    </Route>
                    <Route path='order' >
                        <Route path='' element={<Orders />} />
                        <Route path='edit/:id' element={<ViewOrders />} />
                    </Route>
                    <Route path='category' >
                        <Route path='' element={<Categories />} />
                        <Route path='create' element={<AddOrEditCategory />} />
                        <Route path='edit/:id' element={<AddOrEditCategory />} />
                    </Route>
                    <Route path='product' >
                        <Route path='' element={<Products />} />
                        <Route path='create' element={<AddOrEditProduct />} />
                        <Route path='edit/:id' element={<AddOrEditProduct />} />
                    </Route>
                    <Route path='user' >
                        <Route path='' element={<Users />} />
                        <Route path='create' element={<AddOrEditUser />} />
                        <Route path='edit/:id' element={<AddOrEditUser />} />
                    </Route>
                </Route>


                <Route path='*' element={<PageNotFound />} />

            </Routes>

        </div>
    )
}
