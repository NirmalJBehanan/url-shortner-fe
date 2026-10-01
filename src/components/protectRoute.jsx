import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ logged, children }) => {
    if (!logged) {
       return <Navigate to="/" replace/>
    }
    return children;
}

export default ProtectRoute