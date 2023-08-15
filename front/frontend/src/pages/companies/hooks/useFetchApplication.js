import { useEffect, useState } from "react";
import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";

const useFetchApplication = () => {

    const api = useAxios()
    const { setErrorMsgApi } = useAuth()
    const [ applications, setApplications ] = useState([])

    const fetchApps = async () =>{
        try{
            const response = await api.get("/company/received-apps/")
            setApplications(response?.data?.results)
        }catch(err){
            setErrorMsgApi(err.message)
        }
    }

    useEffect(()=>{
        fetchApps()
    }, [])

    return { applications, fetchApps } ;
}

export default useFetchApplication