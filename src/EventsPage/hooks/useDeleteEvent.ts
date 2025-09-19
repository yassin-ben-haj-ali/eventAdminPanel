import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useStore } from "@/store/store";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { AxiosInstance } from "axios";

const deleteEvent = async (id: string, axiosPrivate: AxiosInstance) => {
	const response = await axiosPrivate.delete(`/event/${id}`);
	return response.data;
};

const useDeleteEvent = () => {
	const events = useStore((state) => state.event.events);
	const setEvents = useStore((state) => state.event.setEvents);
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
	const deleteEventMutation = useMutation({
		mutationFn: (id: string) => deleteEvent(id, axiosPrivate),
		onSuccess: (data) => {
			setDeleteModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "success delete event",
			});
			const updatedEvents = events.filter((event) => event.id !== data.id);
			setEvents(updatedEvents);
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

	const handleDeleteEvent = async (id: string) => {
		await deleteEventMutation.mutateAsync(id);
	};

	return {
		handleDeleteEvent,
		deleteModalState,
		handleCloseDeleteModal,
		isPending: deleteEventMutation.isPending,
	};
};

export default useDeleteEvent;
