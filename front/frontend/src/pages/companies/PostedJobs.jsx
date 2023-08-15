import { Link } from "react-router-dom"
import useFetchPostedJobs from "./hooks/useFetchPostedJobs"
import { useEffect, useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import DeleteJob from "./DeleteJob";
import { AiFillEdit } from "react-icons/ai";
import UpdateJobModal from "./UpdateJobModal";
import useAuth from "../../context/useAuth";



const PostedJobs = () => {
    const { postedJobs, deleteJob, fetchJobs } = useFetchPostedJobs()
    const { successMsgApi  } = useAuth()
    const [ showModal, setShowModal] = useState(false)
    const [ updateMode, setUpdateMode] = useState(false)
    const [currentJob, setCurrentJob] = useState(null); // State to store the current application for the modal

    useEffect(()=>{
        fetchJobs()
    }, [updateMode, successMsgApi])

    // Function to open the modal and set the currentApp to the selected application
    const openModal = (job) => {
        setCurrentJob(job);
        setShowModal(!showModal);
    };
    const handleDelete = (jobId) => {
        deleteJob(jobId)
        setShowModal(!showModal);
    }
    const updateModeFunc = (job)=>{
        setCurrentJob(job)
        setUpdateMode(!updateMode)
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
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Work Place
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Post date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            postedJobs.map((job) => (
                                <tr className="bg-white border-b " key={job?.id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <Link to="/">{job?.title}</Link>
                                    </th>
                                    <td className="px-6 py-4 capitalize">
                                        {job?.category?.category_name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {job?.work_place}
                                    </td>
                                    <td className="px-6 py-4">
                                        {job?.time_stamp} ago
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => openModal(job)} type="button" className="mr-2 relative inline-flex items-center p-[6px] text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                            <RiDeleteBinFill />
                                        </button>
                                        <button onClick={() => updateModeFunc(job)} type="button" className="relative inline-flex items-center p-[6px] text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                            <AiFillEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <DeleteJob showModal={showModal} job={currentJob} handleDelete={handleDelete} setShowModal={setShowModal} />
                <UpdateJobModal updateMode={updateMode} job={currentJob} setUpdateMode={setUpdateMode} />
            </div>
        </>
    )
}

export default PostedJobs