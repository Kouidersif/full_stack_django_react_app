import axios from "axios";
import useAuth from "../../../context/useAuth";


const useLoginUser =  () => {
    const { setErrorMsgApi, setSuccessMsgApi, setUserToken } = useAuth()

    const loginUser = async (email, pwd) =>{
        try{
            const resp = await axios.post("http://127.0.0.1:8000/api/token/", {
                email:email,
                password:pwd
            })
            console.log(resp)
            const accessToken = localStorage.setItem("access_token", JSON.stringify(resp?.data?.access))
            const refreshToken = localStorage.setItem("refresh_token", JSON.stringify(resp?.data?.refresh))
            setUserToken({
                access:accessToken,
                refresh:refreshToken
            })
            window.location.replace('/');
            setSuccessMsgApi("Successfully Logged in")
        }catch(err){
            setErrorMsgApi(err.message)
        }
    }

    return { loginUser }

}

export default useLoginUser;