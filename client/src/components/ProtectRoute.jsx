import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoute() {
  const { user } = useSelector((state) => state.user);
  if (user) return <Outlet />;
  return <Navigate to="/login" />;
}
