import jwt  from "jsonwebtoken";

export const verifiedToken=(req,res,next)=>{
    try {
        const token=req.header("Auth-token")
        if(!token){
            res.status(401).json({err:err.message})
        }
        const verified=jwt.verify(token,process.env.JWT)
        req.user=verified.user
        next()
    } catch (error) {
        res.status(500).json({err:error.msg})
        
    }
  
}