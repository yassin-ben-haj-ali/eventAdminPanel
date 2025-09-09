import CustomInput from "@/components/ui/CustomInput";
import EventsLayout from "./EventsPageLyout";
import EventsList from "./EventsList";
import EventForm from "./EventForm";
import { useStore } from "@/store/store";

const EventsPage = () => {
	const setSearchFilter = useStore((state) => state.event.setSearchFilter);
	return (
		<EventsLayout>
			<div className="flex flex-col space-y-10">
				<div className="flex items-center justify-end gap-4">
					<CustomInput
						onChange={(e) => setSearchFilter(e.target.value)}
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
