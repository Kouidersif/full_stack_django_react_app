import { useState } from "react"
import useAxios from "../../../../api/useAxios"
import useAuth from "../../../../context/useAuth"






const useUpdateApp = () => {
    const [ dataUpdated, setDataUpdated ] = useState({})
    const { setSuccessMsgApi, setErrorMsgApi } = useAuth()
    const api = useAxios() 
    const updateApplication = async (appID, request, response_message) =>{
        try{   
            const response = await api.put(`update/app/${appID}/`, {
                request:request,
                response_message : response_message
            })
            setDataUpdated(response.data)
            setSuccessMsgApi("Application has been updated!")

        }catch(err){
            setErrorMsgApi(err.message)
        }
    }
    return {dataUpdated, updateApplication}
}

export default useUpdateApp;