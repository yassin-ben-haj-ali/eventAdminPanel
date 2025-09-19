import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { EventRegistrationToUpdate } from "../store/types";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const editEventRegistration = async (
	payload: { id: string; registration: EventRegistrationToUpdate },
	axiosPrivate: AxiosInstance
) => {
	const response = await axiosPrivate.patch(`/registration/${payload.id}`, payload.registration);
	return response.data;
};

const useEditEventRegistration = () => {
	const [modalState, setModalState] = useState<{
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

	const handleModal = (isOpen: boolean) => {
		setModalState((prev) => ({ ...prev, isOpen: isOpen }));
	};
	const axiosPrivate = useAxiosPrivate();
	const queryClient = useQueryClient();
	const editEventRegistrationMutation = useMutation({
		mutationFn: (payload: { id: string; registration: EventRegistrationToUpdate }) =>
			editEventRegistration(payload, axiosPrivate),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["registrations"] });
			setModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "success",
			});
		},
		onError: () => {
			setModalState({
				isOpen: true,
				type: "error",
				title: "Erreur",
				description: "Error",
			});
		},
	});

	const handleEditEventRegistration = async (
		id: string,
		registration: EventRegistrationToUpdate
	) => {
		await editEventRegistrationMutation.mutateAsync({ id, registration });
	};

	return {
		handleEditEventRegistration,
		modalState,
		handleModal,
		isLoading: editEventRegistrationMutation.isPending,
	};
};

export default useEditEventRegistration;
