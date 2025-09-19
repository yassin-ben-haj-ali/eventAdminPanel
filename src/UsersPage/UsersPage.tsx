import CustomInput from "@/components/ui/CustomInput";
import UsersLayout from "./UsersPageLayout";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import { useStore } from "@/store/store";

const UsersPage = () => {
	const searchFilter = useStore((state) => state.user.setSearchFilter);
	return (
		<UsersLayout>
			<div className="flex flex-col space-y-10">
				<div className="flex items-center justify-end gap-4">
					<CustomInput
						onChange={(e) => searchFilter(e.target.value)}
						placeholder="Rechercher un utilisateur"
					/>
					<UserForm editMode={false} />
				</div>
				<div>
					<UsersTable />
				</div>
			</div>
		</UsersLayout>
	);
};

export default UsersPage;
