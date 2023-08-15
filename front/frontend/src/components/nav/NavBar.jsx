import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import useLogout from "../../pages/authentication/logout/useLogout";
import { useState } from "react";
import useFetchProfile from "../../pages/applicants/profile/hooks/useFetchProfile";


const NavBar = () => {
    const { userToken } = useAuth()
    const { blackListToken } = useLogout()
    const [ showMenu, setShowMenu ] = useState(false)
    const { profileData } = useFetchProfile()

    const handleLogout = () =>{
        blackListToken()
    }
    return (
        <>
        <div onClick={()=> setShowMenu(!showMenu)} className={`${showMenu ? "fixed z-[49] w-full h-full bg-black/20" : "hidden"}`} />
        <header className="relative max-w-[1116px] h-[65px] mx-auto flex justify-between items-center">
            <div>
                <h1 className="font-semibold text-2xl text-[#377dff]">Travaii</h1>
            </div>
            <ul className="flex items-center gap-4 text-[#677788]">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">Blog</Link></li>
                {
                    
                    userToken?.access ?
                    <>
                    <li className={`${userToken?.isCompany ? "p-2 bg-[#377dff] text-white rounded-md hover:-translate-y-2" : "hidden"}`}><Link to="/post">Post Job</Link></li>
                    <li><button onClick={()=> setShowMenu(!showMenu)}><img className="w-10 h-10 rounded-full" src={profileData?.profile_pic ? profileData?.profile_pic : "https://locker.com.au/wp-content/uploads/2017/01/user-icon-png-person-user-profile-icon-20.png"} alt="Rounded avatar" /></button></li>
                    <div className={`${showMenu ? "absolute top-[3rem] right-0 z-[50]" : "hidden"}`}>
                        <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                            <ul className="py-2 text-sm text-gray-700 ">
                                
                                <Link onClick={()=> setShowMenu(!showMenu)} to={`${ userToken?.isApplicant ? "/applicant/profile/" : userToken?.isCompany ? "/company/info/" : "/" }`}><li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">Profile Data</li></Link>
                                <Link onClick={()=> setShowMenu(!showMenu)} to={`${ userToken?.isApplicant ? "/applicant/profile/" : userToken?.isCompany ? "/company/info/" : "/" }`}><li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">Settings</li></Link>
                                <Link onClick={()=> setShowMenu(!showMenu)} to={`${ userToken?.isApplicant ? "/applicant/profile/" : userToken?.isCompany ? "/company/info/" : "/" }`}><li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">{userToken?.isCompany ? "Posted Jobs" : "Applications"}</li></Link>
                                <li className="block cursor-pointer px-4 py-2 hover:bg-gray-100"  onClick={handleLogout}><button>Log out</button></li>
                                
                            </ul>

                        </div>
                    </div>
                    
                    </>
                    
                    :
                    <>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/applicant/sign-up">Sign Up</Link></li>
                    <li className="p-2 bg-[#377dff] text-white rounded-md hover:-translate-y-2"><Link to={`${ userToken?.access && userToken?.isCompany ? "post/" : "/company/sign-up/"  }`}>Post Job</Link></li>
                    </>
                }
            </ul>
        </header>
        </>
        
    )
}

export default NavBar;