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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="*" element={<SignIn />} />
          <Route
            path="/admin-panel"
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
