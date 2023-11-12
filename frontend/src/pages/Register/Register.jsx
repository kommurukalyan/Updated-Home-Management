import React, { useState } from 'react'
import './Register.css'
import personicon from '../../assets/person.png'
import emailicon from '../../assets/email.png'
import passwordicon from '../../assets/password.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [values,setvalues]=useState({
        name:'',
        email:'',
        password:''
    })
    const [error,seterror]=useState('')
    const navigate=useNavigate()
    
    const handlesubmit=(event)=>{
  event.preventDefault();
  axios.post('http://localhost:8801/register',values)
  .then(res=>{
    if(res.data.Status=='Success'){
       navigate('/')
    }
    else{
    seterror(res.data.ErrorMessage)
    }
  })
  .catch(err=>console.log(err))

    }

    return (
        <div className='container login-component'>
            <div className='header'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handlesubmit}>
            <div className='inputs'>
               <div className='input signup'>
                        <img src={personicon} alt='' />
                        <input type="text" placeholder='Name' onChange={e=>setvalues({...values,name:e.target.value})} />
                    </div>
                    <div className='input'>
                    <img src={emailicon} alt='' />
                    <input type="email" name='email' placeholder='Email Id' onChange={e=>setvalues({...values,email:e.target.value})}/>
                </div>
                <div className='input'>
                    <img src={passwordicon} alt='' />
                    <input type="password" name='password' placeholder='Password' onChange={e=>setvalues({...values,password:e.target.value})}/>
                </div>
            </div>
            <div className='submit-container'>
            <button type="submit" className='submit'>Register</button>
            <Link to="/">Already a member? Login</Link>
             </div>
            </form>
        </div>
    )
}

export default Register
