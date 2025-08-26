import type { StateCreator } from "zustand";
import type { UsersSlice } from "./types";

const initialState = {
	users: [],
};

export const usersSlice: StateCreator<UsersSlice> = (set) => ({
	user: {
		...initialState,
		setUsers: (users) =>
			set((state) => ({
				user: {
					...state.user,
					users,
				},
			})),
	},
});
