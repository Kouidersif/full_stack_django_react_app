import { useEffect, useState } from "react"
import useAxios from "../../../../api/useAxios"
import jwtDecode from "jwt-decode";
import useAuth from "../../../../context/useAuth";


const useFetchUser = () => {
    const { setSuccessMsgApi } = useAuth()
    const api = useAxios()
    const [ userData, setUserData ] = useState({})
    const accessToken = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : null;
    let user;
    if (accessToken){
        user = jwtDecode(accessToken)
    }

    const getorUpdateUserData = async (formData) =>{
        let respo;
        try{
            if (formData){
                respo = await api.put(`applicants/account/${user.uuid}/`, formData)
                setUserData(respo.data)
                setSuccessMsgApi("Data updated succesfully!")
            }else{
                respo = await api.get(`applicants/account/${user.uuid}/`)
                setUserData(respo.data)
            }
            
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getorUpdateUserData()
    }, [])

    return { getorUpdateUserData, userData }
}

export default useFetchUser