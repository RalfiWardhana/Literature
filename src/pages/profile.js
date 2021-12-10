import React,{useContext, useEffect, useState} from "react";
import "../styles/profile.css"
import "../styles/fillSearch.css"
import Navbar from "../component/navbar"
import { Button,Modal,Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";

function Profile() {
    const {isLogin, setLogins} = useContext(CartContext);
    console.log(isLogin)


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
  

    const[prof,setProf] =useState([])
    const[lite,setLite] =useState([])
    const[photo, setPhoto] = useState(null);
    // const changePhoto = async (e) => {
    //     setPhoto(e.target.files[0]);
    //     handleShow()
    // }
    const getProfile = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const profile = await API.get("/users")
            const literature = await API.get("/literatures")  
            setLite(literature.data.data)  
            setProf(profile.data.data)      
        } catch (error) {
            console.log(error)
        }
    }
    const deletee = async(aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const deleteLiterat = await API.delete("/literature/"+aidi)  
            const literature = await API.get("/literatures")  
            setLite(literature.data.data)  
                 
        } catch (error) {
            console.log(error)
        }
    }
    

    const handleChangePhoto = async (aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const config ={
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            }
    
            const formData = new FormData()
            formData.set("photo", photo);
            const responsePhoto = await API.patch(`/user/${aidi}`,formData,config)
            console.log(responsePhoto.data)
            
            const profile = await API.get("/users")
            const literature = await API.get("/literatures")  
            setLite(literature.data.data)  
            setProf(profile.data.data)
            handleShow()    
           
        } catch (error) {
            console.log(error)
        }
    }
    const changePhoto = async (e) => {
        setPhoto(e.target.files[0]);
        handleShow()
    }
    useEffect(()=>{
        getProfile()
    },[])
    console.log(prof)
    console.log(lite)

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
         <div className="center-profile">
             <p className="profile-header">Profile</p>
             <div className="profile-box">
             {prof.filter((user)=>user.email == isLogin.email).map((pro)=>(
                 <div className="profile-flex">
                     <div style={{textAlign:"left"}}>
                         <div className="profile-flex-center">
                             <img src="message.PNG" width="35px" height="35px" style={{marginRight:"15px"}} ></img>
                             <div> 
                                <p className="profile-fill">{pro.email}</p>
                                <p className="profile-desc">email</p>
                             </div>
                         </div>
                         <div className="profile-flex-center">
                             <img src="gender.PNG" width="35px" height="35px" style={{marginRight:"15px"}} ></img>
                             <div> 
                                <p className="profile-fill">{pro.gender}</p>
                                <p className="profile-desc">gender</p>
                             </div>
                         </div>
                         <div className="profile-flex-center">
                             <img src="phone.PNG" width="35px" height="35px" style={{marginRight:"15px"}} ></img>
                             <div> 
                                <p className="profile-fill">{pro.phone}</p>
                                <p className="profile-desc">Phone</p>
                             </div>
                         </div>
                         <div className="profile-flex-center-end">
                             <img src="address.PNG" width="35px" height="35px" style={{marginRight:"15px"}} ></img>
                             <div> 
                                <p className="profile-fill">{pro.address}</p>
                                <p className="profile-desc">Address</p>
                             </div>
                         </div>
                     </div>
                     <div className="profile-photo">
                        <img src ={pro.photo} height="250px" width="250px"></img>
                        <label className="button-change-profile"><input type="file" className="filePhoto" onChange={changePhoto}/>Change Photo Profile</label>
                     </div>
                     <Modal show={show}>
                        <Modal.Header closeButton>
                        <Modal.Title>Verification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure change this photo ?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>handleShow()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>handleChangePhoto(pro.id)}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>
                 </div>
              ))} 
             </div>
             <p className="profile-header">My Literature</p>
             <div className="flex-fillSearch">
                <input className="input-fillSearch" placeholder="Search for literature"  name="input" value={search.input} onChange={(e)=>handleChange(e)} ></input>
                <div className="square-fillSearch-button" onClick={()=> searchLive()} ><img src="search.PNG" width="40px" height="40px"></img></div>
             </div>
             <div className="literature-flex-center">
             {resultSearch == false ? (
                lite.filter((liteUser)=>(liteUser.user.email == isLogin.email)).map((lte)=>(
                    <div className="literature-fill">
                        {lte.status == "Approve" ? (    
                           <div style={{display:"flex",justifyContent:"center"}}>
                               <iframe src={lte.attache} style={{width:"200px",height:"258px"}} title="Iframe Example"></iframe>
                           </div>
                           ):lte.status == "Cancel" ? (
                           <div style={{display:"flex",justifyContent:"center"}}>
                               <div className="literature-profile-cancel">
                                   <div className="literature-profile-cancel-fill">Cancelled By Admin</div>
                                   <div className="flexx-evenly-button">
                                       <div className="butonn-cancel-profile" onClick={()=>deletee(lte.id)}><p style={{fontSize:"16px",color:"white"}}>Delete</p></div>
                                       <Link to={`/edit/${lte.id}`} style={{textDecoration:"none"}}><div className="butonn-edit-profile"><p style={{fontSize:"16px",color:"white"}}>Edit</p></div></Link>
                                   </div>
                               </div>
                           </div>):
                           <div className="flex-admin">
                               <div style={{display:"flex",justifyContent:"center"}}>
                               <div className="literature-profile-cancel"><div className="literature-profile-cancel-fill">Waiting be Approve</div></div>
                           </div>
                           </div>
                           }         
                        
                        <p className="header-literature">{lte.title}</p>
                        <div className="literature-flex-between">
                            <p className="name-literature">{lte.author}</p>
                            <p className="name-literature">{lte.publication_date}</p>
                        </div>
                    </div>
                ))): 
                lite.filter((cari)=>(cari.user.fullname.toLowerCase().includes(search.input.toLowerCase()) || cari.title.toLowerCase().includes(search.input.toLowerCase()) || cari.publication_date.toLowerCase().includes(search.input.toLowerCase())) && (cari.user.email == isLogin.email)).map((lte)=>(
                    <div className="literature-fill">
                        {lte.status == "Approve" ? (    
                           <div style={{display:"flex",justifyContent:"center"}}>
                               <iframe src={lte.attache} style={{width:"200px",height:"258px"}} title="Iframe Example"></iframe>
                           </div>
                           ):lte.status == "Cancel" ? (
                           <div style={{display:"flex",justifyContent:"center"}}>
                               <div className="literature-profile-cancel">
                                   <div className="literature-profile-cancel-fill">Cancelled By Admin</div>
                                   <div className="flexx-evenly-button">
                                       <div className="butonn-cancel-profile" onClick={()=>deletee(lte.id)}><p style={{fontSize:"16px",color:"white"}}>Delete</p></div>
                                       <Link to={`/edit/${lte.id}`} style={{textDecoration:"none"}}><div className="butonn-edit-profile"><p style={{fontSize:"16px",color:"white"}}>Edit</p></div></Link>
                                   </div>
                               </div>
                           </div>):
                           <div className="flex-admin">
                               <div style={{display:"flex",justifyContent:"center"}}>
                               <div className="literature-profile-cancel"><div className="literature-profile-cancel-fill">Waiting be Approve</div></div>
                           </div>
                           </div>
                           }         
                        
                        <p className="header-literature">{lte.title}</p>
                        <div className="literature-flex-between">
                            <p className="name-literature">{lte.author}</p>
                            <p className="name-literature">{lte.publication_date}</p>
                        </div>
                    </div>
                ))}    
             
             </div>
         </div>
       </>
   )
}

export default Profile