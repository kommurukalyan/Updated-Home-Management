import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import OtpInput from './pages/Otp/OtpInput'
import { createContext, useState } from 'react'
import Reset from './pages/ResetPassword/ResetPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import Users from './pages/User/Users'
import Subscriptions from './pages/Subscriptions/Subscriptions'
import Documents from './pages/Documents/Documents'
import Profile from './pages/Profile/Profile'




export const RecoveryContext = createContext();
function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  // function NavigateComponents() {
  //    if (page === "login") return <Login />;
  //   if (page === "otp") return <OtpInput />;
  //  if (page === "reset") return <Reset />;

  //   return "Successful";
  // }
  return (
    <>
     
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center">
      <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />}></Route>
    <Route path='/register' element={<Register />}></Route>
    <Route path='/otpinput' element={<OtpInput />}></Route>
    <Route path='/reset' element={<Reset />}></Route>
    <Route path='/dashboard' element={<Dashboard />}>
        <Route path='/dashboard/home' element={<Home />}></Route>
     <Route path='/dashboard/subscriptions' element={<Subscriptions />}></Route> 
     <Route path='/dashboard/documents' element={<Documents />}></Route> 
     <Route path='/dashboard/users' element={<Users/>}></Route> 
     <Route path='/dashboard/profile' element={<Profile/>}></Route> 
      </Route>
    
      </Routes>
      </BrowserRouter>
      </div>
    </RecoveryContext.Provider>
    

    </>
  )
}

export default App