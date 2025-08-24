import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import Layout from "./Layout";
import HomePage from "./HomePage/HomePage";
import UsersPage from "./UsersPage/UsersPage";
import EventsPage from "./EventsPage/EventsPage";
const AppRoutes = () => {
	return (
		<Routes>
			<Route path="login" element={<LoginPage />} />
			<Route element={<Layout />}>
				<Route path="/home" element={<HomePage />} />
				<Route path="/users" element={<UsersPage />} />
				<Route path="/events" element={<EventsPage />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
