/* 
Project: CBS Research Group Admin Dashboard
Content: Common alert model style
Date: 29/08/2024 
*/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./app-context/AppContext";
import { AuthProvider } from "./authentication/auth-context/AuthContext";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./utils/common-loading-spinner/LoadingSpinner";
import Index from ".";
import PrivateRoute from "./private/PrivateRoute";
import AdminPanel from "./AdminPanel";
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import ManageAdminAccounts from "./pages/manage-admin-account/ManageAdminAccounts";
import DeleteAdminAccount from "./pages/manage-admin-account/DeleteAdminAccount";

const ForgotPassword = lazy(() =>
  import("./pages/forgot-password/ForgotPassword")
);
const ResetForgottenPassword = lazy(() =>
  import("./pages/reset-forgotten-password/ResetForgottenPassword")
);
const AdminRegReq = lazy(() =>
  import("./pages/send-admin-reg-request/AdminRegReq")
);
const RegisterAdmin = lazy(() =>
  import("./pages/register-admin/RegisterAdmin")
);
const PasswordChange = lazy(() =>
  import("./pages/password-change/PasswordChange")
);
const ApproveRequest = lazy(() =>
  import("./pages/approve-request/ApproveRequest")
);
const ManageAdminRequests = lazy(() =>
  import("./pages/manage-admin-requests/ManageAdminRequests")
);
const RejectRequests = lazy(() =>
  import("./pages/reject-request/RejectRequests")
);

const DeleteRequest = lazy(() =>
  import("./pages/delete-request/DeleteRequest")
);
const UploadMastersAlumni = lazy(() =>
  import("./pages/master-alumni/UploadMastersAlumni")
);
const ManageMastersAlumni = lazy(() =>
  import("./pages/master-alumni/ManageMastersAlumni")
);
const PreviewMastersAlumni = lazy(() =>
  import("./pages/master-alumni/PreviewMastersAlumni")
);
const UpdateMastersAlumni = lazy(() =>
  import("./pages/master-alumni/UpdateMastersAlumni")
);
const DeleteMastersAlumni = lazy(() =>
  import("./pages/master-alumni/DeleteMastersAlumni")
);
const UploadDoctorateAlumni = lazy(() =>
  import("./pages/doctorate-alumni/UploadDoctorateAlumni")
);
const ManageDoctorateAlumni = lazy(() =>
  import("./pages/doctorate-alumni/ManageDoctorateAlumni")
);
const UpdateDoctotateAlumni = lazy(() =>
  import("./pages/doctorate-alumni/UpdateDoctotateAlumni")
);
const DeleteDoctorateAlumni = lazy(() =>
  import("./pages/doctorate-alumni/DeleteDoctorateAlumni")
);
const PreviewDoctorateAlumni = lazy(() =>
  import("./pages/doctorate-alumni/PreviewDoctorateAlumni")
);
const UploadMscMember = lazy(() =>
  import("./pages/msc-members/UploadMscMember")
);
const ManageMscMembers = lazy(() =>
  import("./pages/msc-members/ManageMscMembers")
);
const PreviewMscMember = lazy(() =>
  import("./pages/msc-members/PreviewMscMember")
);
const UpdateMscMember = lazy(() =>
  import("./pages/msc-members/UpdateMscMember")
);
const DeleteMscMember = lazy(() =>
  import("./pages/msc-members/DeleteMscMember")
);
const UploadPhdMember = lazy(() =>
  import("./pages/phd-members/UploadPhdMember")
);
const ManagePhdMembers = lazy(() =>
  import("./pages/phd-members/ManagePhdMembers")
);

const PreviewPhdMember = lazy(() =>
  import("./pages/phd-members/PreviewPhdMember")
);
const UpdatePhdMember = lazy(() =>
  import("./pages/phd-members/UpdatePhdMember")
);
const DeletePhdMember = lazy(() =>
  import("./pages/phd-members/DeletePhdMember")
);
const UploadPersonalAward = lazy(() =>
  import("./pages/personal-awards/UploadPersonalAward")
);
const ManagePersonalAwards = lazy(() =>
  import("./pages/personal-awards/ManagePersonalAwards")
);
const UpdatePersonalAward = lazy(() =>
  import("./pages/personal-awards/UpdatePersonalAward")
);
const DeletePersonalAward = lazy(() =>
  import("./pages/personal-awards/DeletePersonalAward")
);
const UploadTeamAward = lazy(() =>
  import("./pages/team-awards/UploadTeamAward")
);
const ManageTeamAwards = lazy(() =>
  import("./pages/team-awards/ManageTeamAwards")
);
const UpdateTeamAward = lazy(() =>
  import("./pages/team-awards/UpdateTeamAward")
);
const DeleteTeamAward = lazy(() =>
  import("./pages/team-awards/DeleteTeamAward")
);
const UploadLabInstrument = lazy(() =>
  import("./pages/lab-instruments/UploadLabInstrument")
);
const ManageLabInstruments = lazy(() =>
  import("./pages/lab-instruments/ManageLabInstruments")
);
const UpdateLabInstrument = lazy(() =>
  import("./pages/lab-instruments/UpdateLabInstrument")
);
const DeleteLabInstrument = lazy(() =>
  import("./pages/lab-instruments/DeleteLabInstrument")
);
const UploadGroupnews = lazy(() =>
  import("./pages/group-news/UploadGroupnews")
);
const ManageGroupnews = lazy(() =>
  import("./pages/group-news/ManageGroupnews")
);
const UpdateGroupnews = lazy(() =>
  import("./pages/group-news/UpdateGroupnews")
);
const DeleteGroupnews = lazy(() =>
  import("./pages/group-news/DeleteGroupnews")
);

const ManageContacts = lazy(() =>
  import("./pages/contact-info/ManageContacts")
);
const DeleteContactInfo = lazy(() =>
  import("./pages/contact-info/DeleteContactInfo")
);
const PreviewContactInfo = lazy(() =>
  import("./pages/contact-info/PreviewContactInfo")
);
const SendApplicationResponse = lazy(() =>
  import("./pages/contact-info/SendApplicationResponse")
);
const UploadProject = lazy(() => import("./pages/projects/UploadProject"));

const ManagePublications = lazy(() =>
  import("./pages/publications/ManagePublications")
);
const UploadPublication = lazy(() =>
  import("./pages/publications/UploadPublication")
);
const DeleteProject = lazy(() => import("./pages/projects/DeleteProject"));
const UpdateProject = lazy(() => import("./pages/projects/UpdateProject"));
const ManageProjects = lazy(() => import("./pages/projects/ManageProjects"));
const DeletePublication = lazy(() =>
  import("./pages/publications/DeletePublication")
);
const UpdatePublication = lazy(() =>
  import("./pages/publications/UpdatePublication")
);
const PreviewPublication = lazy(() =>
  import("./pages/publications/PreviewPublication")
);

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
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "/reset-password/:id/:token",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ResetForgottenPassword />
        </Suspense>
      ),
    },
    {
      path: "/become-admin-request",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AdminRegReq />
        </Suspense>
      ),
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
    {
      path: "/manage-admin-accounts",
      element: <ManageAdminAccounts />,
    },
    {
      path: "/deactivate-admin-account/:id",
      element: <DeleteAdminAccount />,
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
                  element={
                    <Suspense fallback={<LoadingSpinner />}>
                      {item.element}
                    </Suspense>
                  }
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
