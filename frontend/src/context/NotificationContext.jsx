import { createContext, useState, useContext, useRef } from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";

export const NotificationContext = createContext({
  showNotification: (message, type) => {},
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timerRef = useRef(null);
  const duration = 4000;

  const showNotification = (message, type = "info") => {
    clearTimeout(timerRef.current);
    setNotification({ message, type });

    timerRef.current = setTimeout(() => {
      setNotification(null);
    }, duration);
  };

  const getStyle = (type) => {
    switch (type) {
      case "success":
        return "border-success text-success bg-green-50";
      case "error":
        return "border-error text-error bg-red-50";
      case "warning":
        return "border-warning text-warning bg-yellow-50";
      default:
        return "border-info text-info bg-blue-50";
    }
  };

  const contextValue = { showNotification };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      {notification && (
        <div
          className={`fixed top-20 right-5 w-80 max-w-sm px-4 py-3 rounded-md shadow-md border z-50 animate-fade-in-up ${getStyle(
            notification.type
          )}`}
        >
          <div className="flex justify-start items-start gap-2">
            {notification.type === "success" && (
              <AiOutlineCheckCircle className="text-success text-lg" />
            )}
            {notification.type === "info" && (
              <AiOutlineInfoCircle className="text-info text-lg" />
            )}
            {notification.type === "warning" && (
              <AiOutlineWarning className="text-warning text-lg" />
            )}
            {notification.type === "error" && (
              <AiOutlineCloseCircle className="text-error text-lg" />
            )}
            <span className="text-sm font-medium leading-snug">
              {notification.message}
            </span>
          </div>

          <div className="mt-2 h-1 w-full bg-opacity-20 bg-darkbrown rounded overflow-hidden">
            <div className="h-full bg-secondary animate-progress-bar" />
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
