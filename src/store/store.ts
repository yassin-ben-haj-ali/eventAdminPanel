import type { UsersSlice } from "@/UsersPage/store/types";
import { usersSlice } from "@/UsersPage/store/UsersSlice";
import { create } from "zustand";

export const useStore = create<UsersSlice>((...a) => ({
	...usersSlice(...a),
}));
