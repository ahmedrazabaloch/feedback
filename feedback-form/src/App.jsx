// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Login from './pages/Login';
// import SignUp from './pages/Register';
// import FeedbackForm from './pages/FeedbackForm';
// import Dashboard from './pages/AdminDashboard';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/feedback" element={<FeedbackForm />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* Add other routes here */}
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
// src/App.jsx
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import FeedbackForm from "./pages/FeedbackForm";
import Dashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/feedback"
            element={<PrivateRoute element={<FeedbackForm />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
