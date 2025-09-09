import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import ViewUserInfo from "./ViewUserInfo";
import { useInView } from "react-intersection-observer";
import useGetUsers from "./hooks/useGetUsers";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader/Loader";
import { useStore } from "@/store/store";
const headers = [
	{
		optionName: "see",
		headerTitle: "Aperçus",
		filterParams: {
			hideOrder: true,
			hideSearch: true,
		},
	},
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
const UsersTable = () => {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const getUsersQuery = useGetUsers({
		enabled: true,
	});
	const users = useStore((state) => state.user.users);
	useEffect(() => {
		if (inView && getUsersQuery.hasNextPage) {
			getUsersQuery.fetchNextPage();
		}
	}, [inView, getUsersQuery.hasNextPage, getUsersQuery.fetchNextPage]);
	const usersRows = users.map((user) => {
		return (
			<TableRow key={user?.id}>
				<TableCell className="text-center font-medium">
					<ViewUserInfo data={user} />
				</TableCell>
				<TableCell className="text-center font-medium">{user.firstName}</TableCell>
				<TableCell className="text-center font-medium">{user.lastName}</TableCell>
				<TableCell className="text-center font-medium">{user.email}</TableCell>
				<TableCell className="text-center font-medium">
					{user.role === "USER" ? "Employée" : "Organisateur"}
				</TableCell>
			</TableRow>
		);
	});

	return (
		<>
			<CustomTable
				headers={headers}
				hideActions={true}
				data={
					getUsersQuery.isLoading ? (
						<TableRow>
							<TableCell colSpan={headers.length + 1}>
								<Loader className="flex w-full items-center justify-center" />
							</TableCell>
						</TableRow>
					) : (
						<>
							{usersRows}
							<TableRow ref={ref}>
								<TableCell colSpan={headers.length + 1} className="h-full">
									{getUsersQuery.isFetchingNextPage && (
										<Loader className="flex w-full items-center justify-center" />
									)}
								</TableCell>
							</TableRow>
						</>
					)
				}
				filterType="user"
				hasData={getUsersQuery.isLoading || users?.length > 0}
			/>
		</>
	);
};

export default UsersTable;
