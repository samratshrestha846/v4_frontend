/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import labReport from '../helpers/api/labReport';

interface NotificationContextProps {
  notificationCount: number;
  fetchNotificationCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

// eslint-disable-next-line import/prefer-default-export
export function useNotificationContext(): NotificationContextProps {
  const context = useContext(NotificationContext);

  // eslint-disable-next-line eqeqeq
  if (context == undefined) {
    throw new Error(
      'useNotificationContext must be used within a NotificationContextProvider'
    );
  }

  return context;
}

interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider: React.FC<
  NotificationContextProviderProps
> = ({ children }) => {
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchNotificationCount();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchNotificationCount = async () => {
    const body = await labReport.fetchNotificationCount();
    setNotificationCount(body?.unread_lab_report_count);
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <NotificationContext.Provider
      value={{ notificationCount, fetchNotificationCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
