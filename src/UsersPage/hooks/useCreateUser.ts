import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { User } from "../store/types";

export type UserPayload = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

const createUser = async (payload: UserPayload, axiosPrivate: AxiosInstance): Promise<User> => {
	const response = await axiosPrivate.post("/user", payload);
	return response.data;
};
const useCreateUser = () => {
	const queryClient = useQueryClient();
	const [createModalState, setCreateModalState] = useState<{
		isOpen: boolean;
		type: "success" | "error";
		title: string;
		description: string;
	}>({
		isOpen: false,
		type: "success",
		title: "",
		description: "",
	});

	const axiosPrivate = useAxiosPrivate();
	const createUserMutation = useMutation({
		mutationFn: (payload: UserPayload) => createUser(payload, axiosPrivate),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
			setCreateModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "user created successfully",
			});
		},
		onError: () => {
			setCreateModalState({
				isOpen: true,
				type: "error",
				title: "Erreur",
				description: "error",
			});
		},
	});
	const handleCreateUser = async (payload: UserPayload) => {
		await createUserMutation.mutateAsync(payload);
	};
	return {
		handleCreateUser,
		createModalState,
		setCreateModalState,
		isLoading: createUserMutation.isPending,
	};
};

export default useCreateUser;
