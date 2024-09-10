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
import UploadPersonalAward from "./pages/personal-awards/UploadPersonalAward";
import ManagePersonalAwards from "./pages/personal-awards/ManagePersonalAwards";
import UpdatePersonalAward from "./pages/personal-awards/UpdatePersonalAward";
import DeletePersonalAward from "./pages/personal-awards/DeletePersonalAward";
import UploadTeamAward from "./pages/team-awards/UploadTeamAward";
import ManageTeamAwards from "./pages/team-awards/ManageTeamAwards";
import UpdateTeamAward from "./pages/team-awards/UpdateTeamAward";
import DeleteTeamAward from "./pages/team-awards/DeleteTeamAward";
import UploadLabInstrument from "./pages/lab-instruments/UploadLabInstrument";
import ManageLabInstruments from "./pages/lab-instruments/ManageLabInstruments";
import UpdateLabInstrument from "./pages/lab-instruments/UpdateLabInstrument";
import DeleteLabInstrument from "./pages/lab-instruments/DeleteLabInstrument";
import UploadGroupnews from "./pages/group-news/UploadGroupnews";
import ManageGroupnews from "./pages/group-news/ManageGroupnews";
import UpdateGroupnews from "./pages/group-news/UpdateGroupnews";
import DeleteGroupnews from "./pages/group-news/DeleteGroupnews";
import ManageContacts from "./pages/contact-info/ManageContacts";
import DeleteContactInfo from "./pages/contact-info/DeleteContactInfo";
import PreviewContactInfo from "./pages/contact-info/PreviewContactInfo";
import SendApplicationResponse from "./pages/contact-info/SendApplicationResponse";
import UploadProject from "./pages/projects/UploadProject";
import ManageProjects from "./pages/projects/ManageProjects";
import UpdateProject from "./pages/projects/UpdateProject";
import DeleteProject from "./pages/projects/DeleteProject";
import UploadPublication from "./pages/publications/UploadPublication";
import ManagePublications from "./pages/publications/ManagePublications";
import DeletePublication from "./pages/publications/DeletePublication";
import UpdatePublication from "./pages/publications/UpdatePublication";
import PreviewPublication from "./pages/publications/PreviewPublication";

function App() {
  const publicRoutes = [
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:id/:token",
      element: <ResetForgottenPassword />,
    },
    {
      path: "/become-admin-request",
      element: <AdminRegReq />,
    },
  ];

  const privateRoutes = [
    {
      path: "/register",
      element: <RegisterAdmin />,
    },
    {
      path: "/password-change",
      element: <PasswordChange />,
    },
    {
      path: "/manage-request",
      element: <ManageAdminRequests />,
    },
    {
      path: "/approve-request/:id",
      element: <ApproveRequest />,
    },
    {
      path: "/reject-request/:id",
      element: <RejectRequests />,
    },
    {
      path: "/delete-request/:id",
      element: <DeleteRequest />,
    },
    {
      path: "/upload-masters-alumni",
      element: <UploadMastersAlumni />,
    },
    {
      path: "/manage-masters-alumni",
      element: <ManageMastersAlumni />,
    },
    {
      path: "/preview-masters-alumni/:id",
      element: <PreviewMastersAlumni />,
    },
    {
      path: "/update-masters-alumni/:id",
      element: <UpdateMastersAlumni />,
    },
    {
      path: "/delete-masters-alumni/:id",
      element: <DeleteMastersAlumni />,
    },
    {
      path: "/upload-doctorate-alumni",
      element: <UploadDoctorateAlumni />,
    },
    {
      path: "/manage-doctorate-alumni",
      element: <ManageDoctorateAlumni />,
    },
    {
      path: "/update-doctorate-alumni/:id",
      element: <UpdateDoctotateAlumni />,
    },
    {
      path: "/delete-doctorate-alumni/:id",
      element: <DeleteDoctorateAlumni />,
    },
    {
      path: "/preview-doctorate-alumni/:id",
      element: <PreviewDoctorateAlumni />,
    },
    {
      path: "/upload-msc-member",
      element: <UploadMscMember />,
    },
    {
      path: "/manage-msc-members",
      element: <ManageMscMembers />,
    },
    {
      path: "/preview-msc-member/:id",
      element: <PreviewMscMember />,
    },
    {
      path: "/update-msc-member/:id",
      element: <UpdateMscMember />,
    },
    {
      path: "/delete-msc-member/:id",
      element: <DeleteMscMember />,
    },
    {
      path: "/upload-phd-member",
      element: <UploadPhdMember />,
    },
    {
      path: "/manage-phd-members",
      element: <ManagePhdMembers />,
    },
    {
      path: "/preview-phd-member/:id",
      element: <PreviewPhdMember />,
    },
    {
      path: "/update-phd-member/:id",
      element: <UpdatePhdMember />,
    },
    {
      path: "/delete-phd-member/:id",
      element: <DeletePhdMember />,
    },
    {
      path: "/upload-personal-award",
      element: <UploadPersonalAward />,
    },
    {
      path: "/manage-personal-awards",
      element: <ManagePersonalAwards />,
    },
    {
      path: "/delete-personal-award/:id",
      element: <DeletePersonalAward />,
    },
    {
      path: "/update-personal-award/:id",
      element: <UpdatePersonalAward />,
    },
    {
      path: "/upload-team-award",
      element: <UploadTeamAward />,
    },
    {
      path: "/manage-team-awards",
      element: <ManageTeamAwards />,
    },
    {
      path: "/update-team-award/:id",
      element: <UpdateTeamAward />,
    },
    {
      path: "/delete-team-award/:id",
      element: <DeleteTeamAward />,
    },
    {
      path: "/upload-lab-instrument",
      element: <UploadLabInstrument />,
    },
    {
      path: "/manage-lab-instruments",
      element: <ManageLabInstruments />,
    },
    {
      path: "/update-lab-instrument/:id",
      element: <UpdateLabInstrument />,
    },
    {
      path: "/delete-lab-instrument/:id",
      element: <DeleteLabInstrument />,
    },
    {
      path: "/upload-group-news",
      element: <UploadGroupnews />,
    },
    {
      path: "/manage-group-news",
      element: <ManageGroupnews />,
    },
    {
      path: "/update-group-news/:id",
      element: <UpdateGroupnews />,
    },
    {
      path: "/delete-group-news/:id",
      element: <DeleteGroupnews />,
    },
    {
      path: "/manage-contacts",
      element: <ManageContacts />,
    },
    {
      path: "/delete-contacts/:id",
      element: <DeleteContactInfo />,
    },
    {
      path: "/preview-contacts/:id",
      element: <PreviewContactInfo />,
    },
    {
      path: "/send-contact-application-response/:id",
      element: <SendApplicationResponse />,
    },
    {
      path: "/upload-project",
      element: <UploadProject />,
    },
    {
      path: "/manage-projects",
      element: <ManageProjects />,
    },
    {
      path: "/update-project/:id",
      element: <UpdateProject />,
    },
    {
      path: "/delete-project/:id",
      element: <DeleteProject />,
    },
    {
      path: "/upload-publication",
      element: <UploadPublication />,
    },
    {
      path: "/manage-publications",
      element: <ManagePublications />,
    },
    {
      path: "/preview-publication/:id",
      element: <PreviewPublication />,
    },
    {
      path: "/update-publication/:id",
      element: <UpdatePublication />,
    },
    {
      path: "/delete-publication/:id",
      element: <DeletePublication />,
    },
  ];

  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes  */}
            {publicRoutes.map((item, index) => (
              <Route key={index} path={item.path} element={item.element} />
            ))}

            {/* Private Routes  */}
            <Route
              path="/admin-panel"
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              {privateRoutes.map((item, index) => (
                <Route
                  key={index}
                  path={`/admin-panel/${item.path}`}
                  element={item.element}
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
