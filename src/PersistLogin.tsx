import { Outlet } from "react-router-dom";
import Loader from "./components/ui/Loader/Loader";
import { useEffect, useState } from "react";
import useGetActiveUser from "./LoginPage/hooks/useGetActiveUser";

const PersistLogin = () => {
	const getActiveUser = useGetActiveUser();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const activeUser = async () => {
			try {
				await getActiveUser();
			} finally {
				setIsLoading(false);
			}
		};

		activeUser();
	}, [getActiveUser]);
	return (
		<>
			{isLoading ? (
				<Loader className="flex h-full w-full items-center justify-center" />
			) : (
				<Outlet />
			)}
		</>
	);
};

export default PersistLogin;
