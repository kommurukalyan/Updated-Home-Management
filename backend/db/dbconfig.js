const mysql=require('mysql')
const con=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'root123',
    database:'homemangement'
})

con.connect((err)=>{
    err?console.log(err):console.log('connected successfully')
})

module.exports.con=con
