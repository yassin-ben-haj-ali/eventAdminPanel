export type User = {
	firstName: string;
	lastName: string;
	email: string;
	id: string;
	role: string;
};

export type FilterType = "user";

export type TableFilter = {
	optionName: string;
	filterKey: string;
	filterValue: string;
	customFilter?: string;
	customOrder?: string;
};

export type TableFilters = {
	user: TableFilter[];
};

export type UsersSlice = {
	user: {
		users: User[];
		setUsers: (users: User[]) => void;
		tableFilters: TableFilters;
		setTableFilters: (table: keyof TableFilters, filters: TableFilter[]) => void;
		searchFilter: string;
		setSearchFilter: (keyword: string) => void;
	};
};
