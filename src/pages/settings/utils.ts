import { AnimeDetails, CourseItem } from '../../types';
import { ChallengeData, ChallengeEntry } from '../challenges/types';
import { ConfigData } from '../config/types';
import get from 'lodash/get';
import { signupText } from './data/signup';
import {
  CHALLENGE_LIST,
  COURSE_DATA,
  getEnabledChallenges,
} from '../challenges/data/data';
import { courseText } from './data/course';

const COURSE_COLORS = {
  drink: '5B2C6F',
  starter: '3B6C4C',
  main: '943126',
  side: '916247',
  dessert: 'CA5C2B',
};

export function generateBBCode(
  challengeDetails: ChallengeData,
  configData: ConfigData
) {
  const drink = configData.courses.drink.enabled
    ? generateCourseText(challengeDetails, configData, 'drink', 1)
    : '';
  const starter = configData.courses.starter.enabled
    ? generateCourseText(challengeDetails, configData, 'starter', 2)
    : '';
  const main = configData.courses.main.enabled
    ? generateCourseText(challengeDetails, configData, 'main', 3)
    : '';
  const side = configData.courses.side.enabled
    ? generateCourseText(challengeDetails, configData, 'side', 4)
    : '';
  const dessert = configData.courses.dessert.enabled
    ? generateCourseText(challengeDetails, configData, 'dessert', 5)
    : '';
  const coursesText = [drink, starter, main, side, dessert]
    .filter((m) => !!m)
    .join('\n\n');

  const templateData = {
    challengeDetails,
    configData,
    coursesText,
    ...calculateStartEndDates(
      Object.values(getEnabledChallenges(configData.courses, challengeDetails))
    ),
  };

  return replaceTemplates(signupText, templateData);
}

function replaceTemplates(text: string, data: Record<string, unknown>) {
  const templates = [...text.matchAll(/\{\{([^}]+)\}\}/g)];

  let output = text;
  for (const match of templates) {
    const key = match[1];
    const value = get(data, key, '') as string;
    output = output.replace(match[0], value);
  }

  return output;
}

function legendToColor(legend: ConfigData['legend'], entry: ChallengeEntry) {
  if (!entry.startDate) {
    return legend.ptw;
  } else if (!entry.endDate) {
    return legend.watching;
  } else {
    return legend.completed;
  }
}

function formatDate(date: string) {
  if (!date) {
    return '';
  }

  const dateMap: Record<string, string> = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  const [_year, month, day] = date.split('-');
  return `${dateMap[month]} ${day}`;
}

function calculateStartEndDates(challenges: ChallengeEntry[]) {
  const startDates = challenges
    .map((c) => c.malId && c.startDate)
    .filter((c) => !!c);
  const endDates = challenges
    .map((c) => c.malId && c.endDate)
    .filter((c) => !!c);

  return {
    startDate: startDates.length
      ? startDates.reduce((min, date) => (date < min ? date : min))
      : '',
    finishDate: endDates.length
      ? endDates.reduce((max, date) => (date > max ? date : max))
      : '',
  };
}

function formatEntry(params: {
  anime?: AnimeDetails;
  challenge: ChallengeEntry;
  legend: ConfigData['legend'];
  extraInfoColor: string;
  course: CourseItem;
}) {
  const { anime, challenge, course, legend, extraInfoColor } = params;
  const extraInfo = challenge.extraInfo.filter(
    (i) => !i.courses || i.courses.includes(course)
  );
  return [
    '[*]',
    `[color=${legendToColor(legend, challenge)}]`,
    `[Started: ${formatDate(challenge.startDate)}] [Finished: ${formatDate(challenge.endDate)}]`,
    '[/color] ',
    `${CHALLENGE_LIST[challenge.id].bbCode}\n`,
    `[url=https://myanimelist.net/anime/${challenge.malId ?? ''}]`,
    `${anime?.title ?? 'ANIME_TITLE'}`,
    '[/url]',
    `${extraInfo.length ? `\n[color=#${extraInfoColor}][${extraInfo.map((i) => `${i.key} ${i.value}`).join(' | ')}][/color]` : ''}`,
  ].join('');
}

function formatCourseValidatorInfo(
  info: Record<string, string>,
  color: string
) {
  return info
    ? Object.entries(info)
        .map(
          ([key, value]) =>
            `[color=#${color}][b]${key} Used :[/b][/color] ${value}`
        )
        .join('\n') + '\n'
    : '';
}

function generateCourseText(
  challengeDetails: ChallengeData,
  configData: ConfigData,
  course: keyof ConfigData['courses'],
  courseNumber: number
) {
  const courseItem = configData.courses[course].value;
  const challenges = Object.values(challengeDetails).filter(
    (entry) => entry.courses.includes(courseItem) && entry.malId
  );

  return replaceTemplates(courseText, {
    courseNumber,
    courseTitle: `${courseItem.toUpperCase()}: ${COURSE_DATA[courseItem].label}`,
    courseColor: COURSE_COLORS[course],
    courseValidatorInfo: formatCourseValidatorInfo(
      configData.courseValidatorInfo[courseItem],
      COURSE_COLORS[course]
    ),
    courseChallenges: challenges
      .map((challenge) =>
        formatEntry({
          anime: challenge.animeData,
          challenge,
          legend: configData.legend,
          extraInfoColor: COURSE_COLORS[course],
          course: courseItem,
        })
      )
      .join('\n\n'),
  });
}
