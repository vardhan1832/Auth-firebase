import React, {useState} from "react";

export const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

const AuthContextProvider = (props) =>{
    const initialtoken = localStorage.getItem('token')
    const [token,settoken] = useState(initialtoken)
    const userisLoggedIn = !!token
    const loginhandler = (token)=>{
        localStorage.setItem('token',JSON.stringify(token))
        setTimeout(() => {
            alert('user Logged Out')
            settoken(null)
        }, 60*1000);
        settoken(token)
    }
    const logouthandler = ()=>{
        localStorage.removeItem('token')
        settoken(null)
    }
    const contextvalue = {
        token:token,
        isLoggedIn:userisLoggedIn,
        login:loginhandler,
        logout:logouthandler
    }
    return (
        <AuthContext.Provider value={contextvalue}>{props.children}</AuthContext.Provider>
    )
}

export default AuthContextProvider