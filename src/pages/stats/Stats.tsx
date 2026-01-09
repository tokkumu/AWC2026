import { Typography } from '@mui/material';
import { StatsProps } from './types';
import {
  getEnabledChallenges,
  getEnabledCourses,
  COURSE_DATA,
} from '../challenges/data/data';
import StatsProgressBar from './StatsProgressBar';
import { CourseItem } from '../../types';

const Stats = (props: StatsProps) => {
  const getAnimeList = () =>
    Object.values(
      getEnabledChallenges(props.configData.courses, props.challengeData)
    ).filter((c) => c.malId);

  const getAnimeListForCourse = (course: CourseItem) =>
    getAnimeList().filter((c) => c.courses.includes(course));

  return (
    <div className="stats">
      <Typography variant="h4">Stats</Typography>
      <Typography variant="h5">Summary</Typography>
      <Typography variant="body1">
        Total Episodes:{' '}
        {getAnimeList().reduce(
          (acc, challenge) => acc + (challenge.animeData?.episodes ?? 0),
          0
        )}
      </Typography>
      <Typography variant="body1">
        Remaining Episodes:{' '}
        {getAnimeList().reduce(
          (acc, challenge) =>
            acc +
            (challenge.animeData?.episodes ?? 0) * (challenge.endDate ? 0 : 1),
          0
        )}
      </Typography>
      <br />
      <Typography variant="h5">Progress</Typography>
      <Typography variant="h6">
        Overall - Required Challenges:{' '}
        {Object.entries(getEnabledCourses(props.configData.courses)).reduce(
          (acc, [course, enabled]) =>
            acc +
            (enabled
              ? COURSE_DATA[course as CourseItem].requiredChallenges
              : 0),
          0
        )}
      </Typography>
      <StatsProgressBar
        ptw={getAnimeList().reduce((acc, challenge) => {
          return acc + (!challenge.startDate ? 1 : 0);
        }, 0)}
        watching={getAnimeList().reduce((acc, challenge) => {
          return acc + (challenge.startDate && !challenge.endDate ? 1 : 0);
        }, 0)}
        complete={getAnimeList().reduce((acc, challenge) => {
          return acc + (challenge.endDate ? 1 : 0);
        }, 0)}
        required={Object.entries(
          getEnabledCourses(props.configData.courses)
        ).reduce(
          (acc, [course, enabled]) =>
            acc +
            (enabled
              ? COURSE_DATA[course as CourseItem].requiredChallenges
              : 0),
          0
        )}
      />
      {Object.entries(getEnabledCourses(props.configData.courses)).map(
        ([course, enabled]) => {
          return (
            <div key={course} hidden={!enabled}>
              <Typography key={`${course}-label`} variant="h6">
                {course} - Required Challenges:{' '}
                {COURSE_DATA[course as CourseItem].requiredChallenges}
              </Typography>
              <StatsProgressBar
                key={`${course}-progress-bar`}
                ptw={getAnimeListForCourse(course as CourseItem).reduce(
                  (acc, challenge) => {
                    return acc + (!challenge.startDate ? 1 : 0);
                  },
                  0
                )}
                watching={getAnimeListForCourse(course as CourseItem).reduce(
                  (acc, challenge) => {
                    return (
                      acc + (challenge.startDate && !challenge.endDate ? 1 : 0)
                    );
                  },
                  0
                )}
                complete={getAnimeListForCourse(course as CourseItem).reduce(
                  (acc, challenge) => {
                    return acc + (challenge.endDate ? 1 : 0);
                  },
                  0
                )}
                required={COURSE_DATA[course as CourseItem].requiredChallenges}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default Stats;
