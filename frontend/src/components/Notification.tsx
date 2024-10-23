import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { useState, useEffect } from "react";
import { notifications } from "../assets/notifications"; // Importa as notificações de teste

const Notification = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(notifications.length); // Inicialmente, todas são não lidas
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false); // Controle do mouse na área de notificações

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const markAsRead = (id: number) => {
    setNotificationsList((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    setUnreadCount((prevCount) => prevCount - 1); // Diminui o contador
  };

  const removeNotification = (id: number) => {
    setNotificationsList((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    setUnreadCount((prevCount) => prevCount - 1); // Diminui o contador
  };

  const handleMouseEnter = () => {
    setIsMouseInside(true);
    setTimeout(() => setIsMenuOpen(true), 100);
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);

    if (isMouseInside === true) {
      setTimeout(() => setIsMenuOpen(false), 500);
    }
  };

  return (
    <>
      <DropdownMenu
        open={isMenuOpen || isMouseInside} // Controla a abertura com hover
        onOpenChange={setIsMenuOpen}
      >
        <DropdownMenuTrigger
          asChild
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={handleMouseLeave} // Fecha se o mouse não estiver dentro
        >
          <div className="group -m-2 flex items-center p-2">
            <Bell
              aria-hidden="true"
              className="p-2 h-10 w-10 flex-shrink-0 group-hover:text-secondary"
            />
            <span className="relative w-5 h-5 -top-2 right-3 ml-2 text-sm font-medium text-tertiary">
              {isMounted ? unreadCount : 0}
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-80">
          {" "}
          {/* Aumenta a largura para 80 */}
          <ScrollArea
            className="h-[350px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {notificationsList.length === 0 ? ( // Exibe mensagem se não houver notificações
              <p className="p-4 text-center text-gray-500">
                Nenhuma notificação
              </p>
            ) : (
              notificationsList.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onSelect={() => markAsRead(notification.id)} // Marcar como lida ao clicar
                  className="flex flex-col gap-2 p-2 border-b border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <img
                      src={notification.imageUrl}
                      alt={notification.description}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1 ml-2">
                      <p className="text-sm font-semibold">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.date}
                      </p>
                    </div>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => removeNotification(notification.id)}
                    >
                      Excluir
                    </button>
                  </div>
                  {notification.message && (
                    <p className="text-xs text-gray-700 mt-1">
                      {notification.message}
                    </p>
                  )}
                </DropdownMenuItem>
              ))
            )}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Notification;
