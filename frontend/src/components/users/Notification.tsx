import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { useDropdownMenu } from "../../hooks/useDropdownMenu"; // Hook com debounce
import { useNotifications } from "../../hooks/useNotifications";

const Notification = () => {
  const {
    isMenuOpen,
    handleBellMouseEnter,
    handleBellMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
  } = useDropdownMenu();
  const { isMounted, unreadCount, notificationsList, markAsRead } =
    useNotifications();

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={() => {}}>
      <div
        className="bg-black"
        onMouseEnter={handleBellMouseEnter}
        onMouseLeave={handleBellMouseLeave}
      >
        <DropdownMenuTrigger asChild>
          <div className="rounded-full border -m-2 flex items-center p-2">
            <Bell
              aria-hidden="true"
              className="p-2 h-9 w-9 flex-shrink-0 hover:text-secondary"
            />
            <span className="relative w-5 h-5 -top-2 right-3 ml-2 text-sm font-medium text-tertiary">
              {isMounted ? unreadCount : 0}
            </span>
          </div>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        className="w-full"
        // onMouseEnter={handleDropdownMouseEnter}
        // onMouseLeave={handleDropdownMouseLeave}
      >
        <ScrollArea className="h-[350px] w-[450px]">
          {notificationsList.length === 0 ? (
            <p className="p-4 text-center text-gray-500">Nenhuma notificação</p>
          ) : (
            notificationsList.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                onSelect={() => markAsRead(notification.id)}
                className="flex flex-col gap-2 p-2 border-b border-gray-200"
              >
                {notification.message}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
