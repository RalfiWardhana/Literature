import React,{useContext, useEffect, useState} from "react";
import "../styles/profile.css"
import "../styles/collections.css"
import "../styles/fillSearch.css"
import Navbar from "../component/navbar"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";

function Collections() {
    const {isLogin, setLogins} = useContext(CartContext);
    const[lite,setLite] =useState([])
    const[prof,setProf] =useState([])
    const getCollection = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const literature = await API.get("/collections")
            const profile = await API.get("/users")
            setLite(literature.data.data)
            setProf(profile.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCollection()
    },[])
    console.log(lite)

    let idUser 
    prof.filter((user)=>user.email == isLogin.email).map((pro)=>{
        idUser = pro.id
    })
    console.log(idUser)

    const[search,setSearch] = useState({
        input:""
    })
    const[resultSearch,setResultSearch] = useState(false)

    const handleChange =(e) => {
        setSearch({...search,[e.target.name]:e.target.value})
    }
    const searchLive = () => {
        setResultSearch(true)
    }

   
   return(
       <>
         <Navbar/>
         <div className="center-collection">
            <p className="profile-header">My Collections</p>
            <div className="flex-fillSearch">
                <input className="input-fillSearch" placeholder="Search for literature"  name="input" value={search.input} onChange={(e)=>handleChange(e)} ></input>
                <div className="square-fillSearch-button" onClick={()=>searchLive()} ><img src="search.PNG" width="40px" height="40px"></img></div>
             </div>
            <div className="literature-flex-center">
            {resultSearch == false ? (
                lite.filter((idUsr)=>idUsr.userId == idUser).map((lte)=>(
                    <div className="literature-fill">
                        {/* <img src="frontPDF.PNG"></img> */}
                        <iframe src={lte.literature.attache} style={{width:"200px",height:"258px"}} title="Iframe Example"></iframe>
                        <p className="header-literature">{lte.literature.title}</p>
                        <div className="literature-flex-between">
                            <p className="name-literature">{lte.literature.author}</p>
                            <p className="name-literature">{lte.literature.publication_date}</p>
                        </div>
                    </div>
                 ))):
                 lite.filter((cari)=>(cari.user.fullname.toLowerCase().includes(search.input.toLowerCase()) || cari.literature.title.toLowerCase().includes(search.input.toLowerCase()) || cari.literature.publication_date.toLowerCase().includes(search.input.toLowerCase())) && (cari.literature.status=="Approve") && (cari.userId == idUser)).map((lte)=>(
                    <div className="literature-fill">
                        {/* <img src="frontPDF.PNG"></img> */}
                        <iframe src={lte.literature.attache} style={{width:"200px",height:"258px"}} title="Iframe Example"></iframe>
                        <p className="header-literature">{lte.literature.title}</p>
                        <div className="literature-flex-between">
                            <p className="name-literature">{lte.literature.author}</p>
                            <p className="name-literature">{lte.literature.publication_date}</p>
                        </div>
                    </div>
                 ))}    
              
            </div>
         </div>
       </>
   )
}

export default Collections