import { useCallback, useEffect, useState } from 'react';
import type { TIMEZONES_LIST } from '../utils/constants';
import { useSession } from './useSession';





export const useForexSessions = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [selectedTimezone, setSelectedTimezone] = useState<TIMEZONES_LIST>('GMT');
  const { sessions } = useSession(selectedTimezone)
  useEffect(() => {
    const chromeStorage = window.chrome?.storage?.local;
    if (chromeStorage) {
      chromeStorage.get(['alertsEnabled', 'selectedTimezone'], (result) => {
        if (result.alertsEnabled !== undefined) {
          setAlertsEnabled(result.alertsEnabled);
        }
        if (result.selectedTimezone) {
          setSelectedTimezone(result.selectedTimezone);
        }
      });
    }
  }, []);

  const toggleAlerts = useCallback(() => {
    const newValue = !alertsEnabled;
    setAlertsEnabled(newValue);

    const chromeStorage = window.chrome?.storage?.local;
    if (chromeStorage) {
      chromeStorage.set({ alertsEnabled: newValue });
    }
  }, [alertsEnabled]);

  const changeTimezone = useCallback((timezone: TIMEZONES_LIST) => {
    setSelectedTimezone(timezone);

    const chromeStorage = window.chrome?.storage?.local;
    if (chromeStorage) {
      chromeStorage.set({ selectedTimezone: timezone });
    }
  }, []);

  return {
    sessions,
    alertsEnabled,
    selectedTimezone,
    toggleAlerts,
    changeTimezone
  };
};
