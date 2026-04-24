import { CircleUserRound } from "lucide-react";
import { UserMenuPopover } from "@/components/ui/user-menu-popover";
import { useLogout, useMe } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Menu() {
  const { mutate: logout } = useLogout();
  const { data } = useMe();
  const navigate = useNavigate();

  const username = data?.user?.email ?? "";
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <div className="flex justify-end bg-white rounded-md p-3">
      <UserMenuPopover
        name={username}
        initials={initials}
        onLogout={() => logout(undefined, { onSuccess: () => navigate("/login") })}
        trigger={
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <CircleUserRound className="h-5 w-5" />
          </div>
        }
      />
    </div>
  );
}

export default Menu;