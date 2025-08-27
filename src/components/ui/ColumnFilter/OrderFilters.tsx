import type { FilterType } from "@/UsersPage/store/types";
import { CommandItem } from "../command";
import { useEffect } from "react";

type Props = {
	optionName: string;
	filterType: FilterType;
	selectedOption: string;
	onSelectOption: (option: string) => void;
	handleSubmitFilter: () => void;
};

const OrderFilters = (props: Props) => {
	const { selectedOption, onSelectOption, handleSubmitFilter } = props;

	const handleSelect = (option: string) => {
		onSelectOption(option);
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Enter" && selectedOption) {
			handleSubmitFilter();
		}
	};

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [selectedOption]);
	return (
		<div>
			<CommandItem onSelect={() => handleSelect("asc")} defaultChecked={selectedOption === "asc"}>
				Trier par ordre croissant
			</CommandItem>
			<CommandItem onSelect={() => handleSelect("desc")} defaultChecked={selectedOption === "desc"}>
				Trier par ordre décroissant
			</CommandItem>
		</div>
	);
};

export default OrderFilters;
