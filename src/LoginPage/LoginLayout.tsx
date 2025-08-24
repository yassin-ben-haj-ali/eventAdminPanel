import React from "react";

type LoginLayoutProps = {
	children: React.ReactNode;
};

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
	return (
		<div className="flex h-screen w-screen">
			<div className="flex h-full basis-3/5 flex-col items-center justify-center">{children}</div>
			<div className="bg-primary flex basis-2/5 items-center justify-center text-3xl font-bold text-white">
				Des expériences mémorables
			</div>
		</div>
	);
};

export default LoginLayout;
