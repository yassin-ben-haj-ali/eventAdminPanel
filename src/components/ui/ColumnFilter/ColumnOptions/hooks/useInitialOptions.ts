import { useMemo } from "react";
import type { FilterType } from "@/UsersPage/store/types";
import { FILTER_OPTIONS } from "@/lib/constants";
import type { FilterOption } from "../types";

type UseInitialOptionsResult = {
	initialOptions: FilterOption[];
};

const useInitialOptions = (filterType: FilterType, optionName: string): UseInitialOptionsResult => {
	const initialOptions = useMemo<FilterOption[]>(() => {
		return FILTER_OPTIONS[filterType]?.[optionName] || [];
	}, [filterType, optionName]);

	return { initialOptions };
};

export default useInitialOptions;
