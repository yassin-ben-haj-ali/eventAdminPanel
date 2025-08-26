import type { FilterType } from "@/UsersPage/store/types";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./table";
import type { JSX } from "react";

type HeaderInfo = {
	optionName: string;
	headerTitle: string;
	filterParams?: {
		hideOrder?: boolean;
		hideSearch?: boolean;
	};
};
type Props = {
	headers: HeaderInfo[];
	filterType: FilterType;
	data: JSX.Element | undefined | null;
	hideActions?: boolean;
	hasData?: boolean;
	headerCellColor?: string;
	headerTitleColor?: string;
	headerAlign?: "start" | "center";
};

const CustomTable = (props: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					{props.headers.map((header) => (
						<TableHead
							key={header.headerTitle}
							optionName={header.optionName}
							filterType={props.filterType}
							hideArrow={
								(header.filterParams?.hideOrder && header.filterParams?.hideSearch) ?? false
							}
							filterParams={header.filterParams}
							className={`${header.optionName === "document" ? "justify-start pl-[16%]" : props.headerAlign === "start" ? "justify-start" : "justify-center"} ${
								props.headerCellColor ? `text-[${props.headerCellColor}]` : ""
							}`}
						>
							<span className={props.headerTitleColor ? `text-[${props.headerTitleColor}]` : ""}>
								{header.headerTitle}
							</span>
						</TableHead>
					))}
					{!props.hideActions && (
						<TableHead
							className={`${props.headerAlign == "start" ? "justify-start" : "justify-center"}`}
							optionName={""}
							hideArrow={true}
							filterType={props.filterType}
						>
							Actions
						</TableHead>
					)}
				</TableRow>
			</TableHeader>
			{props.hasData || (props.hasData === undefined && !!props.data) ? (
				<TableBody className="h-full overflow-y-auto">{props.data}</TableBody>
			) : (
				<tbody>
					<tr>
						<td colSpan={props.headers.length + (props.hideActions ? 0 : 1)}>
							<div className="flex h-40 items-center justify-center">
								<span className="text-center text-xl font-bold text-gray-300">empty data</span>
							</div>
						</td>
					</tr>
				</tbody>
			)}
		</Table>
	);
};

export default CustomTable;
