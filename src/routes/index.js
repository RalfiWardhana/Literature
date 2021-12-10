const{Router} = require("express");
const router = Router();
const {auth} = require("../../middleware/verify")
const {uploadFile} = require("../../middleware/upload")
const {uploadPDF} = require("../../middleware/uploadPdf")
const{register,login} = require("../controllers/auth")
const{addLiterature,getLiteratures,getLiterature,updateLiterature,deleteLiterature}=require("../controllers/literatures")
const{addCollection,getCollections,getCollection,deleteCollection}=require("../controllers/collections")
const{adduser,getusers,getuser,updateuser,deleteuser}=require("../controllers/users")

router.post("/register",register)
router.post("/login",login)

router.post("/user",auth,adduser)
router.get("/users",auth,getusers)
router.get("/user/:id",auth,getuser)
router.patch("/user/:id",auth,uploadFile("photo"),updateuser)
router.delete("/user/:id",auth,deleteuser)

router.post("/literature",auth,uploadPDF("attache"),addLiterature)
router.get("/literatures",auth,getLiteratures)
router.get("/literature/:id",auth,getLiterature)
router.patch("/literature/:id",auth,updateLiterature)
router.delete("/literature/:id",auth,deleteLiterature)

router.post("/collection",auth,addCollection)
router.get("/collections",auth,getCollections)
router.get("/collection/:id",auth,getCollection)
router.delete("/collection/:id",auth,deleteCollection)



module.exports=router;