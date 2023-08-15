import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";




const useRegister = () => {
    const { setLoading, setSuccessMsgApi, setErrorMsgApi } = useAuth()
    const api = useAxios()
    const registerUser = async (path, firstName, lastName, email, passWord) =>{
        try{
            setLoading(true)
            const resp = await api.post(`${path}/sign-up/`, {
                first_name:firstName,
                last_name:lastName,
                email:email, 
                password:passWord
            })
            // Auto login user after complete registration
            localStorage.setItem("access_token", JSON.stringify(resp?.data?.access))
            localStorage.setItem("refresh_token", JSON.stringify(resp?.data?.refresh))
            window.location.replace("/")
            setSuccessMsgApi("You have been logged in!")
        }catch(err){
            setErrorMsgApi("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    return { registerUser }
}

export default useRegister