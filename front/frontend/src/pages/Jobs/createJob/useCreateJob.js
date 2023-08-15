import { useEffect, useState } from "react";
import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";



const useCreateJob = () => {
    const api = useAxios()
    const [ responseData, setResponseData ] = useState({})
    const [ categories, setCategories ] = useState([])
    const { setErrorMsgApi, setSuccessMsgApi } = useAuth()

    const fetchCategories = async ()=>{
        try{
            const response = await api.get("category/")
            setCategories(response?.data?.results)
        }catch(err){
            console.log(err)
        }
    }

    const createNewJob = async (formData) =>{
        try{
            const response = await api.post("post-job/", formData)
            setResponseData(response.data)
            setSuccessMsgApi("job published")
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

    useEffect(()=>{
        fetchCategories()
    },[])

    return { createNewJob, categories }
}

export default useCreateJob