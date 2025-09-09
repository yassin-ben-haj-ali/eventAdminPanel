import { useInView } from "react-intersection-observer";
import EventCard from "./EventCard";
import useGetEvents from "./hooks/useGetEvents";
import { useStore } from "@/store/store";
import { useEffect } from "react";
import Loader from "@/components/ui/Loader/Loader";

const EventsList = () => {
	const { ref, inView } = useInView({
		threshold: 0,
	});
	const getEventsQuery = useGetEvents({
		enabled: true,
	});
	const events = useStore((state) => state.event.events);
	useEffect(() => {
		if (inView && getEventsQuery.hasNextPage) {
			getEventsQuery.fetchNextPage();
		}
	}, [inView, getEventsQuery.hasNextPage, getEventsQuery.fetchNextPage]);
	return (
		<div className="flex gap-4">
			{events.map((event) => (
				<div key={event.id} className="w-1/3">
					<EventCard
						title={event.name}
						date={event.date}
						description={event.description}
						location="Leoni Tunisie"
					/>
				</div>
			))}
			<div ref={ref}>
				{getEventsQuery.isFetchingNextPage && (
					<Loader className="flex w-full items-center justify-center" />
				)}
			</div>
		</div>
	);
};

export default EventsList;
