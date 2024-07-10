import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import About from "./components/About";
import  PasswordReset  from "./components/PasswordReset";
import PasswordResetRequest from "./components/PasswordResetRequest";
import ProtectedRouter from "./components/ProtectedRoutes";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const noNavBar =
  location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")  
  return (
    <>
      {noNavBar ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordResetRequest />} />
          <Route path="/password-reset/:token" element={<PasswordReset />} />
        </Routes>
      ) : (
        <Navbar
          content={
            <Routes>
              <Route element={<ProtectedRouter/>}>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          }
        />
      )}
    </>
  );
}

export default App;
