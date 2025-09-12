import { useStore } from "@/store/store";
import EventForm from "./EventForm";
import type { EventToUpdate } from "./store/types";

const EventCard: React.FC<EventToUpdate> = ({ name, date, location, description, id, onClick }) => {
	const role = useStore((state) => state.myUser.authenticationResult)?.role;
	return (
		<div className="space-y-3 rounded-lg bg-white p-4 shadow-lg" onClick={onClick}>
			{/* {image && <img src={image} alt={name} className="h-48 w-full rounded-t-lg object-cover" />} */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">{name}</h2>
					{role !== "ADMIN" && (
						<EventForm editMode eventData={{ name: name, date, location, description, id }} />
					)}
				</div>
				<p className="text-gray-600">{date.toISOString()}</p>
				<p className="text-gray-600">{description}</p>
				<p className="text-gray-600">{location}</p>
			</div>
		</div>
	);
};

export default EventCard;
