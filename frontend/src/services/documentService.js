import axios from 'axios'

export const getUserDocuments=async(userId)=>{
    let documents=[]
    const res=await fetch(`/api/getdocuments?userId=${userId}`)
    .then(res=>res.json())
    .then(data=>{
        documents=data.Result
    })
    return documents;
}

export const createUserDocument=async(data)=>{
    let result=[]
    const plaindata=Object.fromEntries(data.entries())
    try{
const res=await axios.post('/api/createdocument',plaindata)
.then(data => {
    data=result})
    }
catch(err){
    console.log(err)
}
    
    return result
}

export const updateUserDocument=async(data)=>{
    let result=[]
   let documentId=data.get('Id')
   const plaindata=Object.fromEntries(data.entries())
    try{
await axios.put('/api/updatedocument/'+documentId,plaindata)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}

return result
}

export const deleteUserDocument=async(id)=>{
    let result=[]
    try{
await axios.delete('/api/deletedocument/'+id)
.then(data =>  data=result)
    }
catch(err){
    console.log(err)
}

return result
}
    


    
    
   
  
