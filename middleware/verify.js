const jwt = require("jsonwebtoken");

exports.auth= (req,res,next) => {
    const Authorization = req.header("Authorization");
    const token = Authorization && Authorization.split(" ")[1]
    console.log(token)
    if(!token){
        return res.status(401).send(
            {
                status:"access denied",
                message:"UnAuthorization "
            }
        )
    }
    try {
        const verifikasi = jwt.verify(token, process.env.TOKEN_RAHASIA)
        req.user = verifikasi;
        console.log(req.user)
        next();

    } catch (error) {
        res.status(400).send({
            status:"error",
            message:"invalid token"
        })
        
    }
}

exports.isAdmin =(req,res,next) => {
    if(req.user.status === "admin"){
        next()
        return
    }
    res.status(403).send({message:"forbiden"})

}