import { useState, useEffect } from "react";
import { notifications } from "./../assets/notifications";

export const useNotifications = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [notificationsList, setNotificationsList] = useState(notifications);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const markAsRead = (id: number) => {
    setNotificationsList((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    setUnreadCount((prevCount) => prevCount - 1);
  };

  const removeNotification = (id: number) => {
    setNotificationsList((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
    setUnreadCount((prevCount) => prevCount - 1);
  };

  return {
    isMounted,
    unreadCount,
    notificationsList,
    markAsRead,
    removeNotification,
  };
};
