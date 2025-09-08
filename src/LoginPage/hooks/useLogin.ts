import axios from "@/api/axios";
import type { LoginSchemaType } from "../types";
import { useMutation } from "@tanstack/react-query";
import type { User } from "@/UsersPage/store/types";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";

type loginResponse = {
	message: string;
	data: User;
};

const loginUser = async (data: LoginSchemaType): Promise<loginResponse> => {
	const res = await axios.post("/auth/login", data);
	return res.data;
};

const useLogin = () => {
	const navigate = useNavigate();
	const setUser = useStore((state) => state.myUser.setUser);
	return useMutation({
		mutationFn: async (data: LoginSchemaType) => await loginUser(data),
		onSuccess: (data) => {
			setUser(data.data);
			navigate("/");
		},
	});
};
export default useLogin;
