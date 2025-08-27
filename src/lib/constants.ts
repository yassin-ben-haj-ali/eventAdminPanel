import type { OptionConfig } from "@/components/ui/ColumnFilter/ColumnOptions/types";

export const FILTER_OPTIONS: OptionConfig = {
	user: {
		role: [
			{ id: 0, name: "Organisateur", value: "organisateur" },
			{ id: 1, name: "Employée", value: "employée" },
		],
	},
};
