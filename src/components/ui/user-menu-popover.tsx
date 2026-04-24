import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "./button";

interface UserMenuPopoverProps {
  trigger: React.ReactNode;
  name: string;
  initials: string;
  onLogout: () => void;
}

export function UserMenuPopover({
  trigger,
  name,
  initials,
  onLogout,
}: UserMenuPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>

      <PopoverContent className="w-52 p-0" align="end" sideOffset={8}>
        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-medium shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{name}</p>
          </div>
        </div>

        <div className="p-1.5">
          <Button
            onClick={onLogout}
            className="w-full cursor-pointer"
          >
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}