import EventsLayout from "@/EventsPage/EventsPageLyout";
import RegisteredUsersTable from "./RegisteredUsers";

const EventsDetailsPage = () => {
	return (
		<EventsLayout description="events detaiils page">
			<div>
				<div className="h-[250px] w-full overflow-hidden rounded-3xl">
					<img src="/banner.jpg" alt="event cover image" className="h-full w-full object-cover" />
				</div>
				<div>
					<RegisteredUsersTable />
				</div>
			</div>
		</EventsLayout>
	);
};

export default EventsDetailsPage;
