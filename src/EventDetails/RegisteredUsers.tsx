import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import ViewUserInfo from "@/UsersPage/ViewUserInfo";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader/Loader";
import { useStore } from "@/store/store";
import useGetEventRegistrations from "./hooks/useGetEventRegistrations";
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
const RegisteredUsersTable = () => {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const getRegistrationsQuery = useGetEventRegistrations({
		enabled: false,
		filters: [
			{
				optionName: "reservation",
				filterKey: "eventRegistration",
				filterValue: "test",
				customFilter: ``,
			},
		],
	});
	const registrations = useStore((state) => state.registration.registrations);
	useEffect(() => {
		if (inView && getRegistrationsQuery.hasNextPage) {
			getRegistrationsQuery.fetchNextPage();
		}
	}, [inView, getRegistrationsQuery.hasNextPage, getRegistrationsQuery.fetchNextPage]);
	const registrationsRows = registrations.map((registration) => {
		return (
			<TableRow key={registration.id}>
				<TableCell className="text-center font-medium">
					<ViewUserInfo data={registration.user} />
				</TableCell>
				<TableCell className="text-center font-medium">{registration.user.firstName}</TableCell>
				<TableCell className="text-center font-medium">{registration.user.lastName}</TableCell>
				<TableCell className="text-center font-medium">{registration.user.email}</TableCell>
				<TableCell className="text-center font-medium">
					{registration.user.role === "USER" ? "Employée" : "Organisateur"}
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
					getRegistrationsQuery.isLoading ? (
						<TableRow>
							<TableCell colSpan={headers.length + 1}>
								<Loader className="flex w-full items-center justify-center" />
							</TableCell>
						</TableRow>
					) : (
						<>
							{registrationsRows}
							<TableRow ref={ref}>
								<TableCell colSpan={headers.length + 1} className="h-full">
									{getRegistrationsQuery.isFetchingNextPage && (
										<Loader className="flex w-full items-center justify-center" />
									)}
								</TableCell>
							</TableRow>
						</>
					)
				}
				filterType="registration"
				hasData={getRegistrationsQuery.isLoading || registrations?.length > 0}
			/>
		</>
	);
};

export default RegisteredUsersTable;
