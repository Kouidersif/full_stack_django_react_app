import { useState } from "react";
import Lisitings from "./Lisitings";
import Pagination from "./Pagination";
import useFetchJobs from "./hooks/useFetchJobs";
import InfiniteScroll from "react-infinite-scroll-component";


const JobsList = () => {
    const [ searchQuery, setSearchQuery  ] = useState('')
    const [ pages, setPages ] = useState(1)
    const { jobs, hasMore } = useFetchJobs(searchQuery, null, null, pages)

    return (
        <section className="max-w-[1116px] mx-auto mt-14">
            <form className='mb-8'>   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" value={searchQuery} id="default-search" onChange={(e) => setSearchQuery(e.target.value)} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none  " placeholder="Search jobs" required />
            </div>
        </form>
        <InfiniteScroll
        dataLength={jobs?.length}
        hasMore={hasMore}
        next={()=>setPages((page) => page + 1)}
        loader={<h1>Loading...</h1>}
        >
        <Lisitings jobs={jobs} />
        </InfiniteScroll>
        {
            !hasMore ? <h1 className="text-center p-4">No More content to show</h1> : ""
        }
        </section>
    )
}


export default JobsList;