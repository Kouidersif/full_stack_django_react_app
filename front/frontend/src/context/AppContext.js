import jwtDecode from "jwt-decode";
import { useState, createContext, useEffect } from "react";


const AppContext = createContext({})


let accessToken = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem('access_token')) : null;
let refreshToken = localStorage.getItem("refresh_token") ? JSON.parse(localStorage.getItem('refresh_token')) : null;
let user;
if (accessToken){
    user = jwtDecode(accessToken);
}

export const AppContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState({
        access: accessToken,
        refresh: refreshToken,
        isCompany: user?.is_company === "True", 
        isApplicant: user?.is_applicant === "True", 
    })

    
    const [errorMsgApi, setErrorMsgApi] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMsgApi, setSuccessMsgApi] = useState('')

    return (
        <AppContext.Provider value={{
            userToken, setUserToken,
            errorMsgApi, setErrorMsgApi,
            successMsgApi, setSuccessMsgApi,
            loading, setLoading
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;