import { createContext, useState } from "react";

export const CartContext = createContext();

const AuthContext = ({children})=>{
    const[isLogin, setLogins]=useState({islog:true,email:localStorage.getItem('email'),isadmin:localStorage.getItem('isAdmin') ? true : false,isAuth:localStorage.getItem('token') ? true : false,searching:""})
    console.log(isLogin);
    return(
        <CartContext.Provider value={{isLogin,setLogins}}>
            {children}
        </CartContext.Provider>
    )
}
export default AuthContext;