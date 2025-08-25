import EventCard from "./EventCard";

const Events = [
	{
		id: 1,
		title: "Journée Portes Ouvertes",
		date: "2023-11-15",
		image: "/leoni-formation.jpeg",
	},
	{
		id: 2,
		title: "Conférence sur l'Innovation",
		date: "2023-12-01",
		image: "/banner.jpg",
	},
	{
		id: 3,
		title: "Atelier de Formation",
		date: "2023-12-10",
		image: "/leoni-formation.jpeg",
	},
];

const EventsList = () => {
	return (
		<div className="flex gap-4">
			{Events.map((event) => (
				<div key={event.id} className="w-1/3">
					<EventCard
						title={event.title}
						date={event.date}
						location="Leoni Tunisie"
						image={event.image}
					/>
				</div>
			))}
		</div>
	);
};

export default EventsList;
