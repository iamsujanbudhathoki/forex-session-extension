import { Badge, Card, Select, Space, Typography } from 'antd';
import React from 'react';
import { useSession } from '../hooks/useSession';
import { TIMEZONES, type TIMEZONES_LIST } from '../utils/constants';
import { convertTimeToTimezone } from '../utils/timeUtils';

const { Title, Text } = Typography;
const { Option } = Select;

interface ScheduleTabProps {
  selectedTimezone: TIMEZONES_LIST;
  onTimezoneChange: (timezone: TIMEZONES_LIST) => void;
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({
  selectedTimezone,
  onTimezoneChange
}) => {
  const { sessions } = useSession(selectedTimezone)
  return (
    <div className="schedule-tab">
      <Space direction="vertical" style={{ width: '100%', overflow: "auto" }} size="large">
        {/* Timezone Selector */}
        <div className="timezone-selector">
          <Select
            value={selectedTimezone}
            onChange={onTimezoneChange}
            className="timezone-select"
          >
            {TIMEZONES.map(tz => (
              <Option key={tz.value} value={tz.value}>
                {tz.label}
              </Option>
            ))}
          </Select>
        </div>

        {/* Sessions Schedule */}
        <div>
          <Title className="section-title">Today's Sessions</Title>
          <div className="schedule-sessions">
            {sessions.map((session, index) => (
              <Card
                key={session.name}
                className={`schedule-session-card ${session.name}`}
              >
                <div className="schedule-session-content">
                  <div className="session-info">
                    <div className="session-name">{session.displayName}</div>
                    <Text className="session-time">
                      {convertTimeToTimezone(session.openTime, TIMEZONES[2].value, selectedTimezone)} - {convertTimeToTimezone(session.closeTime, TIMEZONES[2].value, selectedTimezone)}
                    </Text>
                    {index > 0 && (
                      <div className="overlap-badge">
                        <Badge
                          count="Overlap"
                          style={{
                            backgroundColor: '#00d4aa',
                            color: '#1a1a1a',
                            fontSize: 10
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="killzones-info">
                    <Text className="killzones-label">Killzones</Text>
                    {session.killzones.map((kz, kzIndex) => (
                      <div key={kzIndex} className="killzone-time-item">
                        <Text>
                          {kz.name}: {convertTimeToTimezone(kz.time, TIMEZONES[2].value, selectedTimezone)}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Space>
    </div>
  );
};

export default ScheduleTab;