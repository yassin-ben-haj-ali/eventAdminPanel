import type { StateCreator } from "zustand";
import type { MyUserSlice } from "./types";

export const myUserSlice: StateCreator<MyUserSlice> = (set) => ({
	myUser: {
		authenticationResult: null,
		setUser: (user) =>
			set((state) => ({
				myUser: {
					...state.myUser,
					authenticationResult: user,
				},
			})),
	},
});
