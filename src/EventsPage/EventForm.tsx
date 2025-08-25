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
import { EventSchema } from "./types";
import CustomInput from "@/components/ui/CustomInput";
import { DateTimePicker } from "@/components/ui/DateTime";
import { useState } from "react";

type EventFormProps = {
	id?: string;
	editMode: boolean;
};
const EventForm: React.FC<EventFormProps> = ({ editMode }) => {
	const form = useForm({
		resolver: zodResolver(EventSchema),
	});
	const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string>("");

	const { handleSubmit, register } = form;

    const checkDate = (date:Date | undefined, time:string)=>{
        if(!date || !time) return;
        const [hours, minutes, seconds] = time.split(":").map(Number);
        const dateTime = new Date(date);
        dateTime.setHours(hours,minutes,seconds || 0 );
        const today = new Date();
        if(today < dateTime ) return;
    }

	const onSubmit = () => {
        checkDate(date,time)
    };

	return (
		<Dialog>
			<DialogTrigger>
				{editMode ? <Button>Edit Event</Button> : <Button>Add event</Button>}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="space-y-6">
					<DialogTitle>Ajouter un événement</DialogTitle>
				</DialogHeader>
						<form className="space-y-6" onSubmit={(e) => handleSubmit(onSubmit)(e)}>
							<CustomInput
								label="title"
								placeholder="entrer le titre d'événement"
								required={true}
								{...register("title")}
							/>
							<div className="w-full">
								<DateTimePicker 
                                date={date}
                                setDate={setDate}
                                time={time}
                                setTime={setTime}
                                />
							</div>
							<CustomInput
								label="location"
								placeholder="entrer l'emplacement d'événement"
								{...register("location")}
								required={true}
							/>
                            <DialogFooter className="flex items-center">
					<Button variant={"outline"}>Annuler</Button>
					<Button type="submit">Valider</Button>
				</DialogFooter>
						</form>
			</DialogContent>
		</Dialog>
	);
};

export default EventForm;
