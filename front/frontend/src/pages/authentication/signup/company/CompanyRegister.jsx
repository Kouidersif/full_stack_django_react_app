import React, { useState } from 'react';
import bgImg from "../../../../assets/wspace.jpg"
import { Link } from 'react-router-dom';
import useRegister from '../useRegister';


const CompanyRegister = () => {
    const { registerUser } = useRegister()
    const [ user, setUser ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const path = "company" 
    const handleSubmit = (e) =>{
        e.preventDefault()
        registerUser(path, firstName, lastName, user, pwd)
        setUser("")
        setPwd("")
        setFirstName("")
        setLastName("")
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
                        Create your Company account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First name</label>
                            <input type="text" name="firstName" id="firstName" autoComplete='firstName' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Mark" required value={firstName} 
                            onChange={(e)=> setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="LastName" className="block mb-2 text-sm font-medium text-gray-900">Last name</label>
                            <input type="text" name="LastName" id="LastName" autoComplete='LastName' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Smith" required value={lastName} 
                            onChange={(e)=> setLastName(e.target.value)} />
                        </div>
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
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign up</button>
                        <p className="text-sm font-light text-gray-500">
                            Do you have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default CompanyRegister