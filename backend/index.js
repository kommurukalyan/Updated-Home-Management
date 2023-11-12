const express=require('express')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const jwt=require('jsonwebtoken')
const UserRoutes=require('./routes/user.js')
const DocumentRoutes=require('./routes/document.js')
const SubcriptionRoutes=require('./routes/subscription.js')
const AuthRoutes=require('./routes/auth.js')

const app=express();

app.get('/',(req,res)=>{

})
app.use(cors())
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

app.use(SubcriptionRoutes)
app.use(AuthRoutes)
app.use(UserRoutes)
app.use(DocumentRoutes)



app.listen(8801,()=>{
    console.log('running')
})