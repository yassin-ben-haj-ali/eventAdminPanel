import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useStore } from "@/store/store";
import useGetActiveUser from "@/LoginPage/hooks/useGetActiveUser";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
	const { setUser } = useStore((state) => state.myUser);
	const getActiveUser = useGetActiveUser();
	const navigate = useNavigate();

	useEffect(() => {
		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;

				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					try {
						await getActiveUser();
						return axiosPrivate(prevRequest);
					} catch (authError) {
						setUser(null);
						navigate("/login", {
							replace: true,
							state: { from: window.location.pathname },
						});

						return Promise.reject(authError);
					}
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, []);

	return axiosPrivate;
};

export default useAxiosPrivate;
