const express=require('express')
const bcrypt=require('bcrypt')
const multer=require('multer')
const path=require('path')
const { v4: uuidv4 } = require('uuid');
const {con} =require('../db/dbconfig')



const router=express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images') 
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})  
router.post('/api/createuser',upload.single('Image'), (req, res) => {
    const sql = "CALL Create_Users(?)";
    bcrypt.hash(req.body.Password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const userid = uuidv4()
        const values = [
            userid,
            req.body.Name,
           Number(req.body.Age),
            req.body.Phone,
            req.body.Email,
            hash,
            req.file.filename,
            0,
            req.body.AdminId
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside signup query",err});
            return res.json({Status: "Success"});
        })
    } )
})

router.get('/api/getUsers', (req, res) => {
    const sql = "CALL Get_Users(?)";
    con.query(sql,[req.query.adminId],(err, result) => {
        res.header("Access-Control-Allow-Origin","*")
        if(err) return res.json({Status: "Error",Error: "Get users error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

router.get('/api/getuser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "call Get_UserById(?)";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get user error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})


router.put('/api/updateuser/:id',upload.single('Image'),(req, res) => {
    const id = req.params.id;
    const sql = "CALL Update_User(?)";
    let values=[];
    if (req.file==undefined){
      values = [
        id,
        req.body.Name,
       Number(req.body.Age),
        req.body.Phone,
        req.body.Email,
        null
    ]
}
    else{
        values = [
          id,
          req.body.Name,
         Number(req.body.Age),
          req.body.Phone,
          req.body.Email,
          req.file.filename
      ]
}
    con.query(sql, [values], (err, result) => {
        if(err) return res.json({Error: "update User error in sql",err});
        return res.json({Status: "Success"})
    })
})
router.delete('/api/deleteuser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "CALL Delete_User(?)";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete user error in sql"});
        return res.json({Status: "Success"})
    })
})

router.put('/api/updateuserprofileimage/:id',upload.single('image'), (req, res) => {
    const id = req.params.id;
    const sql = "CALL Update_ProfilePic(?,?)";
    con.query(sql, [id,req.file.filename], (err, result) => {
        if(err) return res.json({Error: "update Userimage error in sql",err});
        return res.json({Status: "Success"})
    })
})

module.exports=router