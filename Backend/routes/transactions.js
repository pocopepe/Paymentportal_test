const express=require('express');
const router= express.Router();
const schema=require('../schemas');
const zod=require('zod');
const Account=require('../schemas');
const auth=require('../middleware/auth');


router.post('/transfer', auth, async(req, res)=>{
    const session= await mongoose.startSession();

    session.startTransaction();
    const {toAccountId, amount}=req.body;
    const account= await Account.findOne({userId: req.userId}).session(session);
    if(!account || account.balence<amount){
        await session.abortTransaction();
        return (res.status(400).json({success: false, "msg": "Account doesn't exist or insufficient balence"}));
    }

    const toAccount=await Account.findOne({userId:toAccountId}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return (res.status(400).json({success: false, "msg": "Account to which money's being sent to, does not exists"}));
    }

    await Account.updateOne({userId: req.userId}, {$inc:{balence: -amount}});
    await Account.updateOne({userId: toAccountId}, {$inc: {balence: amount}});

    session.commitTransaction();

    res.json({success: true, "msg": "Transaction went through smoothhhhhhhhhhhh"});
})