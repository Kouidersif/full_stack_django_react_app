import React, { useEffect, useState } from 'react'
import useAxios from '../../api/useAxios'
import useAuth from '../../context/useAuth';

const useRetrieveJob = (job_id) => {
    const [ jobDetails, setJobDetails ] = useState({});
    const [ hasApplied, setHasApplied ] = useState(false);
    const { setLoading } = useAuth()
    const api = useAxios()

    const fetchJobData = async () =>{
        try{
            setLoading(true)
            const response = await api.get(`${job_id}/`)
            setJobDetails(response?.data?.jobs)
            setHasApplied(response?.data?.applied)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

    }



    return { jobDetails, fetchJobData, hasApplied }
}

export default useRetrieveJob