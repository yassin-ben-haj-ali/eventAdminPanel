type User = {
	firstName: string;
	lastName: string;
	email: string;
	id: string;
};

export type UsersSlice = {
	user: {
		users: User[];
		setUsers: (users: User[]) => void;
	};
};
