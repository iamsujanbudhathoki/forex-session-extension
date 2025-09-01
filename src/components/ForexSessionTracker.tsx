
import { Tabs } from 'antd';
import React, { useState } from 'react';
import { useForexSessions } from '../hooks/useForexSessions';
import { useTheme } from '../hooks/useTheme';
import { useTime } from '../hooks/useTime';
import Header from './Header';
import LiveTab from './LiveTab';
import ScheduleTab from './ScheduleTab';

const { TabPane } = Tabs;

const ForexSessionTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('live');
  const { isDarkMode, toggleTheme } = useTheme();
  const forexData = useForexSessions();
  const currentTime = useTime(forexData?.selectedTimezone);

  return (
    <>
      <Header darkMode={isDarkMode} onToggleTheme={toggleTheme} />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        centered
      >
        <TabPane tab="Live" key="live">
          <LiveTab
            currentTime={currentTime}
            alertsEnabled={forexData.alertsEnabled}
            onToggleAlerts={forexData.toggleAlerts}
            selectedTimezone={forexData.selectedTimezone}

          />
        </TabPane>
        <TabPane tab="Schedule" key="schedule">
          <ScheduleTab
            selectedTimezone={forexData.selectedTimezone}
            onTimezoneChange={forexData.changeTimezone}
          />
        </TabPane>
      </Tabs>
    </>
  );
};

export default ForexSessionTracker;