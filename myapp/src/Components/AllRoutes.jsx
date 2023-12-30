import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../Pages/Home'
import PrivateRoute from './PrivateRoute'
import Login from '../Pages/Login'


const AllRoutes = () => {
  return (
    <div>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>}/> 
    </Routes>
    </div>
  )
}

export default AllRoutes