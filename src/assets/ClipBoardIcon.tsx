type Props = {
	active: boolean;
};
const ClipBoardIcon = (props: Props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
		<path
			stroke={props.active ? "#FFF" : "#162456"}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
		/>
	</svg>
);
export default ClipBoardIcon;
