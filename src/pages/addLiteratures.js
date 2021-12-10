import React,{useContext, useEffect, useState} from "react";
import "../styles/add.css"
import "../styles/profile.css"
import Navbar from "../component/navbar"
import { useHistory } from "react-router-dom"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';


function Add() {
  const {isLogin, setLogins} = useContext(CartContext);
  const history = useHistory()
  const[prof,setProf] =useState([])
  const[form,appendForm] = useState({
    title:"",
    publication_date:"",
    pages:"",
    isbnn:"",
    author:"",
   }) 
   const [photo, setPhoto] = useState(null); 
   const handleChange = (e) => {
    appendForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
} 
const handleChangePhoto = (e) => {
  setPhoto(e.target.files[0]);
}

const getProfile = async() => {
  try {
      const token = localStorage.getItem("token");
      setAuthToken(token)
      const profile = await API.get("/users")
      setProf(profile.data.data)
  } catch (error) {
      console.log(error)
  }
}

useEffect(()=>{
  getProfile()
},[])

let idUser 
prof.filter((user)=>user.email == isLogin.email).map((pro)=>{
    idUser = pro.id
})
console.log(idUser)
   
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
       const birthday = new Date(form.publication_date);
       const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
       const sch = birthday.getDate() + "-" + birthday.getMonth() + "-" + birthday.getFullYear();
       const formData = new FormData()
       formData.append("title", form.title);
       formData.append("userId", idUser);
       formData.append("publication_date", sch);
       formData.append("pages", form.pages);
       formData.append("isbnn", form.isbnn);
       formData.append("author", form.author);
       formData.append("attache",photo);
       formData.append("status","Waiting to be verified");
       const response = await API.post("/literature",formData,config)
       console.log(response.data)
       history.push("/")
   }catch(error){
       console.error();
   }
}

   return(
       <>
         <Navbar/>
         <div className="center-profile">
             <p className="profile-header">Add Literatures</p>
            <form onSubmit={add}> 
              <input className="input-addLiteratures" placeholder="Title" name="title" value={form.title} onChange={(e)=>handleChange(e)}></input>
              <input type="date" className="input-addLiteratures" placeholder="Publication Date" name="publication_date" value={form.publication_date} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="Pages" name="pages" value={form.pages} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="ISBN" name="isbnn" value={form.isbnn} onChange={(e)=>handleChange(e)}></input>
              <input className="input-addLiteratures" placeholder="Author" name="author" value={form.author} onChange={(e)=>handleChange(e)}></input>
              <label  className="button-change-profile"><input type="file" name="attache" className="filePhoto" onChange={handleChangePhoto} ></input>Add PDF File</label>
              <div className="flex-end-add">
                  <button className="button-addLiteratures"><p className="fill-button-addLiteratures">Add Literatures</p></button>
              </div>
            </form>
         </div>    
        
       </>
   )
}

export default Add