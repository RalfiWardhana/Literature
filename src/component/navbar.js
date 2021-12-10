import React,{useContext, useEffect, useState} from "react";
import "./navbar.css"
import {BrowserRouter,Route,Link} from "react-router-dom";
import { useHistory } from "react-router-dom"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';

function Navbar() {
    const {isLogin, setLogins} = useContext(CartContext);
    const history = useHistory()
    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("id")
        setLogins({islog:false,email:localStorage.getItem('email'),isadmin:false,isAuth:localStorage.getItem('token') ? true : false});
        console.log("pppp")
        history.push("/auth")
    } 
   return(
       <div className="flex-navbar">
          <div className="center-navbar">
              <ul className="list-navbar">
                  <li className="fill-list-navbar"><Link to="/profile" className="non-decor">Profiles</Link></li>
                  <li className="fill-list-navbar"><Link to="/collections" className="non-decor">My Collection</Link></li>
                  <li className="fill-list-navbar"><Link to="/Add-Literature" className="non-decor">Add Literature</Link></li>
                  <li className="fill-list-navbar" onClick={()=>logout()} className="non-decor">Logout</li>
              </ul>
          </div>
          <div className="center-navbar-logo">
             <Link to="/"><img src="/literatur.PNG" width="120px" height="50px"></img></Link>    
          </div>
       </div>
   )
}

export default Navbar