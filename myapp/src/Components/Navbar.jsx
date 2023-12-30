import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'


const Navbar = () => {

    const links = [
        {path : "/home" , title : "Home"},
        {path : "/", title : "Profile"}
    ]

  return (
    <div id='navbar'>
        {
            links?.map(function(ele,index){
                return <Link id='font' key={index} to={ele.path}>{ele.title}</Link>
            })
        }
    </div>
  )
}

export default Navbar