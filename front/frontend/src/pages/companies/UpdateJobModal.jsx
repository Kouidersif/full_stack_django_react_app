import { useEffect, useState } from "react"
import useCreateJob from "../Jobs/createJob/useCreateJob"
import useFetchPostedJobs from "./hooks/useFetchPostedJobs"




const UpdateJobModal = ({ updateMode, setUpdateMode, job }) => {
    const { categories } = useCreateJob()
    const { updateJobByID } = useFetchPostedJobs()
    const [jobTitle, setJobTitle] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [jobWorkPlace, setJobWorkPlace] = useState("")
    const [jobCategory, setJobCategory] = useState("")
    const [jobSalaryRange, setJobSalaryRange] = useState(0)


    useEffect(() => {
        if (job){
            setJobTitle(job?.title || "")
            setJobDescription(job?.description || "")
            setJobWorkPlace(job?.work_place || "")
            setJobCategory(job?.category?.id || "")
            setJobSalaryRange(job?.salary_range || 0)
        }
    }, [job])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", jobTitle)
        formData.append("description", jobDescription)
        formData.append("work_place", jobWorkPlace)
        formData.append("category", jobCategory)
        formData.append("salary_range", jobSalaryRange)
        updateJobByID(job.id, formData)
        
    }

    return (
        <>
            {/* <!-- Main modal --> */}
            <div className={`${updateMode ? "flex h-full  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 justify-center items-center w-full md:inset-0 h-modal md:h-full" : "hidden"}`}>
                <div className='fixed w-full h-full bg-black/30 z-40' onClick={() => setUpdateMode(!updateMode)} />
                <div className="relative p-4 w-full max-w-xl h-full md:h-auto z-[45]">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl ">
                                <h3 className="font-semibold ">
                                    Update job {jobTitle}
                                </h3>
                            </div>
                            <div>
                                <button type="button" onClick={() => setUpdateMode(!updateMode)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex ">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div className="sm:col-span-2">
                                    <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Position</label>
                                    <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} name="jobTitle" id="jobTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Customer Support Specialist" required="" />
                                </div>
                                <div>
                                    <label htmlFor="workPlace" className="block mb-2 text-sm font-medium text-gray-900 ">Work place</label>
                                    <select id="workPlace" value={jobWorkPlace} onChange={(e) => setJobWorkPlace(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                        <option value="">Select category</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Office">Office</option>
                                    </select>
                                </div>                        
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                                    <select id="category" value={jobCategory} onChange={(e) => setJobCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" required>
                                        {
                                            !jobCategory ?<option>Select Category</option> : ""
                                        }
                                        {
                                            categories.filter(cat => cat !== jobCategory ).map((category) => (
                                                <option key={category?.id} value={category?.id}>{category?.category_name}</option>
                                            ))
                                        }

                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Salary</label>
                                    <input type="number" value={jobSalaryRange} onChange={(e) => setJobSalaryRange(e.target.value)} name="jobTitle" id="jobTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Customer Support Specialist" required="" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                    <textarea id="description" rows="8" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                        Save Changes
                                    </button>
                                </div>
                                <button type="button" onClick={() => setUpdateMode(!updateMode)} className="inline-flex items-cente border-2 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Close
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateJobModal