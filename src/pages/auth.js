import React,{useContext, useEffect, useState} from "react";
import "../styles/auth.css"
import { Button,Modal,Alert } from 'react-bootstrap';
import { useHistory } from "react-router-dom"
import{API} from "../config/api"
import Context, { CartContext } from '../cartContext';

function Auth() {
    const {isLogin, setLogins} = useContext(CartContext);
    const [show, setShow] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const history = useHistory();

    const handleShow = () => setShow(!show);
    const handleShowRegister = () => setShowRegister(!showRegister);

    const[register,setRegister]= useState({
        email:"",
        password:"",
        fullname:"",
        gender:"",
        phone:"",
        address:"",
       })
    const[login, setLogin] = useState({
        emailLogin:"",
        passwordLogin:""
    })   
    const handleChange = (e) => {
        setRegister({...register,[e.target.name]:e.target.value})
    }
    const handleChangeLogin = (e) => {
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const [alerts, setAlerts] = useState(false)
    const [alert, setAlert] = useState(false)
    const push = async() => {
        try{
            const config ={
                headers:{
                    "Content-Type" : "application/json"
                }
            }
            if((register.email == "") && (register.password == "") && (register.phone == "") && (register.address == "") && (register.fullname=="") && (register.gender=="")){
                setAlerts(false)
                handleShowRegister()
            }
            else if((register.email == "") || (register.password == "") || (register.phone == "") || (register.address == "") || (register.fullname=="") || (register.gender=="")){
                setAlerts(true)
            }
            else{
                const body = JSON.stringify(register)
                const response = await API.post("/register",body,config)
                setRegister({
                    email:"",
                    password:"",
                    fullname:"",
                    gender:"",
                    phone:"",
                    address:"",
                   })
                handleShowRegister() 
                
            }
        }catch(error){
            console.log(error)
            setAlerts(true)
            }
        
        }
        const logins = async () =>{
            try{
                const config ={
                    headers:{
                        "Content-Type" : "application/json"
                    }
                }
                if((login.emailLogin == "") && (login.passwordLogin == "")){
                    setAlert(false)
                    handleShow()
                }
                else{
                    const body = JSON.stringify(login)
                    console.log(body)
                    const response = await API.post("/login",body,config)
                    console.log(response.data.data)
                    if(response.data.status == "success"){
                        if(response.data.data.status == "users"){
                            localStorage.setItem("email",login.emailLogin)
                            localStorage.setItem("token",response.data.data.token)
                            localStorage.setItem("id",response.data.data.id)
                            setLogins({islog:true,email:localStorage.getItem('email'),isadmin:false,isAuth:localStorage.getItem('token') ? true : false});
                            console.log(isLogin.isAuth)
                            history.push("/")
                        }
                        else if(response.data.data.status == "admin"){
                            localStorage.setItem("email",login.emailLogin)
                            localStorage.setItem("token",response.data.data.token)
                            localStorage.setItem("isAdmin",response.data.data.status)
                            setLogins({islog:true,email:localStorage.getItem('email'),isadmin:true,isAuth:localStorage.getItem('token') ? true : false});
                            history.push("/admin")
                           
                        }
                    
                    }
                }
            }catch(error){
                setAlert(true)
                console.log(error)
                }
            
          }        

    return(
        <div style={{backgroundColor:"#161616",padding:"43.5px 20px"}}>
          <div style={{textAlign:"left",marginLeft:"60px"}}><img src="literatur.PNG" width="150px" height="70px"></img></div>  
          <div className="flex-home">
             <div>
                 <div className="subject-home"> Source of intelegence </div>
                 <p className="fill-subject-home">lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet lorem </p>
                 <div className="flex-button">
                     <div className="sign-ins" onClick={()=>handleShow()}><p className="fill-sign" >Sign In</p></div>
                     <div className="registers" onClick={()=>handleShowRegister()}><p className="fill-register">Register</p></div>
                 </div>
             </div>
             <div><img src="hero.png"></img></div>
          </div>
          
            <Modal show={show}>   
                <div style={{padding:"50px",backgroundColor:"#161616"}}>
                    <p className="modal-signIn">Sign In</p>
                    <Alert variant="danger" show={alert}>
                            Your account is invalid !!
                    </Alert>
                    <input className="input-modal-signIn" placeholder="Email" name="emailLogin" value={login.emailLogin} onChange={(e)=>handleChangeLogin(e)}></input>
                    <input className="input-modal-signIn" type="password" placeholder="Password" name="passwordLogin" value={login.passwordLogin} onChange={(e)=>handleChangeLogin(e)}></input>
                    <div className="button-modal-signIn" onClick={()=>logins()}><p className="fill-modal-signIn">Sign In</p></div>
                    <p className="dont">Don't have an account ? click <span className="here">Here</span></p>
                </div>
            </Modal>

            <Modal show={showRegister}>   
                <div style={{padding:"50px",backgroundColor:"#161616"}}>
                    <p className="modal-signIn">Register</p>
                    <div className="alert">
                        <Alert variant="danger" show={alerts}>
                                Your registration must be complete !!
                        </Alert>
                    </div>    
                    <input className="input-modal-signIn" placeholder="Email" name="email" value={register.email} onChange={(e)=>handleChange(e)}></input>
                    <input className="input-modal-signIn" placeholder="Password" name="password" value={register.password} onChange={(e)=>handleChange(e)}></input>
                    <input className="input-modal-signIn" placeholder="Fullname" name="fullname" value={register.fullname} onChange={(e)=>handleChange(e)}></input>
                    <select className="input-modal-signIn" placeholder="Gender" name="gender" onChange={(e)=>handleChange(e)}>
                        <option value="male" style={{color:"white",backgroundColor:"#161616",fontWeight:"900"}}>Male</option>
                        <option value="female" style={{color:"white",backgroundColor:"#161616",fontWeight:"900"}}>Female</option>
                    </select>
                    <input className="input-modal-signIn" placeholder="Phone" name="phone" value={register.phone} onChange={(e)=>handleChange(e)}></input>
                    <input className="input-modal-signIn" placeholder="Address" name="address" value={register.address} onChange={(e)=>handleChange(e)}></input>
                    <div className="button-modal-signIn" onClick={()=>push()}><p className="fill-modal-signIn">Register</p></div>
                    <p className="dont">Already have an account ? click <span className="here">Here</span></p>
                </div>
            </Modal>
    
         
        </div>
    )
}
export default Auth;

export const isAuth = () => {
    if (localStorage.getItem('token')) {
    return true;
    }
    else{
    return false;
    }
}
