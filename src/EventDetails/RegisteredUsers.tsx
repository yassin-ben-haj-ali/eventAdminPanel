import CustomTable from "@/components/ui/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import ViewUserInfo from "@/UsersPage/ViewUserInfo";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader/Loader";
import { useStore } from "@/store/store";
import useGetEventRegistrations from "./hooks/useGetEventRegistrations";
import { useParams } from "react-router-dom";
import useEditEventRegistration from "./hooks/useEditEventRegistration";
import ConfirmModal from "@/layouts/ConfirmModal";
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
];
const RegisteredUsersTable = () => {
	const params = useParams();
	const eventId = params.id;
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const { handleEditEventRegistration, isLoading } = useEditEventRegistration();
	const getRegistrationsQuery = useGetEventRegistrations(eventId, { enabled: !!eventId });
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
				<TableCell className="flex items-center justify-center">
					{registration.status === "PENDING" && (
						<ConfirmModal
							/* @ts-ignore */
							type="active"
							name="User Modal"
							title={"confirmer la présence"}
							description={"Êtes-vous sûr de vouloir confirmer la présence de cet utilisateur ?"}
							handleConfirm={() =>
								handleEditEventRegistration(registration.id, { status: "CONFIRMED" })
							}
							isLoading={isLoading}
						/>
					)}
				</TableCell>
			</TableRow>
		);
	});

	return (
		<>
			<CustomTable
				headers={headers}
				hideActions={false}
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
