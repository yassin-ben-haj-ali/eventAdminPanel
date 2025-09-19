import EventsLayout from "@/EventsPage/EventsPageLyout";
import RegisteredUsersTable from "./RegisteredUsers";
import useGetEvents from "@/EventsPage/hooks/useGetEvents";
import { useParams } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import Loader from "@/components/ui/Loader/Loader";

const EventsDetailsPage = () => {
	const params = useParams();
	const eventId = params.id;
	const eventDetails = useGetEvents(eventId, undefined, { enabled: !!eventId });

	if (eventDetails.isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader />
			</div>
		);
	}

	return (
		<EventsLayout description="events details page">
			<div>
				<div className="flex h-60 gap-3">
					<div className="flex basis-1/2 flex-col space-y-4 overflow-hidden p-2">
						<h1 className="text-2xl font-bold break-words text-gray-900">
							{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].name}
						</h1>
						<div className="flex flex-shrink-0 items-center gap-2 text-gray-700">
							<Calendar className="h-3 w-3 text-gray-500" />
							<span className="truncate">
								{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].date}
							</span>
						</div>
						<div className="flex flex-shrink-0 items-center gap-2 text-gray-700">
							<MapPin className="h-3 w-3 text-gray-500" />
							<span className="truncate">
								{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].location}
							</span>
						</div>
						<div className="min-h-1 flex-1">
							<p className="h-full overflow-y-auto pr-2 break-words whitespace-pre-wrap text-gray-600">
								{eventDetails.data?.pages?.[0]?.paginatedResult?.[0].description}
							</p>
						</div>
					</div>
					<div className="flex-shrink-0 basis-1/2 overflow-hidden rounded-3xl">
						<img src="/banner.jpg" alt="event cover image" className="h-full w-full object-cover" />
					</div>
				</div>
				<div>
					<RegisteredUsersTable />
				</div>
			</div>
		</EventsLayout>
	);
};

export default EventsDetailsPage;
