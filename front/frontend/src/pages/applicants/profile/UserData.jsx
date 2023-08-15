import React, { useEffect, useState } from 'react'
import useFetchProfile from './hooks/useFetchProfile'
import useFetchUser from './hooks/useFetchUser'

const UserData = () => {
    const { getorUpdateUserData, userData } = useFetchUser()
    const [ userEmail, setUserEmail ] = useState("")
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()

        formData.append("email", userEmail)
        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        getorUpdateUserData(formData)

    }

    useEffect(()=>{
        if ( userData ){
            setUserEmail(userData.email || "")
            setFirstName(userData.first_name || "")
            setLastName(userData.last_name || "")
        }
    }, [userData])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} name="githubProfile" id="githubProfile" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="githubProfile" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} name="githubProfile" id="githubProfile" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="githubProfile" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} name="personalSite" id="personalSite" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="personalSite" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>


        </div>
    )
}

export default UserData