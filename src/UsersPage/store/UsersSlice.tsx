import type { StateCreator } from "zustand";
import type { TableFilter, TableFilters, UsersSlice } from "./types";

const initialState = {
	users: [],
	tableFilters: {
		user: [],
	},
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
		setTableFilters: (table: keyof TableFilters, filters: TableFilter[]) =>
			set((state) => ({
				user: {
					...state.user,
					tableFilters: {
						...state.user.tableFilters,
						[table]: filters,
					},
				},
			})),
	},
});
