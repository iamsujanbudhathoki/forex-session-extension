import type { ISessionData } from '../types';
import type { TIMEZONES_LIST, TimezoneTypes } from './constants';

// Check if a session is currently active
export const isSessionActive = (session: ISessionData): boolean => {
  const now = new Date();
  const currentTimeInMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();

  const [openHour, openMinute] = session.openTime.split(':').map(Number);
  const [closeHour, closeMinute] = session.closeTime.split(':').map(Number);

  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  // Handles sessions that span midnight
  if (openTimeInMinutes <= closeTimeInMinutes) {
    return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes;
  } else {
    return currentTimeInMinutes >= openTimeInMinutes || currentTimeInMinutes < closeTimeInMinutes;
  }
};

// Get the next killzone (session event) from now
export const getNextKillzone = (sessions: ISessionData[], selectedTimezone: TIMEZONES_LIST) => {
  const now = new Date();

  const timezoneOffsets: { [key in TIMEZONES_LIST]: { hours: number; minutes: number } } = {
    GMT: { hours: 0, minutes: 0 },
    EST: { hours: -5, minutes: 0 },
    "Asia/Kathmandu": { hours: 5, minutes: 45 },
  };

  const offset = timezoneOffsets[selectedTimezone];
  const currentTimeInMinutes =
    (now.getUTCHours() + offset.hours) * 60 +
    now.getUTCMinutes() +
    offset.minutes;

  const allKillzones = sessions.flatMap(session =>
    session.killzones.map(kz => {
      const [hours, minutes] = kz.time.split(':').map(Number);
      const timeInMinutes = hours * 60 + minutes;
      return { ...kz, timeInMinutes };
    })
  );

  // Find the next killzone after current time
  const futureKillzones = allKillzones
    .map(kz => ({ ...kz, diff: (kz.timeInMinutes - currentTimeInMinutes + 24 * 60) % (24 * 60) }))
    .sort((a, b) => a.diff - b.diff);

  return futureKillzones[0] || null;
};

// Get time remaining until the next killzone
export const getTimeUntilNext = (sessions: ISessionData[], selectedTimezone: TIMEZONES_LIST): string => {
  const nextKz = getNextKillzone(sessions, selectedTimezone);
  if (!nextKz) return '00:00:00';

  const now = new Date();
  const offset = {
    GMT: 0,
    EST: -5 * 60,
    "Asia/Kathmandu": 5 * 60 + 45,
  }[selectedTimezone];

  const currentTimeInMinutes = now.getUTCHours() * 60 + now.getUTCMinutes() + offset;

  let timeUntil = (nextKz.timeInMinutes - currentTimeInMinutes + 24 * 60) % (24 * 60);
  const hours = Math.floor(timeUntil / 60);
  const minutes = Math.floor(timeUntil % 60);
  const seconds = Math.floor((timeUntil % 1) * 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Convert time between timezones
export const convertTimeToTimezone = (time: string, fromTz: TimezoneTypes, toTz: TimezoneTypes): string => {
  const timezoneOffsets: { [key: string]: number } = {
    GMT: 0,
    EST: -5 * 60,
    CET: 1 * 60,
    'Asia/Kathmandu': 5 * 60 + 45, 
  };

  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  const fromOffset = timezoneOffsets[fromTz] || 0;
  const toOffset = timezoneOffsets[toTz] || 0;

  const convertedMinutes = totalMinutes + (toOffset - fromOffset);
  const normalizedMinutes = ((convertedMinutes % (24 * 60)) + 24 * 60) % (24 * 60);

  const newHours = Math.floor(normalizedMinutes / 60);
  const newMins = normalizedMinutes % 60;

  return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
};
