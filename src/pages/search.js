import React,{useContext, useEffect, useState} from "react";
import "../styles/search.css"
import Navbar from "../component/navbar"
import { useHistory } from "react-router-dom"
import{API} from "../config/api"
import Context, { CartContext } from '../cartContext';

function Search() {
  const {isLogin, setLogins} = useContext(CartContext);
  const history = useHistory();
  const[search, setSearch] = useState({
    input:""
})  
const handleChange = (e) => {
  setSearch({...search,[e.target.name]:e.target.value})
}
const push = () => {
  setLogins({islog:true,email:localStorage.getItem('email'),isadmin:false,isAuth:localStorage.getItem('token') ? true : false, searching:search.input});
  history.push("/search")
}
   return(
       <>
         <Navbar/>
         <div className="center-search">
             <img src="literatur.PNG"></img>
             <div className="flex-search">
                <input className="input-search" placeholder="Search for literature" name="input" value={search.input} onChange={(e)=>handleChange(e)}></input>
                <div className="square-button" onClick={()=>push()}><img src="search.PNG" width="30px" height="30px"></img></div>
             </div>
         </div>
       </>
   )
}

export default Search