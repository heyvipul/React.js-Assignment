import React, { useContext } from 'react'
import { AuthContext } from '../Pages/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const{isAuth} = useContext(AuthContext)
    console.log(isAuth);

    if(!isAuth){
        return <Navigate to={"/"} />
    }

  return children
}

export default PrivateRoute