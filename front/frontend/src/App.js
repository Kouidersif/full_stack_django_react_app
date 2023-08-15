import './App.css';
import { NavBar, JobsList, APImsgs, Loading } from './components/index';
import { Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from './permissions/RequireAuth';
import { CompaniesAccess, ApplicantsAccess } from './permissions/RequireAuth';
import Layout from "./Layout";
import { ViewJob, LoginForm, RegisterApplicant,
  ApplicantProfile, ApplyForJob, CompanyRegister,
  CompanyUserData, PostNewJob } from "./pages/index";


function App() {
  const location = useLocation();
  const hideNavBarRoutes = ['/company/sign-up/', '/applicant/sign-up', '/login']; // Specifying the routes where the navbar should be hidden
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);
  return (
    <>
    <Loading />
    {!shouldHideNavBar && <NavBar />}
    {/* Messages pop ups returned by API */}
    <APImsgs />
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route element={<JobsList />} path='/' exact />
        <Route element={<ViewJob />} path='/job/:id/' />
        <Route element={<LoginForm />} path='/login' />
        <Route element={<RegisterApplicant />} path='/applicant/sign-up/' />
        <Route element={<CompanyRegister />} path='/company/sign-up/' />
        {/* Private Routes */}
        <Route path='/' element={<RequireAuth />}>
        <Route path='/' element={<ApplicantsAccess />}>
        {/* Applicants */}
        <Route element={<ApplicantProfile />} path='/applicant/profile/' />
        <Route element={<ApplyForJob />} path='/apply/:id/' />
        </Route>
        <Route path='/' element={<CompaniesAccess />}>
        {/* Companies */}
        <Route element={<CompanyUserData />} path='/company/info/' />
        <Route element={<PostNewJob />} path='/post/' />
        </Route>
      </Route>
      </Route>
      
    </Routes>
    
    </>
  );
}

export default App;
