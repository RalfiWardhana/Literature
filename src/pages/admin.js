import React,{useContext, useEffect, useState} from "react";
import "../styles/admin.css"
import "../component/navbar.css"
import { Button,Modal,Dropdown,Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';


function Admin() {
    const {isLogin, setLogins} = useContext(CartContext);
    const history = useHistory()
    const[lite,setLite] =useState([])
    const getLiterature = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const literature = await API.get("/literatures")  
            setLite(literature.data.data)  
              
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatus = (status) => {
        if(status=="Approve"){
            return "status-approve"
        }
        else if(status=="Waiting to be verified"){
            return "status-waiting"
        }
        else if(status=="Cancel"){
            return "status-cancel"
        }
    }
    const handleApprove = async (aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const responseUpdate = await API.patch("/literature/"+aidi,{status:"Approve"})

            const literature = await API.get("/literatures")  
            setLite(literature.data.data) 
          
        } catch (error) {
            console.log(error)
        }   
    }

    const handleCancel = async (aidi) => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
    
            const responseUpdate = await API.patch("/literature/"+aidi,{status:"Cancel"})

            const literature = await API.get("/literatures")  
            setLite(literature.data.data) 
          
        } catch (error) {
            console.log(error)
        }   
    }


    useEffect(()=>{
        getLiterature()
    },[])
    console.log(lite)
    let i = 1

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("isAdmin")
        setLogins({islog:false,email:localStorage.getItem('email'),isadmin:false,isAuth:localStorage.getItem('token') ? true : false});
        console.log("pppp")
        history.push("/auth")
    } 

   return(
       <>
        <div className="flex-navbar">
            <div className="center-navbar-logo-admin">
                <img src="literatur.PNG" width="170px" height="50px"></img>
            </div>
            <div className="center-navbar">
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic" className="droptoggle">       
                </Dropdown.Toggle>
                <img src="admin.PNG" width="70px" height="70px" className="admin-logo" ></img>
                <Dropdown.Menu style={{marginTop:"10px"}}>
                <div className="flex-dropdown">
                    <div><img src="/dropLogout.PNG" className="logo-dropdown"></img></div>
                    <Dropdown.Item  style={{fontWeight:"700"}} onClick={()=>logout()}>Logout</Dropdown.Item>
                </div>    
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </div>
        <div className="center-admin">
             <p className="admin-header">Book Verification</p>
             <Table >
                <thead>
                    <tr className="thead">
                        <th>No</th>
                        <th>User Of Author</th>
                        <th>ISBN</th>
                        <th>Literature</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {lite.map((lte)=>(
                    <tr className="tbod">
                        <td>{i++}</td>
                        <td>{lte.author}</td>
                        <td>{lte.isbnn}</td>
                        <td style={{color:"#0058DD",textDecoration:"none"}}><a style={{color:"#0058DD",textDecoration:"none"}} href={lte.attache} target="_blank">Preview</a></td>
                        <td className={handleStatus(lte.status)}>{lte.status}</td>
                        <td>
                            {lte.status == "Approve" ? (    
                                 <div style={{display:"flex",justifyContent:"center"}}>
                                     <img src="ceklis.PNG" width="30px" height="30px"></img>
                                 </div>
                                ):lte.status == "Cancel" ? (
                                <div style={{display:"flex",justifyContent:"center"}}>
                                    <img src="cancel.PNG" width="30px" height="30px"></img>
                                </div>):
                                <div className="flex-admin">
                                   <div className="button-action-cancel" onClick={()=>handleCancel(lte.id)}><p className="status-button">cancel</p></div>
                                   <div className="button-action-approve" onClick={()=>handleApprove(lte.id)}><p className="status-button">approve</p></div>
                                </div>
                            }         
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>     
       </>
   )
}

export default Admin