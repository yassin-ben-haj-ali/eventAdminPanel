import type { Event } from "@/EventsPage/store/types";
import type { User } from "@/UsersPage/store/types";

export type Registration = {
	userId: string;
	eventId: string;
	user: User;
	event: Event;
	id: string;
	status: string;
};
export type EventRegistrationToUpdate = {
	userId?: string;
	eventId?: string;
	user?: User;
	event?: Event;
	id?: string;
	status?: string;
	onClick?: () => void;
};

export type RegistrationSlice = {
	registration: {
		registrations: Registration[];
		setRegistrations: (registrations: Registration[]) => void;
	};
};
