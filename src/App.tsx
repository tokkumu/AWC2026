import React, { useEffect, useState } from 'react';
import Header from './Header';
import Config from './pages/config/Config';
import Challenges from './pages/challenges/Challenges';
import { ConfigData } from './pages/config/types';
import { ChallengeData } from './pages/challenges/types';
import {
  generateChallengeData,
  generateCourseValidatorInfo,
} from './pages/challenges/data/data';
import Settings from './pages/settings/Settings';
import Stats from './pages/stats/Stats';
import ReactGA from 'react-ga4';
import Import from './pages/import/Import';
import { Drink, Starter, Main, Side, Dessert } from './types';

ReactGA.initialize('GT-KDTSJ7PP');

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Config');

  const pages = {
    Config: 'Config',
    Challenges: 'Challenges',
    Stats: 'Stats',
    Import: 'Import',
    Settings: 'Settings',
  };

  const savedConfigData = localStorage.getItem('configData2026');
  const [configData, setConfigData] = useState<ConfigData>(
    savedConfigData
      ? JSON.parse(savedConfigData)
      : {
          username: '',
          completedAnime: '',
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          animeInForum: '',
          initialPostNumber: '000',
          legend: {
            ptw: 'GRAY',
            watching: 'MEDIUMPURPLE',
            completed: 'SEAGREEN',
          },
          courses: {
            drink: {
              enabled: false,
              value: Drink.Coffee,
            },
            starter: {
              enabled: false,
              value: Starter.Soup,
            },
            main: {
              enabled: false,
              value: Main.Burger,
            },
            side: {
              enabled: false,
              value: Side.Fries,
            },
            dessert: {
              enabled: false,
              value: Dessert.Cake,
            },
          },
          courseValidatorInfo: generateCourseValidatorInfo(),
        }
  );

  useEffect(() => {
    localStorage.setItem('configData2026', JSON.stringify(configData));
  }, [configData]);

  const savedChallengeData = localStorage.getItem('challengeData2026');
  const [challengeData, setChallengeData] = useState<ChallengeData>(
    savedChallengeData
      ? JSON.parse(savedChallengeData)
      : generateChallengeData()
  );

  useEffect(() => {
    localStorage.setItem('challengeData2026', JSON.stringify(challengeData));
  }, [challengeData]);

  const handlePageClick = (page: string): void => {
    setActiveTab(page);
  };

  return (
    <div className="app-container">
      <Header pages={pages} onPageSelect={handlePageClick} />
      <div className="page-content">
        {activeTab === 'Config' && (
          <Config configData={configData} setConfigData={setConfigData} />
        )}
        {activeTab === 'Challenges' && (
          <Challenges
            challengeData={challengeData}
            setChallengeData={setChallengeData}
            config={configData}
          />
        )}
        {activeTab === 'Stats' && (
          <Stats configData={configData} challengeData={challengeData} />
        )}
        {activeTab === 'Import' && (
          <Import
            challengeData={challengeData}
            setChallengeData={setChallengeData}
          />
        )}
        {activeTab === 'Settings' && (
          <Settings
            challengeData={challengeData}
            setChallengeData={setChallengeData}
            configData={configData}
            setConfigData={setConfigData}
          />
        )}
      </div>
    </div>
  );
};

export default App;
