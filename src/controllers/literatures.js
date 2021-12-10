const {literatures,users} = require("../../models")
const {auth} = require("../../middleware/verify")
const Joi = require("joi");

exports.addLiterature =async(req,res) => {
  
    try{
        console.log(req.files.attache)
        const data =  await literatures.create({
            title:req.body.title,
            userId:req.user.id,
            publication_date:req.body.publication_date,
            pages:req.body.pages,
            isbnn:req.body.isbnn,
            author:req.body.author,
            attache:"http://localhost:2015/uploadsPDF/"+req.files.attache[0].filename,
            status:req.body.status
        })
        res.send({
            status: "succes",
            message :"Success to add literature",
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
exports.getLiteratures =async(req,res) => {
    try{
       const data =  await literatures.findAll({
           include:[
        {
                model : users,
                as : "user",
                attributes : {
                    exclude:["createdAt","updatedAt"]
            },      
        }],
           attributes:{
               exclude:["createdAt","updatedAt"]
           }
       })
        
        res.send({
            status: "succes",
            message :"Success to get literatures",
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
exports.getLiterature=async(req,res) => {
    const id = req.params.id;
    try{
       const data =  await literatures.findOne({
               where: {id},
               include:[
                {
                        model : users,
                        as : "user",
                        attributes : {
                            exclude:["createdAt","updatedAt"]
                    },      
                }],
                   attributes:{
                       exclude:["createdAt","updatedAt","idTrip","idUser"]
                   }
        })
        res.send({
            status: "succes",
            message :"Success to get literature",
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

exports.updateLiterature =async(req,res) => {
    const id = req.params.id;
    try{
        await literatures.update({
            status: req.body.status,  
            },{
                    where: {id}
        })
    
        const data = await literatures.findOne({
            where:{id}
        })
        res.send({
            status: "succes",
            message :"Success to update literature",
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


exports.deleteLiterature =async(req,res) => {
    const id = req.params.id;
    try{
       await literatures.destroy({
               where: {id}
        })
       
        res.send({
            status: "succes",
            message :"Success to delete literature",
            id:id
        })
    }
    catch(error){
        console.log(error)
         res.status(500).send({
            status: "error",
            message: "Server Error",
        })
    }
}