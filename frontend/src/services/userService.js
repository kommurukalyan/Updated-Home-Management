import axios from 'axios'




export const getAllUsers=async(adminId)=>{
    let users=[]
    const res=await fetch(`/api/getUsers?adminId=${adminId}`)
    .then(res=>res.json())
    .then(data=>{
        users=data.Result
    })
    return users;
}

export const getUserById=async(userId)=>{
    let user=[]
    const res=await fetch(`/api/getuser/${userId}`)
    .then(res=>res.json())
    .then(data=>{
        user=data.Result
    })
    return user;
}

export const createUser=async(data)=>{
    let result=[]
    try{
const res=await axios.post('/api/createuser',data)
.then(data => data=result)
    }
catch(err){
    console.log(err)
}
    
    return result
}

export const updateUser=async(data)=>{
    let result=[]
   let userId=data.get('Id')
    try{
await axios.put('/api/updateuser/'+userId,data)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}

return result
}

export const deleteUser=async(id)=>{
    let result=[]
    try{
await axios.delete('/api/deleteuser/'+id)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}

return result
}

export const updateUserProfile=async(data)=>{
    let result=[]
   let userId=data.get('Id')
    try{
await axios.put('/api/updateuserprofileimage/'+userId,data)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}
return result
}


    
    
   
  
