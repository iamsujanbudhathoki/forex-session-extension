import { useMemo, useState } from "react";
import type { ISessionData } from "../types";

import { SESSIONS_DATA } from "../utils/constants";
import { convertTimeToTimezone } from "../utils/timeUtils";


export const useSession = (selectedTimeZone: string) => {
  const [sessions] = useState<ISessionData[]>(SESSIONS_DATA);

  const convertedSessions = useMemo(() => {
    return sessions.map(session => ({
      ...session,
      openTime: convertTimeToTimezone(session.openTime, session.timezone, selectedTimeZone),
      closeTime: convertTimeToTimezone(session.closeTime, session.timezone, selectedTimeZone),
      killzones: session.killzones.map(kz => ({
        ...kz,
        time: convertTimeToTimezone(kz.time, session.timezone, selectedTimeZone)
      }))
    }));
  }, [ selectedTimeZone]);

  return { sessions: convertedSessions };
};
