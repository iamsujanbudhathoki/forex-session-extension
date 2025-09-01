
import type { ISessionData } from "../types";


export type TIMEZONES_LIST ="GMT" | "EST" | "Asia/Kathmandu"

export const TIMEZONES = [
  { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
  { value: 'EST', label: 'EST (Eastern Standard Time)' },
  { value: 'Asia/Kathmandu', label: 'NPT (Nepal Time — Kathmandu)' }
];

export type TimezoneTypes = typeof TIMEZONES[number]['value'];


export const SESSIONS_DATA: ISessionData[] = [
  {
    name: 'asia',
    displayName: 'Asia Session',
    openTime: '00:00',
    closeTime: '09:00',
    timezone: 'GMT',
    color: '#4285f4',
    killzones: [
      { name: 'Tokyo Open', time: '00:00', alertEnabled: true },
      { name: 'Tokyo Close', time: '09:00', alertEnabled: false }
    ]
  },
  {
    name: 'london',
    displayName: 'London Session',
    openTime: '08:00',
    closeTime: '17:00',
    timezone: 'GMT',
    color: '#34a853',
    killzones: [
      { name: 'London Open', time: '08:00', alertEnabled: false },
      { name: 'London Close', time: '16:00', alertEnabled: true }
    ]
  },
  {
    name: 'newyork',
    displayName: 'New York Session',
    openTime: '13:30',
    closeTime: '22:00',
    timezone: 'GMT',
    color: '#ea4335',
    killzones: [
      { name: 'NY Open', time: '13:30', alertEnabled: true },
      { name: 'NY Close', time: '22:00', alertEnabled: false }
    ]
  }
];