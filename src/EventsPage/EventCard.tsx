import EventForm from "./EventForm";
import type { EventToUpdate } from "./store/types";
import ViewIcon from "@/assets/ViewIcon";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "@/layouts/ConfirmModal";
import useDeleteEvent from "./hooks/useDeleteEvent";

const EventCard: React.FC<EventToUpdate> = ({ name, date, location, description, id, userId }) => {
	const navigate = useNavigate();
	const { handleDeleteEvent, isPending } = useDeleteEvent();
	return (
		<div className="space-y-3 rounded-lg bg-white p-4 shadow-lg">
			<img src="./banner.jpg" alt={name} className="h-48 w-full rounded-t-lg object-cover" />
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">{name}</h2>
					<div className="flex items-center gap-3">
						<EventForm
							editMode
							eventData={{ name: name, date, location, description, id, userId }}
						/>
						<div
							className="cursor-pointer border p-1 focus:outline-none"
							onClick={() => navigate(`/events/${id}`)}
						>
							<ViewIcon />
						</div>
						<ConfirmModal
							type="delete"
							title={"Supprimer l'événement"}
							description={
								"Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible."
							}
							handleConfirm={() => handleDeleteEvent(id)}
							isLoading={isPending}
						/>
					</div>
				</div>
				<p className="text-gray-600">{date.toISOString()}</p>
				<p className="max-h-6 overflow-y-auto break-words whitespace-pre-line text-gray-600">
					{description}
				</p>
				<p className="text-gray-600">{location}</p>
			</div>
		</div>
	);
};

export default EventCard;
