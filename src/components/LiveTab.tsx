import { BellOutlined } from '@ant-design/icons';
import { Card, Space, Switch, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import type { ITime } from '../types';
import type { TIMEZONES_LIST } from '../utils/constants';
import { getNextKillzone, getTimeUntilNext, isSessionActive } from '../utils/timeUtils';

const { Title, Text } = Typography;

interface LiveTabProps {
  currentTime: ITime;
  alertsEnabled: boolean;
  onToggleAlerts: () => void;
  selectedTimezone: TIMEZONES_LIST
}

const LiveTab: React.FC<LiveTabProps> = ({
  currentTime,
  alertsEnabled,
  onToggleAlerts,
  selectedTimezone
}) => {
  const [timeUntil, setTimeUntil] = useState('00:00:00');
  const {sessions} = useSession(selectedTimezone)
  const nextKz = getNextKillzone(sessions,selectedTimezone);
  const allKillzones = sessions.flatMap(session => session.killzones);

  useEffect(() => {
    const updateCountdown = () => {
      setTimeUntil(getTimeUntilNext(sessions, selectedTimezone));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [sessions]);


  return (
    <div className="live-tab">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* Current Time */}
        <div className="current-time">
          <Text className="current-time-label">Current Time {selectedTimezone}</Text>
          <div className="current-time-display">
            {currentTime.date}
            <br/>
            {currentTime.time}
          </div>
        </div>

        {/* Active Sessions */}
        <div className="active-sessions">
          <Title className="section-title">Active Sessions</Title>
          <div className="session-blocks">
            {sessions.map(session => (
              <div
                key={session.name}
                className={`session-block ${session.name} ${isSessionActive(session) ? 'active' : ''}`}
              >
                <div>{session.name === 'asia' ? 'Asia' : session.name === 'london' ? 'London' : 'New York'}</div>
                <div className="session-block-label">
                  {session.name === 'asia' ? 'Tokyo' : session.name === 'london' ? 'Europe' : 'US'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Killzone */}
        <Card className="next-killzone-card">
          <Text className="next-killzone-label">Next Killzone</Text>
          <div className="next-killzone-name">
            {nextKz?.name || 'No upcoming killzone'}
          </div>
          <div className="next-killzone-countdown">
            {timeUntil}
          </div>
        </Card>

        {/* Killzones List */}
        <div className="killzones-list">
          <Title className="section-title">Today's Killzones</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            {allKillzones.map((killzone, index) => (
              <div
                key={index}
                className={`killzone-item ${nextKz?.name === killzone.name ? 'active' : ''}`}
              >
                <div className="killzone-name">
                  <span>{killzone.name}</span>
                  {alertsEnabled && killzone.alertEnabled && (
                    <BellOutlined style={{ color: '#00d4aa', fontSize: 12 }} />
                  )}
                </div>
                <Text className="killzone-time">{killzone.time}</Text>
              </div>
            ))}
          </Space>
        </div>

        {/* Alerts Section */}
        <Card className="alerts-section">
          <div className="alerts-header">
            <Title className="section-title">Notifications</Title>
            <Space>
              <Text style={{ fontSize: 12 }}>Alerts</Text>
              <Switch
                checked={alertsEnabled}
                onChange={onToggleAlerts}
                size="small"
              />
            </Space>
          </div>
          <Text className="alerts-description">
            Get notified 15 minutes before killzones
          </Text>
        </Card>
      </Space>
    </div>
  );
};

export default LiveTab;