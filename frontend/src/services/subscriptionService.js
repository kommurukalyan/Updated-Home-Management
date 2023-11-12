import axios from 'axios'




export const getUserSubscriptions=async(userId)=>{
    let users=[]
    const res=await fetch(`/api/getsubscriptions?userId=${userId}`)
    .then(res=>res.json())
    .then(data=>{
        users=data.Result
    })
    return users;
}

export const createUserSubscription=async(data)=>{
    let result=[]
    const plaindata=Object.fromEntries(data.entries())
    try{
const res=await axios.post('/api/createsubscription',plaindata)
.then(data => {
    data=result})
    }
catch(err){
    console.log(err)
}
    
    return result
}

export const updateUserSubscription=async(data)=>{
    let result=[]
   let subscriptionId=data.get('Id')
   const plaindata=Object.fromEntries(data.entries())
    try{
await axios.put('/api/updateusubscription/'+subscriptionId,plaindata)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}

return result
}

export const deleteUserSubscription=async(id)=>{
    let result=[]
    try{
await axios.delete('/api/deletesubscription/'+id)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}

return result
}
    


    
    
   
  
