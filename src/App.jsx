/* 
Project: CBS Research Group Admin Dashboard
Content: Application routing setup
Date: 29/08/2024 
*/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/sign-in/SignIn";
import AdminPanel from "./pages/admin-panel/AdminPanel";
import Dashboard from "./pages/dashboard/Dashboard";
import { AuthProvider } from "./authentication/auth-context/AuthContext";
import PrivateRoute from "./private/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
