import useAxios from "../../../api/useAxios";
import useAuth from "../../../context/useAuth";

const useLogout = () => {
    const { userToken, setErrorMsgApi, setSuccessMsgApi } = useAuth()
    const api = useAxios()
    const blackListToken = async () =>{
        try{
            const resp = await api.post("/token/blacklist/", {
                refresh:userToken?.refresh
            })
            console.log("respp", resp)
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            window.location.replace('/');
            setSuccessMsgApi("Logged out!")
        }catch(err){
            setErrorMsgApi("Something went wrong...")
            console.log(err)
        }
    }

    return { blackListToken }

}

export default useLogout