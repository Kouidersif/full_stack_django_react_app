import { useEffect, useState } from "react";
import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";






const useFetchData = () => {
    const [ companyData, setCompanyData ] = useState({})
    const api = useAxios()
    const { setErrorMsgApi, setSuccessMsgApi } = useAuth()


    const fetchCompany = async () =>{
        try{
            const response = await api.get("company/profile/")
            setCompanyData(response.data)
        }catch(err){
            setErrorMsgApi(err.message)
        }
    }
    const updateCompanyData = async (formData) =>{
        try{
            const response = await api.put("company/profile/", formData)
            setCompanyData(response.data)
            setSuccessMsgApi("Data has been updated!")
        }catch(err){
            setErrorMsgApi(err.message)
        }
    }

    useEffect(()=>{
        fetchCompany()
    }, [])

    return { companyData, fetchCompany, updateCompanyData };
}

export default useFetchData;