import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { userSchema, type UserSchemaType } from "./types";
import CustomInput from "@/components/ui/CustomInput";
import useCreateUser from "./hooks/useCreateUser";
import { useEffect, useState } from "react";
import CustomSelect from "@/components/ui/CustomSelect";

type UserFormProps = {
	id?: string;
	editMode: boolean;
};
const roleOptions = [
	{ label: "Employé", value: "USER" },
	{ label: "Organisateur", value: "ADMIN" },
];
const UserForm: React.FC<UserFormProps> = ({ editMode }) => {
	const form = useForm({
		resolver: zodResolver(userSchema),
	});
	const [isOpen, setIsOpen] = useState(false);
	const { handleSubmit, register, formState, reset, setValue, watch } = form;
	const { errors } = formState;
	const { handleCreateUser } = useCreateUser();

	const onSubmit = async (values: UserSchemaType) => {
		await handleCreateUser(values);
		setIsOpen(false);
	};
	useEffect(() => {
		reset();
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				{editMode ? <Button>Edit User</Button> : <Button>Ajouter un Utilisateur</Button>}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="space-y-6">
					<DialogTitle>Ajouter un utilisateur</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<CustomInput
								label="Prénom"
								placeholder="Entrez votre prénom"
								type="text"
								{...register("firstName")}
								error={errors.firstName?.message}
								required
							/>
							<CustomInput
								label="Nom"
								placeholder="Entrez votre nom"
								type="text"
								{...register("lastName")}
								error={errors.lastName?.message}
								required
							/>
						</div>
						<CustomSelect
							options={roleOptions}
							setValue={(role) => {
								setValue("role", role);
							}}
							value={watch("role")}
							label="rôle"
							placeholder="choisir un rôle"
							required
							error={errors?.role?.message}
						/>
						<CustomInput
							label="Email"
							placeholder="Entrez votre email"
							type="email"
							{...register("email")}
							error={errors.email?.message}
							required
						/>
						<div className="grid grid-cols-2 gap-4">
							<CustomInput
								label="Mot de passe"
								placeholder="Entrez votre mot de passe"
								type="password"
								passwordInput
								{...register("password")}
								error={errors.password?.message}
								required
							/>
							<CustomInput
								label="Confirmer le mot de passe"
								placeholder="Confirmez votre mot de passe"
								type="password"
								passwordInput
								{...register("confirmPassword")}
								error={errors.confirmPassword?.message}
								required
							/>
						</div>
					</div>
					<DialogFooter className="flex items-center">
						<Button variant={"outline"} type="button">
							Annuler
						</Button>
						<Button type="submit">Valider</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UserForm;
