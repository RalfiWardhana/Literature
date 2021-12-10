import React,{useContext, useEffect, useState} from "react";
import "../styles/fillSearch.css"
import "../styles/profile.css"
import Navbar from "../component/navbar"
import { useHistory } from "react-router-dom"
import{API,setAuthToken} from "../config/api"
import Context, { CartContext } from '../cartContext';
import {BrowserRouter,Route,Switch,Link} from "react-router-dom";

function FillSearch() {
    const {isLogin, setLogins} = useContext(CartContext);
    console.log(isLogin)
    const[lite,setLite] =useState([])
    const[year,setYear] = useState(["Year"])
    const[resultSearch,setResultSearch]=useState(false)
    const[selection, setSelection] = useState({
       tahun:"",
       coba:false
    })
    const handleChanges = (e) => { 
       if(e.target.value=="Year"){
        setSelection({...selection,[e.target.name]:e.target.value,coba:false}) 
       }
       else{   
       setSelection({...selection,[e.target.name]:e.target.value,coba:true}) 
       }
    }
       
    const years = []
    const getLiteratures = async() => {
        try {
            const token = localStorage.getItem("token");
            setAuthToken(token)
            const literature = await API.get("/literatures")
            console.log(literature.data.data)

            literature.data.data.map((liter)=>{
              let arrayYear = liter.publication_date.split("-")  
              if(years.length == 0){
                  years.push(arrayYear[arrayYear.length-1])
                  setYear(year => [...year, arrayYear[arrayYear.length-1]])
              }
              else{
                  if(years.includes(arrayYear[arrayYear.length-1])==false){
                    years.push(arrayYear[arrayYear.length-1])    
                    setYear(year => [...year, arrayYear[arrayYear.length-1]])
                  }
              }
            })
            setLite(literature.data.data)  
        
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getLiteratures()
    },[])

    const[search, setSearch] = useState({
        input:""
    })  
    const handleChange = (e) => {
        // if(e.target.value==""){
        //     setResultSearch(false)
        // }
      setSearch({...search,[e.target.name]:e.target.value})
    }
    const searchLive = () => {
        setResultSearch(true)
    }
    
if((resultSearch==false)&&(selection.coba==false)){
   return(
       <>
         <Navbar/>
         <div className="center-fillSearch">
            <div className="flex-fillSearch">
                <input className="input-fillSearch" placeholder="Search for literature"  name="input" value={search.input} onChange={(e)=>handleChange(e)}></input>
                <div className="square-fillSearch-button" onClick={()=>searchLive()}><img src="search.PNG" width="40px" height="40px"></img></div>
             </div>
             <div className="flex-fillSearch">
                <div className="since-fillSearch">
                    <p className="anytime-fillSearch">Anytime</p>
                    <select className="select-anytime" name="tahun" onChange={(e)=>handleChanges(e)}>
                        {year.map((yar)=> (
                            <option value={yar} style={{color:"white",backgroundColor:"#161616",fontWeight:"900"}}>{yar}</option>
                        ))}
                    </select>
                </div>
                <div className="fill-search">
                {lite.filter((cari)=>(cari.title.toLowerCase().includes(isLogin.searching.toLowerCase()) || cari.user.fullname.toLowerCase().includes(isLogin.searching.toLowerCase()) || cari.publication_date.includes(isLogin.searching))&&(cari.status=="Approve")).map((lte) =>(
                    <div className="literature-fill">
                        {/* <img src="frontPDF.PNG"></img> */}
                        <iframe src={lte.attache} style={{width:"200px",height:"258px"}} title="Iframe Example"></iframe>
                        <p className="header-literature"><Link to={`/detail/${lte.id}`} className="header-literature">{lte.title}</Link></p>
                        <div className="literature-flex-between">
                            <p className="name-literature">{lte.author}</p>
                            <p className="name-literature">{lte.publication_date}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
         </div>
       </>
   )
 }
 else if((resultSearch==true) && (selection.coba==false)){
    return(
        <>
          <Navbar/>
          <div className="center-fillSearch">
             <div className="flex-fillSearch">
                 <input className="input-fillSearch" placeholder="Search for literature"  name="input" value={search.input} onChange={(e)=>handleChange(e)}></input>
                 <div className="square-fillSearch-button" onClick={()=>searchLive()}><img src="search.PNG" width="40px" height="40px"></img></div>
              </div>
              <div className="flex-fillSearch">
                 <div className="since-fillSearch">
                     <p className="anytime-fillSearch">Anytime</p>
                     <select className="select-anytime" name="tahun" onChange={(e)=>handleChanges(e)}>
                        {year.map((yar)=> (
                            <option value={yar} style={{color:"white",backgroundColor:"#161616",fontWeight:"900"}}>{yar}</option>
                        ))}
                    </select>
                 </div>
                 <div className="fill-search">
                 {lite.filter((cari)=>(cari.user.fullname.toLowerCase().includes(search.input.toLowerCase()) || cari.title.toLowerCase().includes(search.input.toLowerCase()) || cari.publication_date.includes(search.input))&&(cari.status=="Approve")).map((lte) =>(
                     <div className="literature-fill">
                         {/* <img src="frontPDF.PNG"></img> */}
                         <iframe src={lte.attache} style={{width:"200px",height:"250px"}} title="Iframe Example"></iframe>
                         <p className="header-literature"><Link to={`/detail/${lte.id}`} className="header-literature">{lte.title}</Link></p>
                         <div className="literature-flex-between">
                             <p className="name-literature">{lte.author}</p>
                             <p className="name-literature">{lte.publication_date}</p>
                         </div>
                     </div>
                 ))}
                 </div>
             </div>
          </div>
        </>
    )
 }
 else if((resultSearch==true) && (selection.coba==true)){
     console.log(3333)
    return(
        <>
          <Navbar/>
          <div className="center-fillSearch">
             <div className="flex-fillSearch">
                 <input className="input-fillSearch" placeholder="Search for literature"  name="input" value={search.input} onChange={(e)=>handleChange(e)}></input>
                 <div className="square-fillSearch-button" onClick={()=>searchLive()}><img src="search.PNG" width="40px" height="40px"></img></div>
              </div>
              <div className="flex-fillSearch">
                 <div className="since-fillSearch">
                     <p className="anytime-fillSearch">Anytime</p>
                     <select className="select-anytime" name="tahun" onChange={(e)=>handleChanges(e)}>
                        {year.map((yar)=> (
                            <option value={yar} style={{color:"white",backgroundColor:"#161616",fontWeight:"900"}}>{yar}</option>
                        ))}
                    </select>
                 </div>
                 <div className="fill-search">
                 {lite.filter((cari)=>((cari.title.toLowerCase().includes(search.input.toLowerCase())) && (cari.publication_date.includes(selection.tahun))) && (cari.status=="Approve")).map((lte) =>(
                     <div className="literature-fill">
                         {/* <img src="frontPDF.PNG"></img> */}
                         <iframe src={lte.attache} style={{width:"200px",height:"250px"}} title="Iframe Example"></iframe>
                         <p className="header-literature"><Link to={`/detail/${lte.id}`} className="header-literature">{lte.title}</Link></p>
                         <div className="literature-flex-between">
                             <p className="name-literature">{lte.author}</p>
                             <p className="name-literature">{lte.publication_date}</p>
                         </div>
                     </div>
                 ))}
                 </div>
             </div>
          </div>
        </>
    )
 }
 else if((selection.coba==true) || (resultSearch==true)){
    console.log(9999)
    return(
        <>
          <Navbar/>
          <div className="center-fillSearch">
             <div className="flex-fillSearch">
                 <input className="input-fillSearch" placeholder="Search for literature"  name="input" value={search.input} onChange={(e)=>handleChange(e)}></input>
                 <div className="square-fillSearch-button" onClick={()=>searchLive()}><img src="search.PNG" width="40px" height="40px"></img></div>
              </div>
              <div className="flex-fillSearch">
                 <div className="since-fillSearch">
                     <p className="anytime-fillSearch">Anytime</p>
                     <select className="select-anytime" name="tahun" onChange={(e)=>handleChanges(e)}>
                        {year.map((yar)=> (
                            <option value={yar} style={{color:"white",backgroundColor:"#161616",fontWeight:"900"}}>{yar}</option>
                        ))}
                    </select>
                 </div>
                 <div className="fill-search">
                 {lite.filter((cari)=>(cari.publication_date.includes(selection.tahun)) && (cari.status=="Approve")).map((lte) =>(
                     <div className="literature-fill">
                         {/* <img src="frontPDF.PNG"></img> */}
                         <iframe src={lte.attache} style={{width:"200px",height:"250px"}} title="Iframe Example"></iframe>
                         <p className="header-literature"><Link to={`/detail/${lte.id}`} className="header-literature">{lte.title}</Link></p>
                         <div className="literature-flex-between">
                             <p className="name-literature">{lte.author}</p>
                             <p className="name-literature">{lte.publication_date}</p>
                         </div>
                     </div>
                 ))}
                 </div>
             </div>
          </div>
        </>
    )
 }
}

export default FillSearch