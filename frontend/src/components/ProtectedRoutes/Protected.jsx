import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoutes = ({ children }) => {
  const { userLoading, isAuthenticated } = useSelector((state) => state.user);
  if (userLoading) {
    return <Loader />;
  }
  if (!isAuthenticated && !userLoading) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoutes;
