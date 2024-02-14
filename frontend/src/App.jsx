import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import About from "./Pages/About/About";
import Projects from "./Pages/Projects/Projects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActivateUser from "./Pages/ActivationPagr/ActivateUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUser } from "./components/Redux/Reducers/UserReducers";
import ProtectedRoutes from "./components/ProtectedRoutes/Protected";
function App() {
  const dispatch = useDispatch();
  const { user, userLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(GetUser());
  }, [dispatch]);
  console.log(user);
  return (
    <>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Projects />} path="/projects" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            element={<ActivateUser />}
            path="/activation/:activationtoken"
          />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
