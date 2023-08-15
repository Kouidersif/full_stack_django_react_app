import React from 'react';

const CoMessage = ({ showModal, setShowModal, app }) => {
    return (

        <div className={`${showModal ? "fixed top-0 left-0 right-0 bg-black/60 flex justify-center items-center z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" : "hidden"}`}>
            <div className="relative w-full max-w-[1116px] max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-start justify-between p-4 border-b rounded-t ">
                        <div className='flex gap-2 items-center'>
                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" />
                            <h3 className='text-xl font-semibold text-gray-900'>{app?.job?.company_published?.company_name}</h3>
                        </div>
                        <button type="button" onClick={() => setShowModal(!showModal)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500">
                            {app?.response_message}
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoMessage;
