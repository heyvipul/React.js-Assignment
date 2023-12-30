import React, { useContext, useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';
import axios from "axios"
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const {isAuth,setIsAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    console.log(isAuth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuth(true);
        }
    }, [setIsAuth]);


    async function onSubmit(e){
        e.preventDefault();
        try {
          const response = await axios.post('https://dummyjson.com/auth/login',{
            username : email,
            password : password
          })
          const data = response.data
          console.log(data);  
          setIsAuth(true)
          localStorage.setItem("token",data.token) 
          alert("Login Successfull!")
          navigate("/home")
          
        } catch (error) {
            console.log(error);
        }
    }

    function Logout(e) {
        e.preventDefault();
        setIsAuth(false);
        localStorage.removeItem("token");
    }
  
  if(isAuth){
    return <MDBBtn onClick={Logout} className="m-4">Logout!</MDBBtn>
  }  

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
    <h3 className='pb-2 text-center'>LOGIN</h3>

      <MDBInput onChange={(e)=>setEmail(e.target.value)} wrapperClass='mb-4' label='Username' id='form1' type='email'/>
      <MDBInput onChange={(e)=>setPassword(e.target.value)}  wrapperClass='mb-4' label='Password' id='form2' type='password'/>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn onClick={onSubmit} className="mb-4">Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="#!">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>

    </MDBContainer>
  );
}

export default Login;
