import React, { useEffect, useState } from 'react'
import useFetchApplication from '../hooks/useFetchApplication'
import { Link } from 'react-router-dom'
import { BsEyeFill } from "react-icons/bs";
import ApplicationDetail from './ApplicationDetail';


const ViewApplications = () => {
    const { applications, fetchApps } = useFetchApplication()
    const [ showModal, setShowModal ] = useState(false)
    const [ currentApp, setCurrentApp ] = useState({})

    useEffect(()=>{
        fetchApps()
    }, [showModal])

    const openModal = (application)=>{
        setShowModal(!showModal)
        setCurrentApp(application)
    }
    return (
        <>
                <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                            Jobs you shared
                            <p className="mt-1 text-sm font-normal text-gray-500">On this page, you can view all the job applications you've submitted. If there are any updates to any of these applications, you will receive notifications about them.</p>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Applicant
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applications.map((application) => (
                                    <tr className="bg-white border-b " key={application?.id}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link to="/">{application?.job?.title}</Link>
                                        </th>
                                        <td className="px-6 py-4 capitalize">
                                            {application?.applicant?.user?.first_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {application?.request}
                                        </td>
                                        <td className="px-6 py-4">
                                            {application?.sent_at}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => openModal(application)} type="button" className="relative inline-flex items-center p-[6px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                                <BsEyeFill />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <ApplicationDetail showModal={showModal} app={currentApp}  setShowModal={setShowModal} />
                </div>
            </>
      )
}

export default ViewApplications