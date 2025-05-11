const jwt=require("jsonwebtoken")

const JWT_SECRET=process.env.JWT_SECRET_KEY

const authenToken=(req,res,next)=>{
    const token=req.headers['authorization']?.split(' ')[1];
    
    if(!token){
        return res.status(404).json({
            message:"Từ chối truy cập, không tìm thấy token!",
        })
    }
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(403).json({message:"Token lỗi"})
        }
        req.user=payload
        next();
    })
}

module.exports=authenToken;