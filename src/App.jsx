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
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
