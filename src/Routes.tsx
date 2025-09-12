import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import Layout from "./Layout";
import HomePage from "./HomePage/HomePage";
import UsersPage from "./UsersPage/UsersPage";
import EventsPage from "./EventsPage/EventsPage";
import PersistLogin from "./PersistLogin";
import RequireAuth from "./RequireAuth";
import EventsDetailsPage from "./EventDetails/EventsDetailsPage";
const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<PersistLogin />}>
				<Route path="login" element={<LoginPage />} />
			</Route>
			<Route element={<PersistLogin />}>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to="/home" replace />} />
					<Route element={<RequireAuth />}>
						<Route path="/home" element={<HomePage />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/events" element={<EventsPage />} />
						<Route path="/events/:id" element={<EventsDetailsPage />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
