import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { Event } from "../store/types";

export type EventPayload = {
	name: string;
	description: string;
	location: string;
	date: Date;
};

const createEvent = async (payload: EventPayload, axiosPrivate: AxiosInstance): Promise<Event> => {
	const response = await axiosPrivate.post("/event", payload);
	return response.data;
};
const useCreateEvent = () => {
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
	const createEventMutation = useMutation({
		mutationFn: (payload: EventPayload) => createEvent(payload, axiosPrivate),
		onSuccess: async () => {
			queryClient.invalidateQueries({
				queryKey: ["events"],
			});
			setCreateModalState({
				isOpen: true,
				type: "success",
				title: "Succès",
				description: "event created successfully",
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
	const handleCreateEvent = async (payload: EventPayload) => {
		await createEventMutation.mutateAsync(payload);
	};
	return {
		handleCreateEvent,
		createModalState,
		setCreateModalState,
		isLoading: createEventMutation.isPending,
	};
};

export default useCreateEvent;
