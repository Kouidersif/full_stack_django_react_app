import React, { useEffect, useState } from "react";
import verified from "../../assets/top-vendor.svg"
import { Link, useParams } from "react-router-dom";
import useRetrieveJob from "./useRetrieveJob";
import ApplyForJob from "../Jobs/ApplyForJob";
import useAuth from "../../context/useAuth";

const ViewJob = () => {
    const Job = useParams()
    const { jobDetails, hasApplied, fetchJobData  } = useRetrieveJob(Job.id)
    const { userToken } = useAuth()
    const [ showModal, setShowModal ] = useState(false)

    useEffect(()=>{
        fetchJobData(Job.id)
    }, [showModal])
    return (
        <>
        <div className="max-w-[1116px] mx-auto mt-12">
            <div>
                <div className="px-4 sm:px-0">
                    <li className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4">
                            <img
                                className="h-16 w-16 flex-none rounded-full bg-gray-50"
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
                                alt=""
                            />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                                    {jobDetails?.company_published?.company_name}
                                    <img
                                        className="h-[15px] w-[15px] ml-2 flex-none rounded-full bg-gray-50" src={verified}
                                        alt=""
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{jobDetails?.time_stamp} ago</p>
                        </div>
                    </li>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Position
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {jobDetails?.title}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Salary Range
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                $ {jobDetails?.salary_range}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Work Place
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {jobDetails?.work_place}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Category
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {jobDetails?.category?.category_name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Details
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {jobDetails?.description}
                            </dd>
                        </div>

                    </dl>
                </div>
                <div className='w-full flex justify-center mt-4'>
                    {
                        hasApplied ? 
                        <div id="alert-additional-content-1" className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
                        <div className="flex items-center">
                            <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <h3 className="text-lg font-medium">Info</h3>
                        </div>
                        <div className="mt-2 mb-4 text-sm">
                            Thank you for expressing your interest. However, it appears that you have already applied for this job in the past. To check the current status of your application, please follow the link provided below.                        </div>
                        <div className="flex">
                            <Link to="/applicant/profile/" type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                View applications
                            </Link>
                            <Link to="/" type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                                Go Home
                            </Link>
                        </div>
                    </div>
                    :
                    userToken?.isApplicant ? 
                    <button className={'bg-blue-500 text-white px-4 py-2 rounded-lg'} onClick={()=>setShowModal(!showModal)}>Send Application </ button>
                    : null
                    }

                </div>
            </div>
        </div>
        {/* Application Modal */}
        <ApplyForJob jobDetails={jobDetails} showModal={showModal}  setShowModal={setShowModal} />
        </>
    );
};

export default ViewJob;
