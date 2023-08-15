import React, { useState } from 'react'
import useCreateJob from './useCreateJob'

const PostNewJob = () => {
    const { createNewJob, categories } = useCreateJob() 
    const [ jobTitle, setJobTitle ] = useState("")
    const [ jobDescription , setJobDescription ] = useState("")
    const [ jobWorkPlace , setJobWorkPlace ] = useState("")
    const [ jobCategory , setJobCategory ] = useState("")
    const [ jobSalaryRange , setJobSalaryRange ] = useState(0)

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", jobTitle)
        formData.append("description", jobDescription)
        formData.append("work_place", jobWorkPlace)
        formData.append("category", jobCategory)
        formData.append("salary_range", jobSalaryRange)
        createNewJob(formData)
        setJobTitle("")
        setJobDescription("")
        setJobWorkPlace("")
        setJobCategory("")
        setJobSalaryRange("")
    }



    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Post new job</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Position</label>
                            <input type="text" value={jobTitle} onChange={(e)=> setJobTitle(e.target.value)} name="jobTitle" id="jobTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Customer Support Specialist" required="" />
                        </div>
                        <div>
                            <label htmlFor="workPlace" className="block mb-2 text-sm font-medium text-gray-900 ">Work place</label>
                            <select id="workPlace" value={jobWorkPlace} onChange={(e)=> setJobWorkPlace(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option value="">Select category</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Office">Office</option>
                            </select>
                        </div>                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">Category</label>
                            <select id="category" value={jobCategory} onChange={(e)=> setJobCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                            <option value="">Select category</option>
                                {
                                    categories?.map((category)=>(
                                        <option key={category?.id} value={category?.id}>{category?.category_name}</option>
                                    ))
                                }
                                
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900 ">Salary</label>
                            <input type="number" value={jobSalaryRange} onChange={(e)=> setJobSalaryRange(e.target.value)} name="jobTitle" id="jobTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Customer Support Specialist" required="" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                            <textarea id="description" rows="8" value={jobDescription} onChange={(e)=> setJobDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Your description here"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="flex items-center justify-center w-full text-center py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                        Create
                    </button>
                </form>
            </div>
        </section>
    )
}

export default PostNewJob