import ClearInputIcon from "@/assets/ClearInputIcon";
import { memo } from "react";
import type { SearchInputProps } from "./types";
import { Input } from "../../input";

const SearchInput = memo(({ value, onChange, onClear }: SearchInputProps) => {
	return (
		<div className="relative flex w-full items-center">
			<Input
				className="pr-9"
				placeholder="Filtrer..."
				onChange={(e) => onChange(e.target.value)}
				value={value}
			/>
			{value && (
				<button
					type="button"
					onClick={onClear}
					className="text-muted-foreground absolute top-0 right-0 m-2.5 h-4 w-4 rounded-full bg-[##2C2C2C]"
				>
					<ClearInputIcon />
				</button>
			)}
		</div>
	);
});

SearchInput.displayName = "SearchInput";

export default SearchInput;
