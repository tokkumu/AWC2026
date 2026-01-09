import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { SettingsProps } from './types';
import { generateBBCode } from './utils';
import DataBackup from './DataBackup';
import { loadAnime } from '../../utils';
import { useState } from 'react';
import { getEnabledCourses } from '../challenges/data/data';
import { ChallengeEntry } from '../challenges/types';
import { ConfigData } from '../config/types';

const Settings = (props: SettingsProps) => {
  const [loading, setLoading] = useState(false);

  const onLoadAnime = async () => {
    setLoading(true);
    for (const [challengeId, entry] of Object.entries(props.challengeData)) {
      if (!entry.malId || entry.animeData) continue;
      const animeData = await loadAnime(entry.malId);

      props.setChallengeData((challengeData) => ({
        ...challengeData,
        [challengeId]: {
          ...entry,
          animeData,
        },
      }));

      await new Promise((resolve) => setTimeout(resolve, 2400));
    }
    setLoading(false);
  };

  const isChallengeInEnabledCourse = (
    challenge: ChallengeEntry,
    courses: ConfigData['courses']
  ) => {
    const enabledCourses = getEnabledCourses(courses);
    for (const course of challenge.courses) {
      if (enabledCourses[course]) return true;
    }
    return false;
  };

  return (
    <div>
      <DataBackup {...props} />

      <Typography variant="h5" marginLeft="1%" marginTop="10px">
        Load Anime
      </Typography>
      <Typography variant="body1" marginLeft="1%">
        Load all anime which have a MAL Id specified but have not loaded the
        anime's data.
      </Typography>
      <Button
        disabled={loading}
        onClick={onLoadAnime}
        sx={{ backgroundColor: 'white', marginLeft: '1%', marginRight: '10px' }}
      >
        Load Anime
      </Button>

      <Typography variant="h5" marginLeft="1%" marginTop="10px">
        Output BBCode
      </Typography>
      <textarea
        readOnly
        style={{
          width: '98%',
          marginLeft: '1%',
          marginBottom: '20px',
          height: '200px',
          resize: 'none',
        }}
        value={generateBBCode(props.challengeData, props.configData)}
      />

      <Typography variant="h5" marginLeft="1%" marginTop="10px">
        Orphaned Anime
      </Typography>
      <Typography variant="body1" marginLeft="1%">
        Anime whose courses have been disabled but are still set.
      </Typography>
      <List
        sx={{
          width: '98%',
          marginLeft: '1%',
          marginBottom: '20px',
          bgcolor: '#333',
        }}
      >
        {Object.values(props.challengeData)
          .filter(
            (challenge) =>
              challenge.malId &&
              !isChallengeInEnabledCourse(challenge, props.configData.courses)
          )
          .map((c) => (
            <ListItem key={c.id}>
              <ListItemText
                primary={
                  <div>
                    Anime:{' '}
                    <a href={`https://myanimelist.net/anime/${c.malId}`}>
                      {c.animeData?.title ?? 'Unknown Title'}
                    </a>
                  </div>
                }
                secondary={
                  <div>
                    Challenge: {c.id} - Courses: {c.courses.join(', ')}
                  </div>
                }
              />
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default Settings;
