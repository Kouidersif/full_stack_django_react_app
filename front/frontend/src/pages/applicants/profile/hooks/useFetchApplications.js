import { useEffect, useState } from "react"
import useAxios from "../../../../api/useAxios";

const useFetchApplications = () => {
    const [ userApplications, setUserApplications] = useState([])
    const api = useAxios()


    const fetchApps = async () =>{
        try{
            const resp = await api.get("applicants/view-applications/")
            setUserApplications(resp?.data?.results)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchApps()
    }, [])

    return { fetchApps, userApplications  }

}

export default useFetchApplications