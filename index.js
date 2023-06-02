const express = require ('express')
const jwt = require ('jsonwebtoken')
const app = express()

app.post('/login',(req,res)=>{
    const user = {
        id:1,
        username:"Anmol",
        password:"3000"
        }
        jwt.sign({user:user},'webdeveloper20',{expiresIn:"3600s"},(err,token)=>{
if (err) console.log(err)
return res.status(200).json({token:token})
        })
})

const verifytoken = (req,res,next)=>{
    const bearertoken = req.headers['authorization']
    const bearer = bearertoken.split(" ")
    const token = bearer[1]
    req.token = token
    next()
}

app.get("/api/posts",verifytoken,(req,res)=>{
jwt.verify(req.token,"webdeveloper20",(err,data)=>{
if (err){
    res.sendStatus(403)
}else{
    res.json({
        msg:"All Posts",
        response:[{},{},{}]
    })
}
})
})

const PORT = 3000
app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))