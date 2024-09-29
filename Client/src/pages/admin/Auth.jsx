import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { getUserStart } from '../../redux/action/user.action'
import PageNotFound from '../front/PageNotFound'

export default function Auth() {

  let loginedUser = useSelector(state => state.user.loginedUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  console.log(loginedUser);
  useEffect(() => {
    dispatch(getUserStart())

    if (!loginedUser._id) {
      setTimeout(() => {
        navigate("/login")
      }, 100);
    }
  }, [loginedUser])

  if (loginedUser.role == false) {
    if (
      location.pathname.includes('user')
     || location.pathname.includes('product')
     || location.pathname.includes('category')
    )
      return <PageNotFound />
  }


  return (
    <>

      <Outlet />

    </>
  )
}
