import CustomInput from "@/components/ui/CustomInput";
import UsersLayout from "./UsersPageLayout";
import { useState } from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

const UsersPage = () => {
	const [search, setSearch] = useState("");
	return (
		<UsersLayout>
			<div className="flex flex-col space-y-10">
				<div className="flex items-center justify-end gap-4">
					<CustomInput
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Rechercher un organisateur"
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
