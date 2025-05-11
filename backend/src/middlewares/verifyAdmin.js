
const verifyAdmin=(req,res,next)=>{
    
    if(!req.user.role==="admin"){
        return res.status(403).json({message:"Chỉ dành cho admin"})
    }
    next();
}

module.exports=verifyAdmin;