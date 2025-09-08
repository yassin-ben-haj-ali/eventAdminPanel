import { useStore } from "@/store/store";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
	const auth = useStore((state) => state.myUser.authenticationResult);
	const location = useLocation();
	return auth ? <Outlet /> : <Navigate to="login" state={{ from: location }} replace />;
};

export default RequireAuth;
