import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { EventToUpdate } from "../store/types";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const editEvent = async (
	payload: { id: string; event: EventToUpdate },
	axiosPrivate: AxiosInstance
) => {
	const response = await axiosPrivate.patch(`/event/${payload.id}`, payload.event);
	return response.data;
};

const useEditEvent = () => {
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
	const editEventMutation = useMutation({
		mutationFn: (payload: { id: string; event: EventToUpdate }) => editEvent(payload, axiosPrivate),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["events"] });
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

	const handleEditEvent = async (id: string, event: EventToUpdate) => {
		await editEventMutation.mutateAsync({ id, event });
	};

	return {
		handleEditEvent,
		modalState,
		handleModal,
		isLoading: editEventMutation.isPending,
	};
};

export default useEditEvent;
