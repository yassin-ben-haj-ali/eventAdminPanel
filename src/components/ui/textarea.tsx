import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<div className="relative">
				<textarea
					className={cn(
						"focus-visible:ring-primary flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						props.error && "border-red-600 outline-none focus-visible:ring-transparent",
						className
					)}
					ref={ref}
					{...props}
				/>
				{props.error && (
					<div>
						<p className="absolute left-2 block overflow-hidden px-1 text-xs font-normal text-ellipsis whitespace-nowrap text-red-600">
							{" "}
							{props.error}{" "}
						</p>
					</div>
				)}
			</div>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
