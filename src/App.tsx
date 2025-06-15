import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/dashboard";
import SharedBrain from "./Pages/SharedBrain"

function App() {
  return (
    <Routes>
      {/* Defining the routes for each page of the application */}
      <Route path="/signup" element={<Signup />} />{" "}
      {/* Route for signup page */}
      <Route path="/signin" element={<Signin />} />{" "}
      {/* Route for signin page */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/share/:shareLink" element={<SharedBrain/>}/>
      {/* Route for dashboard page */}
    </Routes>
  );
}

export default App;
