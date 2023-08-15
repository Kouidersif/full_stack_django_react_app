import React, { useEffect, useState } from 'react';
import { GrDocumentPdf } from "react-icons/gr";
import { Link } from 'react-router-dom';
import useUpdateApp from './hooks/useUpdateApp';


const ApplicationDetail = ({ showModal, setShowModal, app }) => {
    const { updateApplication } = useUpdateApp()
    const [ responseMessage, setResponseMessage ] = useState("")
    const [ appStatus, setAppStatus ] = useState("")
    useEffect(()=>{
        if (app){
            setResponseMessage(app?.response_message || "")
            setAppStatus(app?.request || "")
        }
    }, [app])

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        updateApplication(app?.id, appStatus, responseMessage)
    }

    return (
        <>
            {/* <!-- Main modal --> */}
            <div className={`${showModal ? "flex h-full  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 justify-center items-center w-full md:inset-0 h-modal md:h-full" : "hidden"}`}>
                <div className='fixed w-full h-full bg-black/30 z-40' onClick={()=> setShowModal(!showModal)} />
                <div className="relative p-4 w-full max-w-xl h-full md:h-auto z-[45]">
                    {/* <!-- Modal content --> */}
                    <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                        {/* <!-- Modal header --> */}
                        <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                            <div className="text-lg text-gray-900 md:text-xl ">
                                <h3 className="font-semibold ">
                                    Application sent by {app?.applicant?.user?.first_name}
                                </h3>
                            </div>
                            <div>
                                <button type="button" onClick={()=> setShowModal(!showModal)}  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex ">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>
                        <dl>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 ">Cover Letter</dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5">{app?.cover_letter}</dd>
                        <form>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 ">Reply to Applicant</dt>
                            <select value={appStatus} onChange={(e)=>setAppStatus(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
                                <option value="Considered">Considered</option>
                                <option value="Pending">Pending</option>
                                <option value="No Luck">No Luck</option>
                                <option value="Approved">Approved</option>
                            </select>
                            <dt htmlFor="message" className='mt-3'>Additional information<span className='text-gray-400'>(optional)</span></dt>
                            <textarea id="message" value={responseMessage} onChange={(e)=> setResponseMessage(e.target.value)} rows="4" className="block mt-3 mb-3 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Type your response here..."></textarea>
                        </form>
                        </dl>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <button type="button" onClick={handleFormSubmit} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                    Save Changes
                                </button>
                                <Link to={app?.applicant?.resume} target='_blank' className="flex items-center gap-[6px] py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
                                    Resume <GrDocumentPdf />
                                </Link>
                            </div>
                            <button type="button" onClick={()=> setShowModal(!showModal)} className="inline-flex items-cente border-2 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}

export default ApplicationDetail