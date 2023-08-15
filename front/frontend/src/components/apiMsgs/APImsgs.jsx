import React, { useEffect } from 'react'
import useAuth from "../../context/useAuth"
import { AiOutlineClose } from "react-icons/ai";

const APImsgs = () => {
    const { errorMsgApi, successMsgApi, setSuccessMsgApi, setErrorMsgApi } = useAuth()

    useEffect(() => {
        if (errorMsgApi) {
        const timeout = setTimeout(() => {
            setErrorMsgApi('');
          }, 4000); // Hide the error message after 4 seconds
        return () => clearTimeout(timeout);
        }
        }, [errorMsgApi]);

    useEffect(() => {
        if (successMsgApi) {
        const timeout = setTimeout(() => {
            setSuccessMsgApi('');

          }, 4000); // Hide the success message after 4 seconds
        return () => clearTimeout(timeout);
        }
    }, [successMsgApi]);

    return (
        <>
            {/* Errors */}
            <div className={`fixed bottom-2 right-2 ${ errorMsgApi ? 'opacity-100 z-50' : 'opacity-0 translate-x-full'} transition-opacity duration-500`}>
                    <div className="flex p-4 mb-4 text-sm text-white rounded-sm bg-red-700 " role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div className='flex justify-between items-center'>
                            <span>{errorMsgApi}</span> 
                            <button onClick={()=> setErrorMsgApi('')}><AiOutlineClose size={20} /></button>
                        </div>
                    </div>
                </div>
                {/* Success */}
                <div className={`fixed bottom-2 right-2 ${ successMsgApi ? 'opacity-100 z-50' : 'opacity-0 translate-x-full'} transition-opacity duration-500`}>
                    <div className="flex p-4 mb-4 text-sm text-white rounded-sm bg-green-700 items-center " role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div className='flex justify-between items-center gap-2'>
                            <span>{successMsgApi}</span>
                            <button onClick={()=> setSuccessMsgApi('')}><AiOutlineClose size={20} /> </button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default APImsgs