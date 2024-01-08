import React, {useState} from "react";

export const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

const AuthContextProvider = (props) =>{
    const [token,settoken] = useState(null)
    const userisLoggedIn = !!token
    const loginhandler = (token)=>{
        settoken(token)
    }
    const logouthandler = ()=>{
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