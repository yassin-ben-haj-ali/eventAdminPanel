import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { MouseEventHandler } from "react";
import Loader from "@/components/ui/Loader/Loader";
import TrashImage from "@/assets/TrashImage";
import DeleteIcon from "@/assets/DeleteIcon";
import ActiveIcon from "@/assets/ActiveIcon";
import ActiveImage from "@/assets/ActiveImage";

type Props = {
	type: "delete";
	title: string;
	description: string;
	handleConfirm?: MouseEventHandler<HTMLButtonElement>;
	isLoading?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	isOpen?: boolean;
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean | null>>;
	handleClickCancel?: MouseEventHandler<HTMLButtonElement>;
};

const ConfirmModal = (props: Props) => {
	return (
		<div>
			<Dialog open={props?.isOpen} onOpenChange={props.setIsOpen} key={props.description}>
				<DialogTrigger asChild type="button">
					<button
						type="button"
						className="flex cursor-pointer rounded-md"
						onClick={(e) => {
							e.stopPropagation();
							if (props?.onClick) {
								props.onClick(e);
							}
						}}
					>
						{props.type === "delete" ? (
							<DeleteIcon />
						) : props.type === "active" ? (
							<ActiveIcon />
						) : null}
					</button>
				</DialogTrigger>
				<DialogContent className="flex max-w-[300px] flex-wrap justify-center py-[2rem] sm:max-w-[335px] lg:max-h-[650px] lg:max-w-[450px]">
					<DialogHeader>
						<DialogTitle className="flex justify-center">
							{props.type === "delete" ? (
								<TrashImage />
							) : props.type === "active" ? (
								<ActiveImage />
							) : null}
						</DialogTitle>
						<DialogDescription className="flex flex-col items-center text-[#2C2C2C]">
							<span className="mb-4 text-center text-3xl font-[600]">{props.title}</span>
							<div className="text-center">{props.description}</div>
						</DialogDescription>
					</DialogHeader>

					<DialogFooter className="w-full justify-center gap-2">
						<DialogTrigger asChild>
							<Button
								type="button"
								className="w-1/2"
								variant="outline"
								onClick={(e) => {
									if (props?.handleClickCancel) {
										props.handleClickCancel(e);
									} else {
										e.stopPropagation();
									}
								}}
							>
								cancel
							</Button>
						</DialogTrigger>

						<Button
							type="submit"
							disabled={
								(props.isLoading !== undefined && props.isLoading) ||
								(props?.disabled !== undefined && props?.disabled)
							}
							className={`w-1/2 ${props.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} `}
							onClick={props.handleConfirm}
						>
							{props.isLoading !== undefined && props.isLoading ? (
								<Loader fillColor="#FFFFFF" width="25" height="25" />
							) : (
								"Confirmer"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ConfirmModal;
