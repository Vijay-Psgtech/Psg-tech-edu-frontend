import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./styles/theme.css";
import Home from "./pages/HomeRedesign.jsx";
import About from "./pages/About.jsx";
import Management from "./pages/Management.jsx";
import Principal from "./pages/Principal.jsx";
import ProfessorOfPractice from "./pages/ProfessorofPractice.jsx";
import VicePrincipalWomenWelfare from "./pages/VicePrincipalWomenWelfare.jsx";
import DeanAcademic from "./pages/DeanAcademic.jsx";
import DeanAdministration from "./pages/DeanAdministration.jsx";
import DeanAutonomousFunctioning from "./pages/DeanAutonomousFunctioning.jsx";
import Programmes from "./pages/Academics/Programmes.jsx";
import ProgrammeDetail from "./pages/Academics/Programmedetail.jsx";
import HeadsOfDepartments from "./pages/Academics/Headsofdepartments.jsx";
import HodDetail from "./pages/Academics/Hoddetail.jsx";
import AcademicCalendar from "./pages/Academics/AcademicCalendar.jsx";
import AcademicCalendarDetail from "./pages/Academics/AcademicCalendarDetail.jsx";
import Scholarships from "./pages/Scholarship/Scholarships.jsx";
import ScholarshipDetail from "./pages/Scholarship/Scholarshipdetail.jsx";
import Exams from "./pages/Exams/Exams.jsx";
import Department from "./pages/Department.jsx";
import Departments from "./pages/Departments.jsx";
import Contact from "./pages/Contact.jsx";
import Reports from "./pages/Reports.jsx";
import CmsLogin from "./pages/cms/Login.jsx";
import CmsDashboard from "./pages/cms/Dashboard.jsx";
import EditHomepage from "./pages/cms/EditHomepage.jsx";
import EditDepartment from "./pages/cms/EditDepartment.jsx";

function RequireCmsAuth({ children }) {
  return localStorage.getItem("cms_token") ? children : <Navigate to="/cms/login" replace />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/management" element={<Management />} />
        <Route path="/about/principal" element={<Principal />} />
        <Route path="/about/professor-of-practice" element={<ProfessorOfPractice />} />
        <Route path="/about/vice-principal-women-welfare" element={<VicePrincipalWomenWelfare />} />
        <Route path="/about/dean-academic" element={<DeanAcademic />} />
        <Route path="/about/dean-administration" element={<DeanAdministration />} />
        <Route path="/about/dean-autonomous-functioning" element={<DeanAutonomousFunctioning />} />
        <Route path="/academics/programmes" element={<Programmes />} />
        <Route path="/academics/programmes/:slug" element={<ProgrammeDetail />} />
        <Route path="/academics/heads-of-department" element={<HeadsOfDepartments />} />
        <Route path="/academics/heads-of-department/:slug" element={<HodDetail />} />
        <Route path="/academics/calendar" element={<AcademicCalendar />} />
        <Route path="/academics/calendar/:slug" element={<AcademicCalendarDetail />} />
        <Route path="/academics/scholarships" element={<Scholarships />} />
        <Route path="/academics/scholarships/:slug" element={<ScholarshipDetail />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/exams/:section" element={<Exams />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:slug/reports/:reportId" element={<Reports />} />
        <Route path="/departments/:slug/reports" element={<Reports />} />
        <Route path="/departments/:slug" element={<Department />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cms/login" element={<CmsLogin />} />
        <Route path="/cms" element={<RequireCmsAuth><CmsDashboard /></RequireCmsAuth>} />
        <Route path="/cms/homepage" element={<RequireCmsAuth><EditHomepage /></RequireCmsAuth>} />
        <Route path="/cms/departments/:slug" element={<RequireCmsAuth><EditDepartment /></RequireCmsAuth>} />
        <Route path="/login" element={<Navigate to="/cms/login" replace />} />
        <Route path="/homepage" element={<Navigate to="/cms/homepage" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);