import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const AdminPrivate = ({ children }) => {
  const { userLoading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  if (userLoading) {
    return <Loader />;
  }
  if (!isAuthenticated && !userLoading) {
    return <Navigate to={"/"} />;
  }

  return user?.isAdmin ? children : <Navigate to={"/"} />;
};

export default AdminPrivate;
