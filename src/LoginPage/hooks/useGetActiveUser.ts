import axios from "@/api/axios";
import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useGetActiveUser = () => {
	const setUser = useStore((state) => state.myUser.setUser);
	const navigate = useNavigate();

	const { mutateAsync: getActiveUser } = useMutation({
		mutationFn: async () => {
			try {
				const response = await axios.get("/auth/active");
				setUser(response.data);
				return response.data;
			} catch (error: unknown) {
				setUser(null);
				localStorage.removeItem("authenticated");
				navigate("/login");
				throw error;
			}
		},
		retry: false,
	});

	return getActiveUser;
};

export default useGetActiveUser;
