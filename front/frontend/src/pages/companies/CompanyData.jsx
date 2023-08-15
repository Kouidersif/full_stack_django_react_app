import React, { useEffect, useState } from 'react'
import useFetchData from './hooks/useFetchData'

const CompanyData = () => {
  const { companyData, updateCompanyData } = useFetchData()
  const [companyName, setCompanyName] = useState("")
  const [companyLogo, setCompanyLogo] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [aboutCompany, setAboutCompany] = useState("")
  const [numEmployees, setNumEmployees] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    if (companyLogo && companyLogo instanceof File) {
      // Append the logo only if it's selected and a valid File object
      formData.append('company_logo', companyLogo);
    }
    formData.append("about_company", aboutCompany);
    formData.append("company_name", companyName);
    formData.append("company_address", companyAddress);
    formData.append("num_employees", numEmployees);
    updateCompanyData(formData)
  }

  useEffect(() => {
    // Populate the form inputs with the retrieved user profile data
    if (companyData) {
      setCompanyName(companyData.company_name || "");
      setCompanyAddress(companyData.company_address || "");
      setAboutCompany(companyData.about_company || "");
      setNumEmployees(companyData.num_employees || "");
      setCompanyLogo(companyData.company_logo || "")
    }
  }, [companyData]);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='relative z-0 w-full mb-6 group flex items-center space-x-6'>
          <div className="shrink-0">
            <img className="h-16 w-16 object-cover rounded-full" src={companyLogo} alt="userProfile" />
          </div>
          <label className="block">
            <span className="sr-only">Choose your company Logo</span>
            <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"  accept="image/png, image/jpeg, image/webp"
              onChange={(e) => setCompanyLogo(e.target.files[0])} />
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} name="githubProfile" id="githubProfile" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="githubProfile" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name</label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} name="personalSite" id="personalSite" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label htmlFor="personalSite" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company address</label>
        </div>

        <div className="relative z-0 w-full mb-6 group">

          <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">About Company</label>
          <textarea id="message" onChange={(e) => setAboutCompany(e.target.value)} value={aboutCompany} rows="4" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Write your text here..."></textarea>

        </div>

        <div className="relative z-0 w-full mb-6 group">
          <select value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer'>
            <option value=""></option>
            <option value="1-10">1-10</option>
            <option value="11-20">11-20</option>
            <option value="21-49">21-49</option>
            <option value="50-99">50-99</option>
            <option value="100-249">100-249</option>
            <option value="250-499">250-499</option>
            <option value="500-999">500-999</option>
            <option value="1000 or more">1000 or more</option>
          </select>
          <label htmlFor="userPrivacy" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Emplyees</label>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      </form>


    </div>
  )
}

export default CompanyData