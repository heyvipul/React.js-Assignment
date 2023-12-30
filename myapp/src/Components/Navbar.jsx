import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const links = [
        {path : "/", title : "Login"},
        {path : "/home" , title : "Home"}
    ]

  return (
    <div>
        {
            links?.map(function(ele,index){
                return <Link key={index} to={ele.path}>{ele.title}</Link>
            })
        }
    </div>
  )
}

export default Navbar