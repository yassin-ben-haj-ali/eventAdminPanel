import CustomInput from "@/components/ui/CustomInput";
import EventsLayout from "./EventsPageLyout";
import { useState } from "react";
import EventsList from "./EventsList";
import EventForm from "./EventForm";

const EventsPage = () => {
	const [search, setSearch] = useState("");
	return (
		<EventsLayout>
			<div className="flex flex-col space-y-10">
				<div className="flex items-center justify-end gap-4">
					<CustomInput
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Rechercher un événement"
					/>
					<EventForm editMode={false} />
				</div>
				<div>
					<EventsList />
				</div>
			</div>
		</EventsLayout>
	);
};

export default EventsPage;
