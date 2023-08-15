import { useState } from "react";
import bgImg from "../../../assets/wspace.jpg";
import useLoginUser from "./useLoginUser";
import { Link } from "react-router-dom";


const LoginForm = () => {
    const { loginUser } = useLoginUser();
    const [ user, setUser ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault()
        loginUser(user, pwd)
        setUser('')
        setPwd('')
    }

    return (
        <section className="bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 relative">
            
        <Link to="/" className="w-[26%] mb-4 flex justify-center items-center">
            <h1 className="font-semibold text-2xl text-[#377dff]">Travaii</h1>

            </Link>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email" autoComplete='email' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@email.com" required value={user} 
                            onChange={(e)=> setUser(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" value={pwd} name="password" autoComplete='current-password' id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 
                            sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                            block w-full p-2.5" 
                            onChange={(e)=> setPwd(e.target.value)}
                            required />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                </div>
                            </div>
                            <a href="." className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link to="/" className="font-medium text-primary-600 hover:underline">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default LoginForm