import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoutes({children,role}) {
    const isAuth=localStorage.getItem("token")||null
    const rolei=localStorage.getItem("role")|| null

  return isAuth && role==rolei ?children:<Navigate to="/" replace/>
}

export default PrivateRoutes