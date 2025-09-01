import React from 'react';
import { ConfigProvider, theme } from 'antd';
import ForexSessionTracker from './components/ForexSessionTracker';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00d4aa',
          borderRadius: 8,
        },
      }}
    >
      <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <ForexSessionTracker />
      </div>
    </ConfigProvider>
  );
};

export default App;