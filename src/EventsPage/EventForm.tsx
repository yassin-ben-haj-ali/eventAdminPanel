import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { EventSchema } from "./types";
import CustomInput from "@/components/ui/CustomInput";

type EventFormProps = {
	id?: string;
	editMode: boolean;
};
const EventForm: React.FC<EventFormProps> = ({ editMode }) => {
	const form = useForm({
		resolver: zodResolver(EventSchema),
	});
	const { handleSubmit, register } = form;

	const onSubmit = () => {};

	return (
		<Dialog>
			<DialogTrigger>
				{editMode ? <Button>Edit Event</Button> : <Button>Add event</Button>}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="space-y-6">
					<DialogTitle>Ajouter un événement</DialogTitle>
					<DialogDescription>
						<form className="space-y-6" onSubmit={(e) => handleSubmit(onSubmit)(e)}>
							<CustomInput
								label="title"
								placeholder="entrer le titre d'événement"
								required={true}
								{...register("title")}
							/>
							<CustomInput
								label="title"
								placeholder="entrer le titre d'événement"
								{...register("title")}
							/>
							<CustomInput
								label="location"
								placeholder="entrer l'emplacement d'événement"
								{...register("location")}
								required={true}
							/>
						</form>
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex items-center">
					<Button variant={"outline"}>Annuler</Button>
					<Button type="submit">Valider</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EventForm;
