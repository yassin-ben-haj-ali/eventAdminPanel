import BackButton from "@/components/ui/BackButton";

type Props = {
	children: React.ReactNode;
};

const EventsLayout = (props: Props) => {
	return (
		<div className="h-[31rem] max-h-[31rem] space-y-7">
			<div className="w-full space-y-2">
				<div className="mt-6 mb-6">
					<BackButton text={"Retour"} className="text-primary text-xl" />
				</div>
				<div className="w-full space-y-3">
					<p className="text-text text-justify">{"create event description"}</p>
				</div>
			</div>
			<div className="h-full">{props.children}</div>
		</div>
	);
};

export default EventsLayout;
