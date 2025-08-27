import CustomInput from "@/components/ui/CustomInput";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { X } from "lucide-react";
import type { User } from "./store/types";
import ViewIcon from "@/assets/ViewIcon";

type Props = {
	data?: User;
};

const ViewUserInfo = ({ data }: Props) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<ViewIcon />
			</DialogTrigger>
			<DialogContent
				className="max-h-[50rem] w-[400px] overflow-y-auto sm:w-[425px] sm:min-w-[500px]"
				style={{
					boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.80)",
				}}
			>
				<DialogHeader>
					<DialogTitle className="text-text text-2xl font-[600]">
						<div className="flex w-full items-center justify-between">
							<span>{`${data?.firstName} ${data?.lastName}`}</span>
							<button type="button" onClick={() => setOpen(false)} aria-label="Close dialog">
								<X className="text-label size-4" />
							</button>
						</div>
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-3">
					<CustomInput label={"role"} placeholder={"role"} required disabled value={data?.role} />
					<CustomInput
						label={"email"}
						placeholder={"email"}
						required
						disabled
						value={data?.email}
					/>
					<div className="flex w-full space-x-3">
						<CustomInput
							id="lastName"
							required={true}
							label={"firstname"}
							placeholder={"firstName"}
							className="w-full"
							disabled
							value={data?.lastName}
						/>
						<CustomInput
							id="name"
							required={true}
							label={"lastName"}
							className="col-span-3"
							placeholder={"lastName"}
							disabled
							value={data?.firstName}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default ViewUserInfo;
