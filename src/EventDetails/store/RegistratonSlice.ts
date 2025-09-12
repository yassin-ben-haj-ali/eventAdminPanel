import type { StateCreator } from "zustand";
import type { RegistrationSlice } from "./types";

const initialState = {
	registrations: [],
};

export const registrationSlice: StateCreator<RegistrationSlice> = (set) => ({
	registration: {
		...initialState,
		setRegistrations: (registrations) =>
			set((state) => ({
				registration: {
					...state.registration,
					registrations,
				},
			})),
	},
});
