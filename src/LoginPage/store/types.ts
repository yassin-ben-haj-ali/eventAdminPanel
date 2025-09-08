import type { User } from "@/UsersPage/store/types";

type MyUserState = {
	authenticationResult: User | null;
	setUser: (user: User | null) => void;
};
export type MyUserSlice = {
	myUser: MyUserState;
};
