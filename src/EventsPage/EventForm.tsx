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
import { EventSchema, type EventSchemaType } from "./types";
import CustomInput from "@/components/ui/CustomInput";
import { DateTimePicker } from "@/components/ui/DateTime";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "./hooks/useCreateEvent";
import type { EventToUpdate } from "./store/types";
import Loader from "@/components/ui/Loader/Loader";
import EditIcon from "@/assets/EditIcon";
import useEditEvent from "./hooks/useEditEvent";

type EventFormProps = {
	editMode: boolean;
	eventData?: EventToUpdate;
};
const EventForm: React.FC<EventFormProps> = ({ editMode, eventData }) => {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(EventSchema),
	});
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [time, setTime] = useState<string>("");
	const [dateError, setDateError] = useState<string>("");
	const { handleSubmit, register, reset, formState } = form;
	const { errors } = formState;
	const { isLoading, handleCreateEvent } = useCreateEvent();
	const { isLoading: isEditLoading, handleEditEvent } = useEditEvent();
	useEffect(() => {
		if (eventData) {
			reset({
				name: eventData.name,
				location: eventData.location,
				description: eventData.description || "",
			});
			if (eventData.date) {
				setDate(new Date(eventData.date));
				const hours = new Date(eventData.date).getHours().toString().padStart(2, "0");
				const minutes = new Date(eventData.date).getMinutes().toString().padStart(2, "0");
				setTime(`${hours}:${minutes}`);
			}
		} else {
			reset({
				name: "",
				location: "",
				description: "",
			});
			setDate(undefined);
			setTime("");
			setDateError("");
		}
	}, [isOpen, eventData, editMode, reset]);

	const checkDate = (date: Date | undefined, time: string) => {
		if (!date || !time) return "Date and time are required";

		const [hours, minutes] = time.split(":").map(Number);
		const dateTime = new Date(date);
		dateTime.setHours(hours, minutes, 0, 0);

		const today = new Date();
		if (dateTime < today) return "Event date cannot be in the past";

		return null;
	};

	const onSubmit = async (data: EventSchemaType) => {
		const dateValidationError = checkDate(date, time);
		if (dateValidationError) {
			setDateError(dateValidationError);
			return;
		}
		setDateError("");
		let dateTime;
		if (date && time) {
			const [hours, minutes] = time.split(":").map(Number);
			dateTime = new Date(date);
			dateTime.setHours(hours, minutes, 0, 0);
		}
		if (dateTime) {
			if (editMode && eventData) {
				await handleEditEvent(eventData.id, { ...data, date: dateTime, id: eventData.id });
			} else {
				await handleCreateEvent({ ...data, date: dateTime });
			}
		}
		setIsOpen(false);
	};

	const loading = editMode ? isLoading : isEditLoading;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>
				{editMode ? (
					<button type="button" className="cursor-pointer border p-1 focus:outline-none">
						<EditIcon />
					</button>
				) : (
					<Button type="button" className="px-[47px]" onClick={() => setIsOpen(true)}>
						Add event
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="space-y-6">
					<DialogTitle>Ajouter un événement</DialogTitle>
				</DialogHeader>
				<form
					className="space-y-6"
					onSubmit={(e) => {
						e.stopPropagation();
						handleSubmit(onSubmit)(e);
					}}
				>
					<CustomInput
						label="title"
						placeholder="entrer le titre d'événement"
						// required={true}
						{...register("name")}
						error={errors.name?.message}
					/>
					<div className="w-full">
						<DateTimePicker date={date} setDate={setDate} time={time} setTime={setTime} />
						{dateError && <p className="mt-1 text-sm text-red-500">{dateError}</p>}
					</div>
					<CustomInput
						label="location"
						placeholder="entrer l'emplacement d'événement"
						{...register("location")}
						error={errors.location?.message}
					/>
					<div className="grid grid-cols-4 items-center gap-4">
						<div className="text col-span-4">
							<Label htmlFor="description" className="text-label text-right">
								Description
							</Label>
						</div>
						<div className="col-span-4">
							<Textarea
								id="description"
								className="min-h-36"
								placeholder="description"
								{...register("description")}
								error={errors.description?.message}
							/>
						</div>
					</div>
					<DialogFooter className="flex items-center">
						<Button variant={"outline"} type="button">
							Annuler
						</Button>
						<Button type="submit">
							{loading ? (
								<span className="flex items-center justify-center pb-4">
									<Loader fillColor="white" width="25px" />
								</span>
							) : (
								"Envoyer"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default EventForm;
