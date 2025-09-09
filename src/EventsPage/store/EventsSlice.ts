import type { StateCreator } from "zustand";
import type { EventsSlice } from "./types";

const initialState = {
	events: [],
	searchFilter: "",
};

export const eventsSlice: StateCreator<EventsSlice> = (set) => ({
	event: {
		...initialState,
		setEvents: (events) =>
			set((state) => ({
				event: {
					...state.event,
					events,
				},
			})),
		setSearchFilter: (searchFilter: string) =>
			set((state) => ({
				event: {
					...state.event,
					searchFilter,
				},
			})),
	},
});
