import { useEffect, useState } from "react"
import useAxios from "../../../../api/useAxios";
import useAuth from "../../../../context/useAuth";
import jwtDecode from "jwt-decode";



const useFetchProfile = () => {
    const [ profileData, setProfileData ] = useState({})
    const { userToken } = useAuth()
    const api = useAxios()
    const { setErrorMsgApi, setSuccessMsgApi } = useAuth()

    const fetchUserProfile = async (url) =>{
        try{
            const response = await api.get(url)
            setProfileData(response.data)
        }catch(err){
            if (userToken?.access){
                setErrorMsgApi("something went wrong...!")
            }
            
        }
    }

    const updateProfileData = async (formData) =>{
        
        try{
            const response = await api.put("applicants/profile/", formData, 
            {headers: {
                "Content-Type": "multipart/form-data",
            }})
            
            setProfileData(response.data)
            setSuccessMsgApi("Success! Your account has been updated!")
        }catch(err){
            setErrorMsgApi("something went wrong...!")
        }
    }



    useEffect(()=>{
        let url;
        if (userToken?.isCompany ? url = "company/profile/" : userToken?.isApplicant ? url = "applicants/profile/" : undefined)
        fetchUserProfile(url)
    }, [userToken.access])


    return { profileData, fetchUserProfile, updateProfileData }
}

export default useFetchProfile