import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ redirectPath = "/home" }) => {
  const { isAuth } = useSelector((store) => store.auth);
  if (isAuth) return <Navigate to={redirectPath} />;
  return <Outlet />;
};

export default PublicRoutes;