/* 
Project: CBS Research Group Admin Dashboard
Content: Common alert model style
Date: 29/08/2024 
*/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./authentication/auth-context/AuthContext";
import PrivateRoute from "./private/PrivateRoute";
import AdminPanel from "./AdminPanel";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetForgottenPassword from "./pages/reset-forgotten-password/ResetForgottenPassword";
import Index from ".";
import AdminRegReq from "./pages/send-admin-reg-request/AdminRegReq";
import RegisterAdmin from "./pages/register-admin/RegisterAdmin";
import PasswordChange from "./pages/password-change/PasswordChange";
import ApproveRequest from "./pages/approve-request/ApproveRequest";
import ManageAdminRequests from "./pages/manage-admin-requests/ManageAdminRequests";
import RejectRequests from "./pages/reject-request/RejectRequests";
import { AppProvider } from "./app-context/AppContext";
import DeleteRequest from "./pages/delete-request/DeleteRequest";
import UploadMastersAlumni from "./pages/master-alumni/UploadMastersAlumni";
import ManageMastersAlumni from "./pages/master-alumni/ManageMastersAlumni";
import PreviewMastersAlumni from "./pages/master-alumni/PreviewMastersAlumni";
import UpdateMastersAlumni from "./pages/master-alumni/UpdateMastersAlumni";
import DeleteMastersAlumni from "./pages/master-alumni/DeleteMastersAlumni";
import UploadDoctorateAlumni from "./pages/doctorate-alumni/UploadDoctorateAlumni";
import ManageDoctorateAlumni from "./pages/doctorate-alumni/ManageDoctorateAlumni";
import UpdateDoctotateAlumni from "./pages/doctorate-alumni/UpdateDoctotateAlumni";
import DeleteDoctorateAlumni from "./pages/doctorate-alumni/DeleteDoctorateAlumni";
import PreviewDoctorateAlumni from "./pages/doctorate-alumni/PreviewDoctorateAlumni";
import UploadMscMember from "./pages/msc-members/UploadMscMember";
import ManageMscMembers from "./pages/msc-members/ManageMscMembers";
import PreviewMscMember from "./pages/msc-members/PreviewMscMember";
import UpdateMscMember from "./pages/msc-members/UpdateMscMember";
import DeleteMscMember from "./pages/msc-members/DeleteMscMember";
import UploadPhdMember from "./pages/phd-members/UploadPhdMember";
import ManagePhdMembers from "./pages/phd-members/ManagePhdMembers";
import PreviewPhdMember from "./pages/phd-members/PreviewPhdMember";
import UpdatePhdMember from "./pages/phd-members/UpdatePhdMember";
import DeletePhdMember from "./pages/phd-members/DeletePhdMember";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetForgottenPassword />}
            />
            <Route path="/become-admin-request" element={<AdminRegReq />} />
            <Route
              path="/admin-panel"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/admin-panel/register" element={<RegisterAdmin />} />
              <Route
                path="/admin-panel/password-change"
                element={<PasswordChange />}
              />

              <Route
                path="/admin-panel/manage-request"
                element={<ManageAdminRequests />}
              />
              <Route
                path="/admin-panel/approve-request/:id"
                element={<ApproveRequest />}
              />
              <Route
                path="/admin-panel/reject-request/:id"
                element={<RejectRequests />}
              />

              <Route
                path="/admin-panel/delete-request/:id"
                element={<DeleteRequest />}
              />

              <Route
                path="/admin-panel/upload-masters-alumni"
                element={<UploadMastersAlumni />}
              />
              <Route
                path="/admin-panel/manage-masters-alumni"
                element={<ManageMastersAlumni />}
              />
              <Route
                path="/admin-panel/preview-masters-alumni/:id"
                element={<PreviewMastersAlumni />}
              />
              <Route
                path="/admin-panel/update-masters-alumni/:id"
                element={<UpdateMastersAlumni />}
              />
              <Route
                path="/admin-panel/delete-masters-alumni/:id"
                element={<DeleteMastersAlumni />}
              />
              <Route
                path="/admin-panel/upload-doctorate-alumni"
                element={<UploadDoctorateAlumni />}
              />
              <Route
                path="/admin-panel/manage-doctorate-alumni"
                element={<ManageDoctorateAlumni />}
              />
              <Route
                path="/admin-panel/update-doctorate-alumni/:id"
                element={<UpdateDoctotateAlumni />}
              />
              <Route
                path="/admin-panel/delete-doctorate-alumni/:id"
                element={<DeleteDoctorateAlumni />}
              />
              <Route
                path="/admin-panel/preview-doctorate-alumni/:id"
                element={<PreviewDoctorateAlumni />}
              />
              <Route
                path="/admin-panel/upload-msc-member"
                element={<UploadMscMember />}
              />
              <Route
                path="/admin-panel/manage-msc-members"
                element={<ManageMscMembers />}
              />
              <Route
                path="/admin-panel/preview-msc-member/:id"
                element={<PreviewMscMember />}
              />
              <Route
                path="/admin-panel/update-msc-member/:id"
                element={<UpdateMscMember />}
              />
              <Route
                path="/admin-panel/delete-msc-member/:id"
                element={<DeleteMscMember />}
              />

              <Route
                path="/admin-panel/upload-phd-member"
                element={<UploadPhdMember />}
              />
              <Route
                path="/admin-panel/manage-phd-members"
                element={<ManagePhdMembers />}
              />
              <Route
                path="/admin-panel/preview-phd-member/:id"
                element={<PreviewPhdMember />}
              />
              <Route
                path="/admin-panel/update-phd-member/:id"
                element={<UpdatePhdMember />}
              />
              <Route
                path="/admin-panel/delete-phd-member/:id"
                element={<DeletePhdMember />}
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
