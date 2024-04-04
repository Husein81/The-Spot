import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const AdminRoute = () => {
  const { currentUser } = useAuth();
  return (
    currentUser && currentUser.rest.isAdmin ? 
    (
        <Outlet/>
    ):(
        <Navigate to={'/sign-in'} replace />
    )
  )
}
export default AdminRoute