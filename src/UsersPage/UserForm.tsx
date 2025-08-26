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
import { userSchema } from "./types";
import CustomInput from "@/components/ui/CustomInput";

type UserFormProps = {
	id?: string;
	editMode: boolean;
};
const UserForm: React.FC<UserFormProps> = ({ editMode }) => {
	const form = useForm({
		resolver: zodResolver(userSchema),
	});
	const { handleSubmit, register, formState } = form;
	const { errors } = formState;

	const onSubmit = () => {};

	return (
		<Dialog>
			<DialogTrigger>
				{editMode ? <Button>Edit User</Button> : <Button>Add User</Button>}
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
