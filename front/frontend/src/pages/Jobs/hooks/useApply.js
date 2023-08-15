import { useState } from 'react'
import useAxios from '../../../api/useAxios'
import useAuth from '../../../context/useAuth'

const useApply = () => {
    const api = useAxios()
    const [ responseData, setResponseData ] = useState({})
    const { setSuccessMsgApi } = useAuth()

    const applyForJob = async (job_id, coverLetter) =>{
        try{
            const response = await api.post(`apply/${job_id}/`, {
                job:job_id,
                cover_letter:coverLetter
                
            })
            setResponseData(response.data)
            setSuccessMsgApi("Succesfully Applied for the job")
        }catch(err){
            console.log(err)
        }
    }
    

    return { applyForJob, responseData }
}

export default useApply