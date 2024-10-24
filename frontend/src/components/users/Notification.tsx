import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { notifications as initialNotifications } from "../../assets/notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "./../ui/scroll-area";

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState(
    initialNotifications.map((notification) => ({
      ...notification,
      read: false,
    }))
  );
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Função para marcar como lida e remover a notificação
  const handleNotificationClick = (id: number) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.length);
    setIsMenuOpen(false); // Fechar o dropdown
  };

  return (
    <div className="relative" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <div className="relative cursor-pointer group p-1">
        <DropdownMenu open={isMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div className="relative">
              <Bell
                aria-hidden="true"
                className="p-2 h-10 w-10 flex-shrink-0 hover:text-secondary"
              />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>

          {/* Conteúdo do Dropdown */}
          <DropdownMenuContent
            className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-md"
            align="end"
            ref={dropdownRef}
          >
            <div className="py-2">
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <div className="text-center p-4">Nenhuma notificação</div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex items-start gap-4 p-4 hover:bg-gray-100 transition-all"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <Link
                        to={`/pedido/${notification.pedido_id}`}
                        className="flex-1"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={notification.imageUrl}
                            alt={notification.description}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <p className="font-bold text-sm text-blue-600">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-500">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-400">
                              {notification.date}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  ))
                )}
              </ScrollArea>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Notification;
