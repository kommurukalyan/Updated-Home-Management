const express=require('express')
const { v4: uuidv4 } = require('uuid');
const {con}=require('../db/dbconfig')

const router=express.Router()

router.post('/api/createsubscription', (req, res) => {
    const sql = "CALL Create_Subscription(?)";
          const subscriptionid = uuidv4()
          const values = [
              subscriptionid,
              req.body.AccountName,
             req.body.PlanPeriod,
              req.body.StartDate,
              req.body.EndDate,
              req.body.UserId,
              0
          ]
          con.query(sql, [values], (err, result) => {
              if(err) return res.json({Error: "Error creating a new subscription",err});
              return res.json({Status: "Success"});
          })
      } )

      router.get('/api/getsubscriptions', (req, res) => {
        const sql = "CALL Get_Subscriptions(?)";
        con.query(sql,[req.query.userId], (err, result) => {
            res.header("Access-Control-Allow-Origin","*")
            if(err) return res.json({Status: "Error",Error: "Get users error in sql"});
            return res.json({Status: "Success", Result: result})
        })
    })
    
    router.get('/api/getsubscription/:id', (req, res) => {
        const id = req.params.id;
        const sql = "CALL Get_SubscriptionById(?)";
        con.query(sql, [id], (err, result) => {
            if(err) return res.json({Error: "Get subscription error in sql",err});
            return res.json({Status: "Success", Result: result})
        })
    })
  
    router.put('/api/updateusubscription/:id', (req, res) => {
          const id = req.params.id;
          const sql = "CALL Update_Subscription(?)";
          const values = [
            req.body.Id,
            req.body.AccountName,
           req.body.PlanPeriod,
            req.body.StartDate,
            req.body.EndDate
        ]
          con.query(sql, [values], (err, result) => {
              if(err) return res.json({Error: "update subscription error in sql",err});
              return res.json({Status: "Success"})
          })
      })

      router.delete('/api/deletesubscription/:id', (req, res) => {
          const id = req.params.id;
          const sql = "CALL Delete_Subscription(?)";
          con.query(sql, [id], (err, result) => {
              if(err) return res.json({Error: "delete subscription error in sql"});
              return res.json({Status: "Success"})
          })
      })

      module.exports=router
  
      
  