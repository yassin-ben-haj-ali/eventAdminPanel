import type { OptionConfig } from "@/components/ui/ColumnFilter/ColumnOptions/types";

export const FILTER_OPTIONS: OptionConfig = {
	user: {
		role: [
			{ id: 0, name: "Organisateur", value: "ADMIN" },
			{ id: 1, name: "Employée", value: "USER" },
		],
	},
};
