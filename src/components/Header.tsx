import React from 'react';
import { Button, Typography } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface HeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleTheme }) => {
  return (
    <div className="header">
      <Title className="header-logo">
        FX Session Tracker
      </Title>
      <Button
        size="small"
        icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
        onClick={onToggleTheme}
        className="header-theme-btn"
      >
        {darkMode ? 'Light' : 'Dark'}
      </Button>
    </div>
  );
};

export default Header;