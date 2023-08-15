import { useEffect, useState } from 'react';
import useFetchProfile from './hooks/useFetchProfile';



const ProfileData = () => {
    const { profileData, updateProfileData } = useFetchProfile()
    const [githubField, setGithubField] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [portfolioLink, setPortfolioLink] = useState("")
    const [userResume, setUserResume] = useState("")
    const [resumeName, setResumeName] = useState("")
    const [profilePrivacy, setProfilePrivacy] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        if (profileImg && profileImg instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formData.append('profile_pic', profileImg);
        }
        if (userResume && userResume instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formData.append('resume', userResume);
        }
        formData.append("github", githubField);
        formData.append("personal_website", portfolioLink);
        formData.append("is_public", profilePrivacy);
        updateProfileData(formData)
    }



    useEffect(() => {
        // Populate the form inputs with the retrieved user profile data
        if (profileData) {
            setGithubField(profileData.github || "");
            setPortfolioLink(profileData.personal_website || "");
            // setUserResume(profileData.resume || null);
            setProfilePrivacy(profileData.is_public || "");
            setProfileImg(profileData.profile_pic || "")
        }
        if (profileData.resume) {
            // Extract the file name from the URL and show it to the user
            const resumeFileName = profileData.resume.split('/').pop();
            setResumeName(resumeFileName);
        }
    }, [profileData]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='relative z-0 w-full mb-6 group flex items-center space-x-6'>
                    <div className="shrink-0">
                        <img className="h-16 w-16 object-cover rounded-full" src={profileImg} alt="userProfile" />
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"  accept="image/png, image/jpeg, image/webp"
                        onChange={(e)=> setProfileImg(e.target.files[0])} />
                    </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} name="personalSite" id="personalSite" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="personalSite" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Personal Website</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" value={githubField} onChange={(e) => setGithubField(e.target.value)} name="githubProfile" id="githubProfile" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="githubProfile" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Github</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <a href={profileData.resume} rel='noreferrer' className='font-semibold text-blue-600' target='_blank'>{resumeName}</a>
                    <input type="file" name="userResume" defaultValue={profileData.resume} 
                    onChange={(e) => setUserResume(e.target.files[0])} id="userResume" 
                    accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf'
                    className="block py-2.5 border-b-2 px-0 w-full text-sm text-slate-500 file:mr-4 
                    file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                    file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 appearance-none focus:outline-none 
                    focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="userResume" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resume</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <select value={profilePrivacy} onChange={(e) => setProfilePrivacy(e.target.value)} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
                        {/* <option value={profilePrivacy}>{profilePrivacy}</option> */}
                        <option value="Anyone">Anyone</option>
                        <option value="Only you">Only you</option>
                    </select>
                    <label htmlFor="userPrivacy" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Privacy</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>


        </div>
    )
}

export default ProfileData;