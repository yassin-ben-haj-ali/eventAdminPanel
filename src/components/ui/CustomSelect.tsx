import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

type Props = {
	options: { label: string; value: string; disabled?: boolean }[] | undefined;
	required?: boolean;
	label: string;
	placeholder?: string;
	width?: string;
	value?: string;
	setValue?: (value: string) => void;
	error?: string;
	disabled?: boolean;
	reachBottom?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const CustomSelect = forwardRef<HTMLDivElement, Props>((props, ref) => {
	const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const target = e.target as HTMLDivElement;
		if (target) {
			const scrollTop = target.scrollTop;
			const scrollHeight = target.scrollHeight;
			const clientHeight = target.clientHeight;
			//REACH BOTTOM
			if (scrollTop + clientHeight === scrollHeight) {
				if (props.reachBottom) {
					props.reachBottom(e);
				}
			}
		}
	};

	return (
		<div className={props?.width}>
			<Label>
				{props.label} {props.required && <span className="text-red-600">*</span>}
			</Label>
			<div className="relative mt-1">
				<Select onValueChange={props.setValue} value={props.value} disabled={props.disabled}>
					<SelectTrigger
						className={cn(
							"w-full",
							props.error && "border-red-600",
							props.disabled && "cursor-not-allowed opacity-50",
							props.placeholder && !props.value && "text-gray-400"
						)}
					>
						<SelectValue placeholder={props.placeholder} />
					</SelectTrigger>
					<SelectContent
						ref={ref}
						onScrollCapture={handleScroll}
						style={{
							maxWidth: "min-content",
						}}
					>
						{props.options?.map((option) => {
							return (
								<SelectItem
									value={option.value}
									key={option.value}
									disabled={props.disabled || option.disabled}
								>
									{option.label}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
				{props.error && (
					<span className="bg-inputBackground absolute left-2 px-1 text-xs text-red-600">
						{props.error}
					</span>
				)}
			</div>
		</div>
	);
});

CustomSelect.displayName = "CustomSelect"; // Add displayName for debugging in React devtools

export default CustomSelect;
