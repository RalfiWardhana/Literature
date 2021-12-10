import React,{useContext, useEffect, useState} from "react";
import "../styles/add.css"
import "../styles/profile.css"
import Navbar from "../component/navbar"
import { useHistory,useParams } from "react-router-dom"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';


function Edit() {
  const {isLogin, setLogins} = useContext(CartContext);
  const history = useHistory()
  const params = useParams()
  const[form,appendForm] = useState({
    title:"",
    publication_date:"",
    pages:"",
    isbnn:"",
    author:"",
   }) 

  const getLiteratures = async() => {
    try {
        const token = localStorage.getItem("token");
        setAuthToken(token)
        const literature = await API.get("/literature/"+params.id)
        console.log(literature.data.data) 
        appendForm({
            title:literature.data.data.title,
            publication_date:literature.data.data.publication_date,
            pages:literature.data.data.pages,
            isbnn:literature.data.data.isbnn,
            author:literature.data.data.author,
        })
    
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
    getLiteratures()
},[])
console.log(form)   
  const handleChange = (e) => {
    appendForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    })
}
const [photo, setPhoto] = useState(null); 
const handleChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
  }


const idUsr = localStorage.getItem("id");
const add = async(e) => {
    e.preventDefault()
     try {
         e.preventDefault()
         const token = localStorage.getItem("token");
         setAuthToken(token)
         const config ={
             headers:{
                 "Content-Type" : "multipart/form-data"
             }
         }
         const formData = new FormData()
         formData.append("title", form.title);
         formData.append("userId", idUsr);
         formData.append("publication_date", form.publication_date);
         formData.append("pages", parseInt(form.pages));
         formData.append("isbnn", form.isbnn);
         formData.append("author", form.author);
         formData.append("attache",photo);
         formData.append("status","Waiting to be verified");
         const response = await API.post("/literature",formData,config)
         console.log(response.data)
         const deleteLiterat = await API.delete("/literature/"+params.id) 
         history.push("/profile")
     }catch(error){
         console.error();
     }
  } 

   return(
       <>
         <Navbar/>
         <div className="center-profile">
             <p className="profile-header">Edit Literatures</p>
            <form onSubmit={add}> 
              <input className="input-addLiteratures" placeholder="Title" name="title" value={form.title} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="Publication Date" name="publication_date" value={form.publication_date} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="Pages" name="pages" value={form.pages} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="ISBN" name="isbnn" value={form.isbnn} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="Author" name="author" value={form.author} onChange={(e)=>handleChange(e)}></input>
              <label  className="button-change-profile"><input type="file" name="attache" className="filePhoto" onChange={handleChangePhoto} ></input>Add PDF File</label>
              <div className="flex-end-add">
                  <button className="button-addLiteratures"><p className="fill-button-addLiteratures">Edit Literatures</p></button>
              </div>
            </form>
         </div>    
        
       </>
   )
}

export default Edit