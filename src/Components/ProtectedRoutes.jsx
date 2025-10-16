import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const auth=localStorage.getItem("token")||null
    const role=localStorage.getItem("role")||null
    if (auth&&role=="user"){
        return <Navigate to={"/user/home"} replace/>
    }
    else if(auth&& role=="admin"){
        return <Navigate to={"/admin/home"} replace/>
    }
  return children
}

export default ProtectedRoutes