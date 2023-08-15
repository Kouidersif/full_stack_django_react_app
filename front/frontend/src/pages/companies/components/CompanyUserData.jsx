import React, { useState } from 'react';
import UserData from '../../applicants/profile/UserData';
import CompanyData from '../CompanyData';
import PostedJobs from "../PostedJobs";
import ViewApplications from '../AppsManager/ViewApplications';

const CompanyUserData = () => {
        // a state to show correct tabs
        const [ showTab, setShowTab ] = useState("profile")

        return (
            <section className='max-w-[1116px] mx-auto mt-12 relative'>
                <div className="mb-4 border-b border-gray-200">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className={`mr-2 ${ showTab === "profile" ? "text-blue-800" : "" }`} role="presentation" onClick={()=> setShowTab("profile")}>
                            <button className="inline-block p-4 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                        </li>
                        <li className={`mr-2 ${ showTab === "user" ? "text-blue-800" : "" }`} role="presentation"  onClick={()=> setShowTab("user")}>
                            <button className="inline-block p-4 border-transparent rounded-t-lg" id="user-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">User Settings</button>
                        </li>
                        <li className={`mr-2 ${ showTab === "jobs" ? "text-blue-800" : "" }`} role="presentation" onClick={()=> setShowTab("jobs")}>
                            <button className="inline-block p-4 border-transparent rounded-t-lg" id="jobs-tab" data-tabs-target="#jobs" type="button" role="tab" aria-controls="settings" aria-selected="false">Posted Jobs</button>
                        </li>
                        <li className={`mr-2 ${ showTab === "applications" ? "text-blue-800" : "" }`} role="presentation" onClick={()=> setShowTab("applications")}>
                            <button className="inline-block p-4 border-transparent rounded-t-lg" id="jobs-tab" data-tabs-target="#apps" type="button" role="tab" aria-controls="settings" aria-selected="false">Applications</button>
                        </li>
                    </ul>
                </div>
                <div id="myTabContent">
                    
                    <div className={`p-4 rounded-lg ${ showTab === "profile"?  "block" : "hidden"  }`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <CompanyData />
                    </div>
                    <div className={`p-4 rounded-lg ${ showTab === "user" ?  "block" : "hidden"  }`} id="dashboard" role="tabpanel" aria-labelledby="user-tab">
                    <UserData />
                    </div>
                    <div className={`p-4 rounded-lg ${ showTab === "jobs" ?  "block" : "hidden"  }`} id="jobs" role="tabpanel" aria-labelledby="applications-tab">
                    <PostedJobs />
                    </div>
                    <div className={`p-4 rounded-lg ${ showTab === "applications" ?  "block" : "hidden"  }`} id="apps" role="tabpanel" aria-labelledby="applications-tab">
                    <ViewApplications />
                    </div>
                </div>
    
            </section>
        )
}

export default CompanyUserData