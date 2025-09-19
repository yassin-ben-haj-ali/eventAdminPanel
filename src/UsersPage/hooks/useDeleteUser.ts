import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useStore } from "@/store/store";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { AxiosInstance } from "axios";

const deleteUser = async (id: string, axiosPrivate: AxiosInstance) => {
	const response = await axiosPrivate.delete(`/user/${id}`);
	return response.data;
};

const useDeleteUser = () => {
	const users = useStore((state) => state.user.users);
	const setUsers = useStore((state) => state.user.setUsers);
	const [deleteModalState, setDeleteModalState] = useState<{
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

	const handleCloseDeleteModal = () => {
		setDeleteModalState((prev) => ({ ...prev, isOpen: false }));
	};
	const axiosPrivate = useAxiosPrivate();
	const deleteUserMutation = useMutation({
		mutationFn: (id: string) => deleteUser(id, axiosPrivate),
		onSuccess: (data) => {
			setDeleteModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "success delete user",
			});
			const updatedUsers = users.filter((user) => user.id !== data.id);
			setUsers(updatedUsers);
		},
		onError: () => {
			setDeleteModalState({
				isOpen: true,
				type: "error",
				title: "Erreur",
				description: "error",
			});
		},
	});

	const handleDeleteUser = async (id: string) => {
		await deleteUserMutation.mutateAsync(id);
	};

	return {
		handleDeleteUser,
		deleteModalState,
		handleCloseDeleteModal,
		isPending: deleteUserMutation.isPending,
	};
};

export default useDeleteUser;
