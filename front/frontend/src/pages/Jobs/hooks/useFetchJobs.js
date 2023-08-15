import { useEffect, useState } from "react";
import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";



const useFetchJobs = (query, start=null, end=null, page) => {
    const api = useAxios()
    const { setErrorMsgApi, setLoading } = useAuth()
    const [ hasMore, setHasMore ] = useState(true)
    const pageLimit = 10
    const [ jobs, setJobs ] = useState([])
    const fetchJobs = async () =>{
        try{
            setLoading(true)
            const response = await api.get(`?page=${page}&search=${query}&timestamp_after=${start}&timestamp_before=${end}`)
            const data = [ ...jobs ].concat(response?.data?.results)
            if ( jobs?.length + pageLimit >= response?.data?.count ){
                setHasMore(false)
            }
            setJobs(data)
        }catch(err){
            console.log(err)
            setErrorMsgApi("Error happened while getting data...")
        }finally{
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        setTimeout(()=> fetchJobs(), 1000)
        // fetchJobs()
    }, [query, page])

    return { fetchJobs, jobs, hasMore }
}

export default useFetchJobs