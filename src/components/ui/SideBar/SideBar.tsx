import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import LeoniLogo from "@/assets/LeoniLogo";
import { useStore } from "@/store/store";

const SideBar = () => {
	const myUser = useStore((state) => state.myUser.authenticationResult);
	return (
		<aside className="bg-background flex h-full w-64 flex-col">
			<div className="flex-grow overflow-y-auto">
				<div className="flex h-full flex-col items-center gap-8 p-4">
					<Link to="/" className="py-6">
						<LeoniLogo />
					</Link>
					<>
						<NavLinks />
					</>
				</div>
			</div>

			<div className="bg-primary p-4 text-white">
				<Link to="/my-profile" className="flex items-center space-x-3">
					<div className="text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white font-semibold">
						{`${myUser?.firstName?.charAt(0)} ${myUser?.lastName?.charAt(0)}`}
					</div>
					<div>
						<p className="font-semibold">{`${myUser?.firstName} ${myUser?.lastName}`}</p>
						<p className="text-sm">{`Rôle: ${myUser?.email}`}</p>
					</div>
				</Link>
			</div>
		</aside>
	);
};

export default SideBar;
