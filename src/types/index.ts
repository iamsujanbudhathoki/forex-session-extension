
declare global {
  interface Window {
    chrome?: {
      storage?: {
        local: {
          get: (keys: string[] | string, callback: (items: any) => void) => void;
          set: (items: Record<string, any>) => void;
        };
      };
    };
  }
}




export interface KillzoneData {
  name: string;
  time: string;
  alertEnabled: boolean;
}

export interface ISessionData {
  name: string;
  displayName: string;
  openTime: string;
  closeTime: string;
  timezone: string;
  color: string;
  killzones: KillzoneData[];
}

export type TabType = 'live' | 'schedule';


export interface ITime {
    date: string;
    time: string;
}
