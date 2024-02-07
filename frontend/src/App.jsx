import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import About from "./Pages/About/About";
import Projects from "./Pages/Projects/Projects";
function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<Projects />} path="/projects" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Dashboard />} path="/dashboard" />
      </Route>
    </Routes>
  );
}

export default App;
