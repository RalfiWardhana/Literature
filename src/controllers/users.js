const {users} = require("../../models")

exports.adduser =async(req,res) => {
    try{
        await users.create(req.body)
        res.send({
            status: "succes",
            message :"Success to add user",
            email : req.body.email
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.getusers =async(req,res) => {
     const id = req.users
        try{
            const data =  await users.findAll({
                attributes:{
                    exclude:["createdAt","updatedAt","password"]
                }
            })
            res.send({
                status: "succes",
                message :"Success to get users",
                data: data
            })
           
         }
         catch(error){
             console.log(error)
            res.status(500).send({
                 status: "error",
                 message: "Server Error"
             })
         } 
   
}
exports.getuser =async(req,res) => {
    const id = req.params.id;
    console.log(id)
    try{
         const data =  await users.findOne(
            {
            attributes:{
                exclude:["createdAt","updatedAt","password"]
                }
            ,
            
                where: {id}
            })
            
        res.send({
            status: "succes",
            message :"Success to get users",
            data: data
        })
       
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.updateuser =async(req,res) => {
    const id = req.params.id;
    try{ 
        console.log(req.files.photo)
        if(req.files.photo === undefined){
            await users.update({
                fullname : req.body.fullname,
                email:req.body.email,
                password:req.body.password,
                phone:req.body.phone,
                address:req.body.address,     
            },{
                    where: {id}
            })
        }
        else if(req.files.photo.length==1){
        await users.update({
            fullname : req.body.fullname,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phone,
            address:req.body.address,
            photo:"http://localhost:2015/uploads/"+req.files.photo[0].filename
        },{
                where: {id}
        })
        }
        
        const data = await users.findOne({
                where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update user",
            data: data
        })
         
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}
exports.deleteuser =async(req,res) => {
    const id = req.params.id;
    
    try{
        await users.destroy({
            where: {id}
        })
        
        res.send({
            status: "succes",
            message :"Success to delete users",
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            status: "error",
            message: "Server Error"
        })
    }
}