import { registrationSlice } from "@/EventDetails/store/RegistratonSlice";
import type { RegistrationSlice } from "@/EventDetails/store/types";
import { eventsSlice } from "@/EventsPage/store/EventsSlice";
import type { EventsSlice } from "@/EventsPage/store/types";
import type { MyUserSlice } from "@/LoginPage/store/types";
import { myUserSlice } from "@/LoginPage/store/userSlice";
import type { UsersSlice } from "@/UsersPage/store/types";
import { usersSlice } from "@/UsersPage/store/UsersSlice";
import { create } from "zustand";

export const useStore = create<UsersSlice & MyUserSlice & EventsSlice & RegistrationSlice>(
	(...a) => ({
		...usersSlice(...a),
		...myUserSlice(...a),
		...eventsSlice(...a),
		...registrationSlice(...a),
	})
);
