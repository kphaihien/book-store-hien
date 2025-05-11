import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import { AiOutlineLoading, AiOutlineLoading3Quarters } from "react-icons/ai";
import { VscLoading } from "react-icons/vsc";

const PrivateRoute = ({children}) => {
    const {currentUser,loading}=useAuth()
    if(loading){
        return <>
            <p>Loading....</p>
        </>
    }
    if(currentUser){
        return children;
    }
    return <Navigate to="/login" replace/>
}

export default PrivateRoute