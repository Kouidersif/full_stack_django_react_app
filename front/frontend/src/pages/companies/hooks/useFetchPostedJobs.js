import { useEffect, useState } from "react";
import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";





const useFetchPostedJobs = () => {
    const [ postedJobs, setPostedJobs ] = useState([])
    const [ objTriggered, setObjTriggered ] = useState(false)
    const api = useAxios()
    const { setErrorMsgApi, setSuccessMsgApi } = useAuth()

    const fetchJobs = async () =>{
        try{
            const response = await api.get("company/posted-jobs/")
            setPostedJobs(response?.data?.results)
        }catch(err){
            setErrorMsgApi("something went wrong")
        }
    }

    const deleteJob = async (jobID) =>{
        try{
            const response = await api.delete(`${jobID}/`)
            setObjTriggered(!objTriggered)
            setSuccessMsgApi("Job Deleted Succesfully")
        }catch(err){
            setErrorMsgApi("something went wrong")
        }
    }

    const updateJobByID = async (jobID, formData) =>{
        try{

            const response = await api.put(`${jobID}/`, formData)
            setSuccessMsgApi("Job updated Succesfully")
            setObjTriggered(!objTriggered)
        }catch(err){
            if (err.response.status === 400){
                if (err.response.data.validator){
                    setErrorMsgApi(err.response.data.validator)
                }
            }else{
                setErrorMsgApi("Can not complete your request, please try again later!")
            }
        }
    }


    

    return { postedJobs, deleteJob, updateJobByID, fetchJobs }
}

export default useFetchPostedJobs