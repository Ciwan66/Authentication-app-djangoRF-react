import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Routes, Route , useLocation } from "react-router-dom";

function App() {
  const location = useLocation()
  const noNavBar = location.pathname === "/" || location.pathname === "/register"
  return (
    <>
      {
        noNavBar?
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        :
        <Navbar
        content={
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        }
      />
      }

    </>
  );
}

export default App;
