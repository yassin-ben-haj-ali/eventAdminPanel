import LogoutIcon from "@/assets/LogoutIcon";
import { useLocation } from "react-router-dom";
import MenuIcon from "@/assets/MenuIcon";
import SideBarLink from "./SideBarLink";
import UsersIcon from "@/assets/UsersIcon";
import ClipBoardIcon from "@/assets/ClipBoardIcon";

const NavLinks = () => {
  const location = useLocation();
  const navData = [
    {
      to: "/home",
      icon: <MenuIcon active={location.pathname.includes("/home")} />,
      label: "Dashboard",
      disabled: false,
    },
    {
      to: "/users",
      icon: <UsersIcon active={location.pathname.includes("/users")} />,
      label: "users",
      disabled: false,
    },
    {
      to: "/events",
      icon: <ClipBoardIcon active={location.pathname.includes("/events")} />,
      label: "events",
      disabled: false,
    },
  ];

  return (
    <nav className="w-full h-full flex flex-col">
      <ul className="flex flex-grow w-full flex-col items-center gap-6">
        {navData.map(({ to, icon, label, disabled }) => {
          return (
            <SideBarLink
              key={to}
              to={to}
              icon={icon}
              label={label}
              disabled={disabled}
            />
          );
        })}
      </ul>
      <div>
        <SideBarLink to="/login" icon={<LogoutIcon />} label={"logout"} />
      </div>
    </nav>
  );
};

export default NavLinks;
