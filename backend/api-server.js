const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const JWTKEY = 'gsdfger144qasfd'

app.use(cookieParser())
app.use(bodyParser.json())

const members = [
  {id:3,name:'홍길동',loginId:'asd',loginPwd:'asd'}
]
app.get('/api/account', (req, res)=>{
  if(req.cookies && req.cookies.token){
    jwt.verify(req.cookies.token, JWTKEY, (err, decoded)=>{
      if(err){
        res.sendStatus(401);
      }else{
        return res.send(decoded)
      }
    })    
  } else {
    res.sendStatus(401)
  }  
})

app.post('/api/account', (req, res)=>{
  const loginId = req.body.loginId
  const loginPwd = req.body.loginPwd
  const member = members.find(m=>m.loginId === loginId && m.loginPwd === loginPwd)
  console.log(member)
  if(member){
    
    const token = jwt.sign({
      id: member.id,
      name: member.name
    }, JWTKEY, {
      expiresIn: '5m'
    })
    
    res.cookie('token', token);
    res.send(member);
  }else{
    res.sendStatus(404)
  }
})

app.delete('/api/account', (req, res)=>{
  if(req.cookies && req.cookies.token){
    res.clearCookie('token');
  }
  res.sendStatus(200);
})

app.listen(port, ()=>{
  console.log('hi~')
})