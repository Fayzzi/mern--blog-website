import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { userLoading, isAuthenticated } = useSelector((state) => state.user);
  if (userLoading) {
    return <div>Loading....</div>;
  }
  if (!isAuthenticated && !userLoading) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoutes;
