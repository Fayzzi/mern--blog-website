import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, userLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  if (userLoading) {
    return <div>Loading....</div>;
  } else if (!isAuthenticated && !userLoading) {
    <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
