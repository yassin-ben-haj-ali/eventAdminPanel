type Props = {
  active: boolean;
};
const MenuIcon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    stroke={props.active ? "#FFF" : "#162456"}
  >
    <path
      stroke={props.active ? "#FFF" : "#162456"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 1H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1ZM18 1h-5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1ZM18 10h-5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1ZM7 14H2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z"
    />
  </svg>
);
export default MenuIcon;
