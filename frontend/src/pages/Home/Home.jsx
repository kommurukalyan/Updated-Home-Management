import React, { useEffect, useState } from 'react'
import BasicCard from '../../components/Card'
import './Home.css'
import { useNavigate } from "react-router-dom";
import * as subscriptionService from '../../services/subscriptionService'
import * as documentService from '../../services/documentService'
import * as userService from '../../services/userService'

function Home() {
const [subscriptionscount,setsubscriptionscount]=useState(0)
const [documentscount,setdocumentscount]=useState(0)
const [userscount,setuserscount]=useState(0)
 const navigate=useNavigate()
 let userId=localStorage.getItem('Id')
 let adminId=localStorage.getItem('AdminId')

 useEffect(()=>{
  subscriptionService.getUserSubscriptions(userId)
  .then(data=>{
    setsubscriptionscount(data[0].length)
      })
 },[subscriptionscount])
 useEffect(()=>{
  documentService.getUserDocuments(userId).then(data=>setdocumentscount(data[0].length))
 },[documentscount])
 useEffect(()=>{
  userService.getAllUsers(adminId).then(data=>setuserscount(data[0].length))
 },[userscount])

 
 const openuserspage=()=>{
  navigate('/dashboard/users')
 }
 const opensubscriptionspage=()=>{
  navigate('/dashboard/subscriptions')
 }
 const opendocumentspage=()=>{
  navigate('/dashboard/documents')
 }
  return (
    <div>
      <div className='card-containers'>
    <BasicCard count={subscriptionscount} name="Subscriptions" color="white" bgcolor="#0D6EFD" clickhandler={opensubscriptionspage}/>
     <BasicCard count={documentscount} name="Documents"  color="white" bgcolor="#DC3545" clickhandler={opendocumentspage}/>
     <BasicCard count={userscount} name="Users" color="white" bgcolor="#198754" clickhandler={openuserspage}/>
    </div>
    </div>
  )
}

export default Home
