const {literatures,users,collections} = require("../../models")
const {auth} = require("../../middleware/verify")

exports.addCollection =async(req,res) => {
    try{
        console.log(req.files)
        const data =  await collections.create({
            literatureId:req.body.literatureId,
            userId:req.user.id
        })
        res.send({
            status: "succes",
            message :"Success to add collection",
            data:data
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
exports.getCollections =async(req,res) => {
    try{
       const data =  await collections.findAll({
           include:[
        {
            model : literatures,
            as : "literature",
            attributes : {
                exclude:["createdAt","updatedAt"]
            }      
        },
        {
            model : users,
            as : "user",
            attributes : {
                exclude:["password","createdAt","updatedAt"]
            }  
        }],
           attributes:{
               exclude:["createdAt","updatedAt"]
           }
       })
        
        res.send({
            status: "succes",
            message :"Success to get collections",
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
exports.getCollection=async(req,res) => {
    const id = req.params.id;
    try{
       const data =  await collections.findOne({
               where: {id},
               include:[
                {
                    model : literatures,
                    as : "literature",
                    attributes : {
                        exclude:["createdAt","updatedAt"]
                    }      
                },   
                {
                    model : users,
                    as : "user",
                    attributes : {
                        exclude:["password","createdAt","updatedAt"]
                    }      
                }],
                   attributes:{
                       exclude:["createdAt","updatedAt","idTrip","idUser"]
                   }
        })
        res.send({
            status: "succes",
            message :"Success to get collection",
            data:data,
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

exports.deleteCollection =async(req,res) => {
    const id = req.params.id;
    try{
       await collections.destroy({
               where: {id}
        })
       
        res.send({
            status: "succes",
            message :"Success to delete collection",
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error",
            id:id
        })
    }
}