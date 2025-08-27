import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";

const headers = [
	{
		optionName: "firstName",
		headerTitle: "nom",
		filterParams: {
			hideOrder: true,
		},
	},
	{
		optionName: "lastName",
		headerTitle: "Prénom",
		filterParams: {
			hideOrder: true,
		},
	},
	{
		optionName: "email",
		headerTitle: "Email",
		filterParams: {
			hideOrder: true,
			hideSearch: true,
		},
	},
	{
		optionName: "role",
		headerTitle: "Rôle",
		filterParams: {
			hideOrder: true,
		},
	},
];

const users = [
	{
		id: "1",
		firstName: "yassine",
		lastName: "ben haj ali",
		email: "yassin@yopmail.com",
		role: "Organisateur",
	},
	{
		id: "2",
		firstName: "foulen",
		lastName: "ben foulen",
		email: "foulen@yopmail.com",
		role: "Employée",
	},
	{
		id: "3",
		firstName: "mouhamed ali",
		lastName: "ben salem",
		email: "mouhamed@yopmail.com",
		role: "Employée",
	},
];

const UsersTable = () => {
	const usersRows = users.map((user) => {
		return (
			<TableRow key={user?.id}>
				<TableCell className="text-center font-medium">{user.firstName}</TableCell>
				<TableCell className="text-center font-medium">{user.lastName}</TableCell>
				<TableCell className="text-center font-medium">{user.email}</TableCell>
				<TableCell className="text-center font-medium">{user.role}</TableCell>
			</TableRow>
		);
	});

	return (
		<>
			<CustomTable
				headers={headers}
				hideActions={true}
				data={<>{usersRows}</>}
				filterType="user"
				hasData={true}
			/>
		</>
	);
};

export default UsersTable;
