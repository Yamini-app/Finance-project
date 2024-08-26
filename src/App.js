import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  <ToastContainer/>  
  </BrowserRouter>

  );
}

export default App;

