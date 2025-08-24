import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  isActive?: boolean;
};
const SideBarLink = (props: Props) => {
  return (
    <>
      {props.disabled ? (
        <div
          aria-disabled={true}
          className="flex min-h-fit w-full cursor-not-allowed items-center gap-3 rounded-lg p-3 text-nav opacity-50"
        >
          {props.icon}
          <span
            className={cn(
              "overflow-hidden text-ellipsis text-nowrap",
              props.to === "/login" && "text-[#A65959]"
            )}
          >
            {props.label}
          </span>
        </div>
      ) : (
        <div className="w-full -space-y-1">
          <NavLink
            to={props.to}
            className={(navData) => {
              const active = props?.isActive ?? navData.isActive;
              return active
                ? "flex min-h-fit w-full items-center gap-3 rounded-lg bg-primary p-3 text-white"
                : "flex min-h-fit w-full items-center gap-3 rounded-lg p-3 text-nav";
            }}
          >
            {props.icon}
            <span
              className={cn(
                "overflow-hidden text-ellipsis text-nowrap",
                props.to === "/login" && "text-[#A65959]"
              )}
            >
              {props.label}
            </span>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default SideBarLink;
