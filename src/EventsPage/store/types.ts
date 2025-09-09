export type Event = {
	id: string;
	name: string;
	description: string;
	date: string;
	location: string;
	status: string;
};

export type EventsSlice = {
	event: {
		events: Event[];
		setEvents: (events: Event[]) => void;
		searchFilter: string;
		setSearchFilter: (keyword: string) => void;
	};
};
