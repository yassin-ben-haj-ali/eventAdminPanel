import { memo, useCallback } from "react";
import type { FilterType } from "@/UsersPage/store/types";
import { useFilterOptions } from "./hooks/useFilterOptions";
import SearchInput from "./SearchInput";
import OptionsList from "./OptionList";
import type { FilterOption } from "./types";

type ColumnOptionsProps = {
	optionName: string;
	filterType: FilterType;
	defaultKeyword: string;
	setKeyword: (keyword: string) => void;
	selectedRadio: string;
	onSelectRadio: (option: string) => void;
	onKeyDown: (event: React.KeyboardEvent) => void;
};

const ColumnOptions = memo((props: ColumnOptionsProps) => {
	const { selectedRadio, onSelectRadio, setKeyword, defaultKeyword, onKeyDown } = props;
	const initialOptions: FilterOption[] = [];
	const { filteredOptions, handleSearch, clearSearch } = useFilterOptions(initialOptions);

	const handleKeywordChange = useCallback(
		(value: string) => {
			handleSearch(value);
			setKeyword(value);
		},
		[handleSearch, setKeyword]
	);

	const handleClearSearch = useCallback(() => {
		clearSearch();
		setKeyword("");
	}, [clearSearch, setKeyword]);

	const showSearchBar = true;

	return (
		<div className="space-y-3" onKeyDown={onKeyDown}>
			<span className="block font-semibold">Filtrer par valeur</span>
			{showSearchBar && (
				<SearchInput
					value={defaultKeyword}
					onChange={handleKeywordChange}
					onClear={handleClearSearch}
				/>
			)}
			<OptionsList
				options={filteredOptions}
				selectedValue={selectedRadio}
				onSelect={onSelectRadio}
			/>
		</div>
	);
});

ColumnOptions.displayName = "ColumnOptions";

export default ColumnOptions;
