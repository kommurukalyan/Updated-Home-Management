const express=require('express')
const { v4: uuidv4 } = require('uuid');
const {con}=require('../db/dbconfig')
const bcrypt=require('bcrypt')
const cookieparser=require('cookie-parser')
const jwt=require('jsonwebtoken')
const nodemailer = require("nodemailer");
require("dotenv").config();


const app= new express()

app.use(cookieparser())

const router=express.Router()

router.post("/register", (req, res) => {
    const sql = "CALL Create_Admins(?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const userid = uuidv4()
        const values = [
            userid,
            req.body.name,
             null,
            null,
            req.body.email,
            hash,
            null,
            0
        ]
        con.query(sql, [values], (err, result) => {
          console.log(err)
            if(err) return res.json({Error: "Error registering a user",err});
            return res.json({Status: "Success"});
        })
    } )
})
  

router.post('/login',(req,res)=>{
    const username = req.body.email;
    const password = req.body.password;
  
    con.query(
      "SELECT * FROM users WHERE email = ? and isDeleted=0;",
      username,
      (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].Password, (error, response) => {
            if (response) {
                const id = result[0].Id;
                const token = jwt.sign({role: "user"}, "jwt-secret-key", {expiresIn: '1d'});
                res.cookie('token', token);
                return res.json({Status: "Success",Result:result})
            } else {
              res.send({ ErrorMessage: "Wrong username/password combination!" });
            }
          });
        } else {
          res.send({ ErrorMessage: "User doesn't exist" });
        }
      }
    );
})

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, 
      auth: {
        user: process.env.SMTP_MAIL, 
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.SMTP_MAIL,
      to: recipient_email,
      subject: "PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>HomeManagement - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Home Management. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Home ManagementInc</p>
      <p>1600 Wallstreet</p>
      <p>California</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        return reject({ message: `An error has occured` });
      }
      return resolve({ email:recipient_email,message: "Email sent succesfuly" });
    });
  });
}

router.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send({
      email:response.email,
      message:response.message
    }))
    .catch((error) => res.status(500).send(error.message));
});

router.post("/changepassword", (req, res) => {
  const sql = "CALL Update_Password(?);";
  bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
      if(err) return res.json({Error: "Error in hashing password"});
      const values = [
          req.body.email,
          hash
      ]
      con.query(sql, [values], (err, result) => {
          if(err) return res.json({Error: "Error updating password ",err});
          return res.json({Status: "Success"});
      })
  } )
});

module.exports=router
