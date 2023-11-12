import React, { useContext, useState } from 'react'
import './Login.css'
import emailicon from '../../assets/email.png'
import passwordicon from '../../assets/password.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RecoveryContext } from '../../App'




function Login() {
    const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
    const [values,setvalues]=useState({
        email:'',
        password:''
    })
    const [error,seterror]=useState('')
    const navigate=useNavigate();
    
    function nagigateToOtp() {
        
        if (values.email) {
          const OTP = Math.floor(Math.random() * 9000 + 1000);
          setOTP(OTP);
    
          axios
            .post("http://localhost:8801/send_recovery_email", {
              OTP,
              recipient_email: values.email,
            })
            .then((res) =>{
                navigate('/otpinput',{
                    state:{
                        email:values.email
                    }
                })
            } )
            .catch(console.log);
          return;
        }
        return alert("Please enter your email");
      }
    const handlesubmit=(event)=>{
  event.preventDefault();
  axios.post('http://localhost:8801/login',values)
  .then(res=>{
    if(res.data.Status=='Success'){
       let userdata=res.data.Result[0]
       let userdetails=JSON.stringify(userdata)
       localStorage.setItem('Id',userdata.Id)
       localStorage.setItem('AdminId',userdata.AdminId)
       localStorage.setItem('UserImg',userdata.Image)
       localStorage.setItem('userdata',userdetails)
   navigate('/dashboard/home',{
    state:userdata
   })
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
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>
            <form onSubmit={handlesubmit}>
            <div className='inputs'>
                {/* {action == 'Login' ? <div></div> :
                    <div className='input signup'>
                        <img src={personicon} alt='' />
                        <input type="text" placeholder='Name' />
                    </div>} */}

                <div className='input'>
                    <img src={emailicon} alt='' />
                    <input type="email" name='email' placeholder='Email Id' onChange={e=>setvalues({...values,email:e.target.value})}/>
                </div>
                <div className='input'>
                    <img src={passwordicon} alt='' />
                    <input type="password" name='password' placeholder='Password' onChange={e=>setvalues({...values,password:e.target.value})}/>
                </div>
            </div>
            <div className='error'>
                    {error && error}
                </div>
           <div className='forgot-password'><a href='#'  onClick={() => nagigateToOtp()}>Forgot Password ?</a></div>
            <div className='submit-container'>
                <button type="submit" className='submit'>Login</button>
                <Link to="/register">Not a member? Register</Link>
            
            </div>
            </form>
        </div>
    )
}

export default Login
