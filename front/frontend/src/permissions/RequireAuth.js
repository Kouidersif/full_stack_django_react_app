import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";



const RequireAuth = () => {
    const { userToken } = useAuth()
    const location = useLocation()
    return (
        userToken?.access ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace  /> 
    )
}

export const CompaniesAccess = () =>{
    const { userToken } = useAuth()
    return (
        userToken?.isCompany ? <Outlet /> :  <Navigate to="/" />
    )
}

export const ApplicantsAccess = () =>{
    const { userToken } = useAuth()
    return (
        userToken?.isApplicant ? <Outlet /> :  <Navigate to="/" />
    )
}

export default RequireAuth