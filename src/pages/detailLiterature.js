import React,{useContext, useEffect, useState} from "react";
import "../styles/profile.css"
import "../styles/detail.css"
import Navbar from "../component/navbar"
import {useParams,useHistory} from "react-router-dom";
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";
import { Button,Modal,Alert } from 'react-bootstrap';

function Detail() {
    const {isLogin, setLogins} = useContext(CartContext);
    const history = useHistory();
    const params = useParams()
    const[lite,setLite] =useState([])
    const[prof,setProf] =useState([])
    const[test,setTest] =useState(false)
    const[remove,setRemove] =useState(false)

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const [showCocok, setShowCocok] = useState(false);
    const handleShowCocok = () => setShowCocok(!showCocok);


    const getLiterature = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const literature = await API.get("/literature/"+params.id)
            const profile = await API.get("/users")
            setLite(literature.data.data)
            setProf(profile.data.data)
            
            const idUsr = localStorage.getItem("id");
            const literat = await API.get("/literatures")
            const getCollect = await API.get(`/collections`)

            literat.data.data.filter((lte)=>(lte.user.id==idUsr)&&(lte.id==params.id)).map((liter)=>{
                setTest(true)
            })

            getCollect.data.data.map((col)=>{
              if((col.literature.id == params.id)&&(col.user.id == idUsr)){
                 setRemove(true)
              }
        })
             
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getLiterature()
    },[])
    
    let idUser 
    prof.filter((user)=>user.email == isLogin.email).map((pro)=>{
        idUser = pro.id
    })

    const addCollection = async() => {
        const token = localStorage.getItem("token");
        setAuthToken(token)
        const response = await API.post(`/collection`,{literatureId:params.id,userId:idUser})
        history.push("/collections")  
    }
    const deleteCollection = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const idUsr = localStorage.getItem("id");
            const getCollect = await API.get(`/collections`)
            let idCollection
            getCollect.data.data.map((col)=>{
                if((col.literature.id == params.id)&&(col.user.id == idUsr)){
                      idCollection = col.id
                }
            })
            const deleteLiterat = await API.delete("/collection/"+idCollection)  
            history.push("/collections")
                 
        } catch (error) {
            console.log(error)
        }
    }


    const Downloader = async (fileURL, filename) => {
        try {
            await fetch(fileURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            })
                .then(response => response.blob())
                .then(blob => {
                    // Create blob link to download
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${filename}.pdf`);
    
                    // Append to html link element page
                    document.body.appendChild(link);
    
                    // Start download
                    link.click();
    
                    // Clean up and remove the link
                    link.parentNode.removeChild(link);
                });
        } catch (error) {
            console.log(error);
        }
    };    

   return(
       <>
         <Navbar/>
         <div className="center-profile">
            <div className="flex-detail">
                {/* <div className="photo-pdf"><img src="/frontPDF.PNG" height="500px"></img></div> */}
                <div className="photo-pdf"><iframe src={lite.attache} style={{width:"300px",height:"445px"}} title="Iframe Example"></iframe></div>
                <div className="fill-detail">
                    <p className="title-detail-literature">{lite.title}</p>
                    <p className="name-detail-literature">{lite.author}</p>
                    <p className="fills-detail-literature">Publication Date</p>
                    <p className="name-detail-literature-two">{lite.publication_date}</p>
                    <p className="fills-detail-literature">Pages</p>
                    <p className="name-detail-literature-two">{lite.pages}</p>
                    <p className="isbn">ISBN</p>
                    <p className="name-detail-literature-two">{lite.isbnn}</p>
                    <div className="button-download-detail" onClick={()=>Downloader(lite.attache,`${lite.title}`)}><p className="fill-download">Download</p></div>
                </div>       
                {((test == false)&&(remove == false)) ? (    
                    <div className="add-collec">
                       <div className="button-addCollection-detail" onClick={()=>addCollection()}><p className="fill-download">Add My Collections</p></div>
                    </div>
                    ):((test == false)&&(remove == true)) ? ( 
                    <div className="add-collec">
                        <div className="button-addCollection-detail" onClick={()=>deleteCollection()}><p className="fill-download">Delete Collections</p></div>
                     </div>
                    ):
                    null
                }         
            </div>
         </div>
       </>
   )
}

export default Detail