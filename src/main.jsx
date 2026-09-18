import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./styles/theme.css";
import Home from "./pages/HomeRedesign.jsx";
import Department from "./pages/Department.jsx";
import Departments from "./pages/Departments.jsx";
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
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:slug/reports/:reportId" element={<Reports />} />
        <Route path="/departments/:slug/reports" element={<Reports />} />
        <Route path="/departments/:slug" element={<Department />} />
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
