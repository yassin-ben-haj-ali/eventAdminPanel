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
		<div className="max-h-[calc(100vh-20rem)] overflow-auto">
			<div className="grid grid-cols-3 gap-4">
				{events.map((event) => {
					const { date, ...rest } = event;
					return (
						<div key={event.id}>
							<EventCard date={new Date(date)} {...rest} />
						</div>
					);
				})}
				<div ref={ref}>
					{getEventsQuery.isFetchingNextPage && (
						<Loader className="flex w-full items-center justify-center" />
					)}
				</div>
			</div>
		</div>
	);
};

export default EventsList;
