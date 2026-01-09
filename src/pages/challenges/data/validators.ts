import { AnimeDetails, CourseItem } from '../../../types';
import { ConfigData } from '../../config/types';
import { ChallengeData } from '../types';
import { CHALLENGE_LIST, COURSE_DATA } from './data';
import {
  ValidationStatus,
  Validator,
  ValidatorParams,
  ValidatorStatus,
} from './types';

export function validateAnime(
  config: ConfigData,
  challengeData: ChallengeData,
  challengeId: string,
  course: CourseItem
): ValidationStatus {
  if (!challengeData[challengeId].animeData) {
    return { valid: false, success: [], error: ['Anime not found'] };
  }

  const params: ValidatorParams = {
    anime: challengeData[challengeId].animeData,
    config,
    entry: challengeData[challengeId],
    course,
  };

  const allValidators = [
    validateUniqueAnime(challengeData),
    validateStartYear(),
    validateEndYear(),
    validateStartEndDates(),
    validateManualValidators(),
    validateExtraInfo(),
    ...COURSE_DATA[course].validators,
    ...CHALLENGE_LIST[challengeId].validators,
  ];

  return buildResponse(allValidators.map((validator) => validator(params)));
}

function buildResponse(criteria: ValidatorStatus[]): ValidationStatus {
  return {
    valid: criteria.every((criterion) => criterion.valid),
    success: criteria
      .filter((criterion) => criterion.valid)
      .map((criterion) => criterion.criterion),
    error: criteria
      .filter((criterion) => !criterion.valid)
      .map((criterion) => criterion.criterion),
  };
}

function arrayToList(arr: string[]): string {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')} or ${arr[arr.length - 1]}`;
}

function numberToMonth(num: number): string {
  return new Date(0, num - 1).toLocaleString('en', { month: 'long' });
}

export function validateUniqueAnime(challengeData: ChallengeData): Validator {
  return ({ anime, entry }: ValidatorParams) => {
    for (const challenge of Object.values(challengeData)) {
      if (entry.id === challenge.id) {
        continue;
      }
      if (challenge.animeData?.malId === anime.malId) {
        return {
          criterion: 'Anime already used in challenge ' + challenge.id,
          valid: false,
        };
      }
    }
    return { criterion: 'Anime must be unique', valid: true };
  };
}

export function validateStartYear(): Validator {
  return ({ entry }: ValidatorParams) => {
    return {
      criterion: 'Anime must be started in 2026',
      valid: !entry.startDate || entry.startDate.startsWith('2026'),
    };
  };
}

export function validateEndYear(): Validator {
  return ({ entry }: ValidatorParams) => {
    return {
      criterion: 'Anime must be finished in 2026',
      valid: !entry.endDate || entry.endDate.startsWith('2026'),
    };
  };
}

export function validateStartEndDates(): Validator {
  return ({ entry }: ValidatorParams) => {
    return {
      criterion: 'Anime must be started before it is finished',
      valid:
        !entry.startDate || !entry.endDate || entry.startDate <= entry.endDate,
    };
  };
}

export function validateManualValidators(): Validator {
  return ({ entry, course }: ValidatorParams) => {
    return {
      criterion: 'All manual validators must be validated',
      valid: Object.values(entry.manualValidators)
        .filter((v) => !v.courses || v.courses.includes(course))
        .every((v) => v.valid),
    };
  };
}

export function validateExtraInfo(): Validator {
  return ({ entry, course }: ValidatorParams) => {
    return {
      criterion: 'All default extra info must be specified',
      valid: Object.values(entry.extraInfo)
        .filter((i) => i.required)
        .filter((i) => !i.courses || i.courses.includes(course))
        .every((v) => v.value),
    };
  };
}

export function validateType(allowedTypes: string[]): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must be of type ${arrayToList(allowedTypes)}`,
      valid: allowedTypes.includes(params.anime.type),
    };
  };
}

export function validateEpisodeCount(
  count: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have ${exp === 'gte' ? 'at least' : 'at most'} ${count} episodes`,
      valid:
        exp === 'gte'
          ? params.anime.episodes >= count
          : params.anime.episodes <= count,
    };
  };
}

export function validateRuntime(
  duration: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    const runtime = params.anime.episodeDurationMinutes * params.anime.episodes;
    return {
      criterion: `Anime must have ${exp === 'gte' ? 'at least' : 'at most'} ${duration} minutes of runtime`,
      valid: exp === 'gte' ? runtime >= duration : runtime <= duration,
    };
  };
}

export function validateEpisodeDuration(
  duration: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have ${exp === 'gte' ? 'at least' : 'at most'} ${duration} minutes per episode`,
      valid:
        exp === 'gte'
          ? params.anime.episodeDurationMinutes >= duration
          : params.anime.episodeDurationMinutes <= duration,
    };
  };
}

export function validateStartDate(date: string, exp: 'gte' | 'lte'): Validator {
  return (params: ValidatorParams) => {
    const { year, month, day } = params.anime.aired.from;
    const startDate = `${year}-${month}-${day}`;
    return {
      criterion: `Anime must ${exp === 'gte' ? 'start airing on or after' : 'start airing on or before'} ${date}`,
      valid: exp === 'gte' ? startDate >= date : startDate <= date,
    };
  };
}

export function validateBroadcastDate(days: string[]): Validator {
  return (params: ValidatorParams) => {
    const broadcastDate = params.anime.aired.day;
    return {
      criterion: `Anime must air on ${arrayToList(days)}`,
      valid: days.includes(broadcastDate),
    };
  };
}

export function validateStartMonth(months: number[]): Validator {
  return (params: ValidatorParams) => {
    const startMonth = params.anime.aired.from.month;
    return {
      criterion: `Anime must start airing in ${arrayToList(months.map(numberToMonth))}`,
      valid: months.includes(startMonth),
    };
  };
}

export function validateTitleUsername(): Validator {
  return (params: ValidatorParams) => {
    const animeFirstLetter = params.anime.title.charAt(0);
    const usernameFirstLetter = params.config.username.charAt(0);

    if (!animeFirstLetter.match(/[a-z0-9]/i)) {
      return {
        criterion: 'Username must start with same letter as anime title',
        valid: !!usernameFirstLetter.match(/[a-z0-9]/i),
      };
    }

    return {
      criterion: 'Username must start with same letter as anime title',
      valid:
        animeFirstLetter.toLowerCase() === usernameFirstLetter.toLowerCase(),
    };
  };
}

export function validateSource(sources: string[]): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must be from ${arrayToList(sources)}`,
      valid: sources
        .map((s) => s.toLowerCase())
        .includes(params.anime.source.toLowerCase()),
    };
  };
}

export function validateRating(ratings: string[]): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have a rating of ${arrayToList(ratings)}`,
      valid: ratings.includes(params.anime.rating),
    };
  };
}

export function validateGenreCount(count: number, exp: 'lte' | 'gte') {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have ${exp === 'gte' ? 'at least' : 'at most'} ${count} genres`,
      valid:
        exp === 'gte'
          ? params.anime.genres.length >= count
          : params.anime.genres.length <= count,
    };
  };
}

export function validateTags(requiredTags: string[], requiredCount: number) {
  return (params: ValidatorParams) => {
    const { genres, themes, demographics } = params.anime;
    const tags = [...genres, ...themes, ...demographics];
    const tagCount = tags.filter((g) => requiredTags.includes(g)).length;
    return {
      criterion: `Anime must have ${requiredCount} of the following tags: ${arrayToList(requiredTags)}`,
      valid: tagCount >= requiredCount,
    };
  };
}

export function validateFinishedAiring(): Validator {
  return (params: ValidatorParams) => {
    const airEndDate = `${params.anime.aired.to.year}-${params.anime.aired.to.month}-${params.anime.aired.to.day}`;
    return {
      criterion: 'Anime must have finished airing before you started it',
      valid: !params.entry.startDate || airEndDate <= params.entry.startDate,
    };
  };
}

export function validateSongCountEquals(
  requiredOpenings: number,
  requiredEndings: number
): Validator {
  return (params: ValidatorParams) => {
    const { openingCount, endingCount } = params.anime;
    return {
      criterion: `Anime must have ${requiredOpenings} openings and ${requiredEndings} endings`,
      valid:
        openingCount === requiredOpenings && endingCount === requiredEndings,
    };
  };
}

export function validateSongCountAtLeast(
  requiredOpenings: number,
  requiredEndings: number
): Validator {
  return (params: ValidatorParams) => {
    const { openingCount, endingCount } = params.anime;
    return {
      criterion: `Anime must have at least ${requiredOpenings} openings or ${requiredEndings} endings`,
      valid: openingCount >= requiredOpenings || endingCount >= requiredEndings,
    };
  };
}

export function validateAirTime(times: string[]): Validator {
  return (params: ValidatorParams) => {
    const airTime = params.anime.aired.time.split(':')[0];
    return {
      criterion: `Anime must air in one of the following hours: ${arrayToList(times)}`,
      valid: times.includes(airTime),
    };
  };
}

export function validateMainCharacterCountEquals(
  requiredCount: number
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have ${requiredCount} main characters`,
      valid: params.anime.mainCharacters === requiredCount,
    };
  };
}

export function validateMainCharacterCountAtLeast(
  requiredCount: number
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have at least ${requiredCount} main characters`,
      valid: params.anime.mainCharacters >= requiredCount,
    };
  };
}

export function validateMoreMainThanSupporting(): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion:
        'Anime must have more main characters than supporting characters',
      valid: params.anime.mainCharacters > params.anime.supportingCharacters,
    };
  };
}

export function validatePopularity(
  popularity: number,
  exp: 'gt' | 'lt'
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must be ${exp === 'gt' ? 'lower than' : 'higher than'} ${popularity} in popularity`,
      valid:
        exp === 'gt'
          ? params.anime.popularity > popularity
          : params.anime.popularity < popularity,
    };
  };
}

export function validateScore(rating: number, exp: 'gte' | 'lte'): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must be ${exp === 'gte' ? 'at or above' : 'at or below'} ${rating} in rating`,
      valid:
        exp === 'gte'
          ? params.anime.score >= rating
          : params.anime.score <= rating,
    };
  };
}

export function validateScoreContains(strs: string[]): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime score must contain one of the following: ${arrayToList(strs)}`,
      valid: strs.some((score) =>
        params.anime.score.toString().includes(score)
      ),
    };
  };
}

export function validateFavorites(
  favorites: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have ${exp === 'gte' ? 'at least' : 'at most'} ${favorites} favorites`,
      valid:
        exp === 'gte'
          ? params.anime.favorites >= favorites
          : params.anime.favorites <= favorites,
    };
  };
}

export function validateRankingPopularityDiff(
  diff: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    const realDiff = Math.abs(params.anime.rank - params.anime.popularity);
    return {
      criterion: `Anime must have a ranking/popularity difference of ${exp === 'gte' ? 'at least' : 'at most'} ${diff}`,
      valid: exp === 'gte' ? realDiff >= diff : realDiff <= diff,
    };
  };
}

export function validateMALIdContains(s: string): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have MAL ID containing ${s}`,
      valid: params.anime.malId.toString().includes(s),
    };
  };
}

export function validateWordsWithSameLetter(count: number): Validator {
  return (params: ValidatorParams) => {
    const words = params.anime.title
      .toLowerCase()
      .split(' ')
      .filter((w) => w.match(/[a-z]/i))
      .map((w) => w.charAt(0));
    const letterCount = words.reduce(
      (acc, letter) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      criterion: `Anime must have at least ${count} words starting with the same letter`,
      valid: Object.values(letterCount).some((c) => c >= count),
    };
  };
}

export function validateTitleStartsWith(
  letters: string[],
  other: boolean = false
): Validator {
  return (params: ValidatorParams) => {
    const titleFirstLetter = params.anime.title.toUpperCase().charAt(0);
    return {
      criterion: `Anime title must start with ${arrayToList([...letters, ...(other ? ['a number/symbol'] : [])])}`,
      valid:
        letters.includes(titleFirstLetter) ||
        (other && !!titleFirstLetter.match(/[^A-Z]/)),
    };
  };
}

export function validateCompanyStartsWith(
  letters: string[],
  other: boolean = false
): Validator {
  return (params: ValidatorParams) => {
    const criterion = `A Licensor/Producer/Studio must start with ${arrayToList([...letters, ...(other ? ['a number/symbol'] : [])])}`;
    const companies = [
      ...params.anime.licensors,
      ...params.anime.producers,
      ...params.anime.studios,
    ];
    for (const company of companies) {
      const companyFirstLetter = company.toUpperCase().charAt(0);
      if (
        letters.includes(companyFirstLetter) ||
        (other && !!companyFirstLetter.match(/[^A-Z]/))
      ) {
        return {
          criterion,
          valid: true,
        };
      }
    }
    return {
      criterion,
      valid: false,
    };
  };
}

export function validateCompany(companies: string[]): Validator {
  return (params: ValidatorParams) => {
    const animeCompanies = [
      ...params.anime.licensors,
      ...params.anime.producers,
      ...params.anime.studios,
    ];
    return {
      criterion: `Anime must be from one of: ${arrayToList(companies)}`,
      valid: companies.some((company) => animeCompanies.includes(company)),
    };
  };
}

export function validateStudioProducerStartInUsername(): Validator {
  return (params: ValidatorParams) => {
    const companies = [...params.anime.studios, ...params.anime.producers]
      .map((c) => c.charAt(0).toUpperCase())
      .filter((c) => c.match(/[A-Z]/));
    return {
      criterion: `Anime must be made by a studio/producer which starts with a letter in your username.`,
      valid: companies.some((c) =>
        params.config.username.toUpperCase().includes(c)
      ),
    };
  };
}

export function validateStatistics(
  stat: keyof AnimeDetails['statistics'],
  count: number,
  exp: 'gt' | 'lt'
): Validator {
  return (params: ValidatorParams) => {
    return {
      criterion: `Anime must have ${exp === 'gt' ? 'more than' : 'less than'} ${count} ${stat} members`,
      valid:
        exp === 'gt'
          ? params.anime.statistics[stat] > count
          : params.anime.statistics[stat] < count,
    };
  };
}

export function validateTitleNonAlphanumericCount(
  count: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    const title = params.anime.title.replace(/[a-zA-Z0-9 ]/g, '');
    const uniqueChars = new Set(title.split('')).size;
    return {
      criterion: `Anime title must have ${exp === 'gte' ? 'at least' : 'at most'} ${count} different non-alphanumeric characters`,
      valid: exp === 'gte' ? uniqueChars >= count : uniqueChars <= count,
    };
  };
}

export function validateTitleUsernameShareCount(
  count: number,
  exp: 'gte' | 'lte'
): Validator {
  return (params: ValidatorParams) => {
    const title = params.anime.title.toUpperCase();
    const uniqueChars = [...new Set(title.split(''))];
    const sharedChars = uniqueChars.filter((c) =>
      params.config.username.toUpperCase().includes(c)
    );
    return {
      criterion: `Anime title must have ${exp === 'gte' ? 'at least' : 'at most'} ${count} shared characters`,
      valid:
        exp === 'gte'
          ? sharedChars.length >= count
          : sharedChars.length <= count,
    };
  };
}

/**
 * Whole Course Validators
 */
export function cvalidateBroadcastDate(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const day = params.config.courseValidatorInfo[course].Day;
    return {
      criterion: `Anime must air on ${day}`,
      valid: day === params.anime.aired.day,
    };
  };
}

export function cvalidateCompany(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const animeCompanies = [
      ...params.anime.licensors,
      ...params.anime.producers,
      ...params.anime.studios,
    ].map((c) => c.toLowerCase());
    const company =
      params.config.courseValidatorInfo[course]['Licensor/Producor/Studio'];
    return {
      criterion: `Anime must be from ${company}`,
      valid: animeCompanies.includes(company.toLowerCase()),
    };
  };
}

export function cvalidateDemographic(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const demographic = params.config.courseValidatorInfo[course].Demographic;
    return {
      criterion: `Anime must be tagged with ${demographic}`,
      valid: params.anime.demographics.includes(demographic),
    };
  };
}

export function cvalidateStartMonth(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const month = +params.config.courseValidatorInfo[course].Month;
    return {
      criterion: `Anime must have start airing in ${numberToMonth(month)}`,
      valid: month === params.anime.aired.from.month,
    };
  };
}

export function cvalidateSeason(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const season = params.config.courseValidatorInfo[course].Season;
    const seasonMap = {
      Winter: [1, 2, 3],
      Spring: [4, 5, 6],
      Summer: [7, 8, 9],
      Fall: [10, 11, 12],
    };
    return {
      criterion: `Anime must start airing in ${season}`,
      valid: seasonMap[season as keyof typeof seasonMap].includes(
        params.anime.aired.from.month
      ),
    };
  };
}

export function cvalidateEpisodeCount(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const count =
      +params.config.courseValidatorInfo[course]['Number of Episodes'];
    return {
      criterion: `Anime must have ${count} episodes`,
      valid: count === params.anime.episodes,
    };
  };
}

export function cvalidateGenreTheme(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const tags = [...params.anime.genres, ...params.anime.themes].map((c) =>
      c.toLowerCase()
    );
    const tag1 = params.config.courseValidatorInfo[course]['Genre/Theme #1'];
    const tag2 = params.config.courseValidatorInfo[course]['Genre/Theme #2'];
    return {
      criterion: `Anime must be tagged with ${tag2 ? arrayToList([tag1, tag2]) : tag1}`,
      valid:
        tags.includes(tag1.toLowerCase()) || tags.includes(tag2.toLowerCase()),
    };
  };
}

export function cvalidateStartYear(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const year = params.anime.aired.from.year.toString();
    const year1 = params.config.courseValidatorInfo[course]['Year #1'];
    const year2 = params.config.courseValidatorInfo[course]['Year #2'];
    return {
      criterion: `Anime must start airing in ${year2 ? arrayToList([year1, year2]) : year1}`,
      valid: year === year1 || year === year2,
    };
  };
}

export function cvalidateType(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const type = params.config.courseValidatorInfo[course]['Type'];
    return {
      criterion: `Anime must be of type ${type}`,
      valid: params.anime.type === type,
    };
  };
}

export function cvalidateStartsWith(course: CourseItem): Validator {
  return (params: ValidatorParams) => {
    const letter = params.config.courseValidatorInfo[course]['Letter'];
    const titleFirstChar = params.anime.title.toUpperCase().charAt(0);
    return {
      criterion: `Anime title must start with ${letter === 'Other' ? 'a symbol' : letter}`,
      valid:
        letter === 'Other'
          ? !!titleFirstChar.match(/[^a-zA-Z0-9]/)
          : titleFirstChar === letter,
    };
  };
}
