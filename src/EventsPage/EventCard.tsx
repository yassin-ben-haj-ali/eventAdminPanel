type EventCardProps = {
	title: string;
	date: string;
	location: string;
	description?: string;
	image?: string;
};

const EventCard: React.FC<EventCardProps> = ({ title, date, location, description, image }) => {
	return (
		<div className="space-y-3 rounded-lg bg-white p-4 shadow-lg">
			{image && <img src={image} alt={title} className="h-48 w-full rounded-t-lg object-cover" />}
			<div className="space-y-2">
				<h2 className="text-xl font-semibold">{title}</h2>
				<p className="text-gray-600">{date}</p>
				<p className="text-gray-600">{description}</p>
				<p className="text-gray-600">{location}</p>
			</div>
		</div>
	);
};

export default EventCard;
