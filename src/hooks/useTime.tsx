import { useEffect, useState } from 'react';

export const useTime = (timeZone: string) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Format date: "Sep 1, 2025"
      const formattedDate = now.toLocaleDateString('en-US', {
        timeZone,
        year: 'numeric',
        month: 'short', // "Sep"
        day: 'numeric',
      });

      // Format time: "11:01 AM"
      const formattedTime = now.toLocaleTimeString('en-US', {
        timeZone,
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      });

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateTime(); // initial call
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [timeZone]);

  return { date, time };
};
