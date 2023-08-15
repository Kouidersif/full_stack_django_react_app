import axios from "axios";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import useAuth from "../context/useAuth"

const baseURL = "http://127.0.0.1:8000/api/"


export const axiosInstance = axios.create({
    baseURL,
    "Content-Type": "application/json",
})




const useAxios =  () => {
    const { setErrorMsgApi } = useAuth()
    const accessToken = localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('access_token')) : null;
    const refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : null;
    if ( accessToken ){
        axiosInstance.interceptors.request.use( async (req)=>{
        req.headers.Authorization = `JWT ${accessToken}`;
        const user = jwtDecode(accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req;
        try{
            const response = await axios.post(`${baseURL}token/refresh/`, { refresh: refreshToken });
            const newAccessToken = response?.data?.access;
            const newRefreshToken = response?.data?.refresh;
            localStorage.clear();
            localStorage.setItem('access_token', JSON.stringify(newAccessToken));
            localStorage.setItem('refresh_token', JSON.stringify(newRefreshToken));
            req.headers.Authorization = `JWT ${newAccessToken}`;
        }catch(err){
            setErrorMsgApi("Authentication Error");
            localStorage.clear();
            window.location.replace('/login');
        }
    
        });
    }
    
    return axiosInstance
}

export default useAxios
