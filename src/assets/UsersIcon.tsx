type Props = {
  active: boolean;
};
const UsersIcon: React.FC<Props> = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <path
      stroke={active ? "#FFF" : "#162456"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87m-3-12a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </svg>
);
export default UsersIcon;
