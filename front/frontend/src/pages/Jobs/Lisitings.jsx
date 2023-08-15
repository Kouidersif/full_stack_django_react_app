import React from 'react'
import { Link } from 'react-router-dom'

const Lisitings = ({jobs}) => {
    return (
        <ul className="divide-y divide-gray-100">
        {jobs.map((job) => (
            <Link to={`/job/${job.id}/`} key={job.id}>
            <li className="flex justify-between gap-x-6 py-6 px-6 shadow-md mb-2 rounded-lg">
            <div className="flex gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png" alt="" />
                <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{job.title}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{job.salary_range}</p>
            </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{job.work_place}</p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                    {job.time_stamp} ago
                </p>
            </div>
        </li>
        </Link>
        ))}
        </ul>
    )
}

export default Lisitings