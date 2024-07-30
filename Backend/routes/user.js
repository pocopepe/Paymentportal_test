const express=require('express');
const router= express.Router();
const schema=require('../schemas');
const jwt=require('jsonwebtoken');
const JWT_secret=require('../config')
const zod=require('zod');

schema();

const userSchema=zod.object({
    "email": zod.string().email(),     
    "password": zod.string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be at most 100 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    "firstName": zod.string(),
    "lastName": zod.string()
})

router.post('/signup', async(req, res)=>{
    const user={"email" :req.body.email , "password": req.body.password, "firstName": req.body.firstName, "lastName": req.body.lastName};
    const result=userSchema.safeParse(req.body);
    const ifExist=await schema.User.findOne({"email": user.email});
    if(ifExist._id){
        res.status(400).json({success: false});
    }
    if(!result.success){
        return(res.status(400).json({success: false, errors: result.error.errors}));
    }
    const toStore=new schema.User(user);
    const token=jwt.sign({userId: ifExist._id}, JWT_secret)
    toStore.save().then(()=>{return(res.status(200).json({success: true, token: token}))});
})

router.post('/signin', (req, res)=>{
    
})

module.exports = router;