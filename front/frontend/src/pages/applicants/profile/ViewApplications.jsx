import React, { useState } from 'react'
import useFetchApplications from './hooks/useFetchApplications'
import { Link } from 'react-router-dom'
import CoMessage from './ApplicationMsg/CoMessage'

const ViewApplications = () => {
    const { fetchApps, userApplications } = useFetchApplications()
    const [showModal, setShowModal] = useState(false)
    const [currentApp, setCurrentApp] = useState(null); // State to store the current application for the modal

    
    // Function to open the modal and set the currentApp to the selected application
    const openModal = (app) => {
        setCurrentApp(app);
        setShowModal(true);
    };


    return (
        <>
            <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                        Jobs you applied for
                        <p className="mt-1 text-sm font-normal text-gray-500 ">On this page, you can view all the job applications you've submitted. If there are any updates to any of these applications, you will receive notifications about them.</p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">

                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Application date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Messages
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userApplications.map((app) => (
                                <tr className="bg-white border-b" key={app?.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <Link to="/">{app?.job?.title}</Link>
                                    </th>
                                    <td className="px-6 py-4 capitalize">
                                        {app?.job?.company_published?.company_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            app.request === "Pending" ?
                                                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{app?.request}</span>
                                                : app?.request === "Considered" ?
                                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{app?.request}</span>
                                                    : app?.request === "No Luck" ?
                                                        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{app?.request}</span>
                                                        : app?.request === "Approved" ?
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{app?.request}</span>
                                                            : null

                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        {app?.sent_at}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => openModal(app)} disabled={!app?.response_message} type="button" className="relative inline-flex items-center p-[6px] text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                            <span className="sr-only">Notifications</span>
                                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                                                {app?.response_message ? "1" : "0"}
                                            </div>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <CoMessage showModal={showModal} app={currentApp}  setShowModal={setShowModal} />


            </div>
        </>


    )
}

export default ViewApplications