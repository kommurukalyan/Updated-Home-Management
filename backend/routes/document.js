const express=require('express')
const { v4: uuidv4 } = require('uuid');
const {con}=require('../db/dbconfig')

const router=express.Router()

router.post('/api/createdocument', (req, res) => {
    const sql = "CALL Create_Document(?)";
          const documentid = uuidv4()
          const values = [
              documentid,
              req.body.DocumentName,
             req.body.StartDate,
              req.body.RenewalPeriod,
              req.body.EndDate,
              req.body.UserId,
              0
          ]
          con.query(sql, [values], (err, result) => {
              if(err) return res.json({Error: "Error creating a new document",err});
              return res.json({Status: "Success"});
          })
      } )

      router.get('/api/getdocuments', (req, res) => {
        const sql = "CALL Get_Documents(?)";
        con.query(sql,[req.query.userId], (err, result) => {
            res.header("Access-Control-Allow-Origin","*")
            if(err) return res.json({Status: "Error",Error: "Get documents error in sql"});
            return res.json({Status: "Success", Result: result})
        })
    })
    
    router.get('/api/getdocument/:id', (req, res) => {
        const id = req.params.id;
        const sql = "CALL Get_DocumentById(?)";
        con.query(sql, [id], (err, result) => {
            if(err) return res.json({Error: "Get document error in sql",err});
            return res.json({Status: "Success", Result: result})
        })
    })
  
    router.put('/api/updatedocument/:id', (req, res) => {
          const id = req.params.id;
          const sql = "CALL Update_Document(?)";
          const values = [
            id,
            req.body.DocumentName,
            req.body.RenewalPeriod,
           req.body.StartDate,
            req.body.EndDate
        ]
          con.query(sql, [values], (err, result) => {
              if(err) return res.json({Error: "update document error in sql",err});
              return res.json({Status: "Success"})
          })
      })
      router.delete('/api/deletedocument/:id', (req, res) => {
          const id = req.params.id;
          const sql = "CALL Delete_Document(?)";
          con.query(sql, [id], (err, result) => {
              if(err) return res.json({Error: "delete document error in sql"});
              return res.json({Status: "Success"})
          })
      })

      module.exports=router
  
      