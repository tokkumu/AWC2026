import {
  CourseItem,
  Drink,
  Starter,
  Main,
  Side,
  COURSE_VALUES,
  Dessert,
} from '../../../types';
import { ConfigData } from '../../config/types';
import { ChallengeData, ManualValidator } from '../types';
import { ChallengeList, CourseData } from './types';
import stringHash from 'string-hash';
import range from 'lodash/range';
import {
  validateAirTime,
  validateBroadcastDate,
  validateCompany,
  validateCompanyStartsWith,
  validateEpisodeCount,
  validateEpisodeDuration,
  validateFavorites,
  validateFinishedAiring,
  validateGenreCount,
  validateMainCharacterCountAtLeast,
  validateMainCharacterCountEquals,
  validateMALIdContains,
  validateMoreMainThanSupporting,
  validateTitleNonAlphanumericCount,
  validatePopularity,
  validateRankingPopularityDiff,
  validateRating,
  validateRuntime,
  validateScore,
  validateScoreContains,
  validateSongCountAtLeast,
  validateSongCountEquals,
  validateSource,
  validateStartDate,
  validateStartMonth,
  validateStatistics,
  validateStudioProducerStartInUsername,
  validateTags,
  validateTitleStartsWith,
  validateTitleUsername,
  validateType,
  validateWordsWithSameLetter,
  validateTitleUsernameShareCount,
  cvalidateBroadcastDate,
  cvalidateCompany,
  cvalidateDemographic,
  cvalidateStartMonth,
  cvalidateSeason,
  cvalidateEpisodeCount,
  cvalidateGenreTheme,
  cvalidateStartYear,
  cvalidateType,
  cvalidateStartsWith,
} from './validators';

export const COURSE_DATA: CourseData = {
  [Drink.Coffee]: {
    label: 'AIRED SAME DAY',
    requiredChallenges: 5,
    extraInfo: [],
    validators: [cvalidateBroadcastDate(Drink.Coffee)],
    manualValidators: [],
    courseValidatorInfo: [
      {
        name: 'Day',
        type: 'select',
        values: range(1, 32).map((n) => n.toString()),
      },
    ],
  },
  [Drink.Tea]: {
    label: 'MAL/ANIME+ RECS',
    requiredChallenges: 5,
    extraInfo: ['MAL/Anime+ Screenshot:'],
    validators: [],
    manualValidators: ['Anime recommended by MAL or Anime+'],
  },
  [Drink.Soda]: {
    label: 'SAME LICENSOR/PRODUCER/STUDIO',
    requiredChallenges: 5,
    extraInfo: [],
    validators: [cvalidateCompany(Drink.Soda)],
    manualValidators: [],
    courseValidatorInfo: [{ name: 'Licensor/Producor/Studio', type: 'text' }],
  },
  [Drink.Lemonade]: {
    label: 'TITLE 5+ WORDS',
    requiredChallenges: 5,
    extraInfo: [],
    validators: [],
    manualValidators: ['Anime title has >=5 words'],
  },
  [Starter.Soup]: {
    label: 'SAME DEMOGRAPHIC',
    requiredChallenges: 20,
    extraInfo: [],
    validators: [cvalidateDemographic(Starter.Soup)],
    manualValidators: [],
    courseValidatorInfo: [
      {
        name: 'Demographic',
        type: 'select',
        values: ['Josei', 'Kids', 'Seinen', 'Shoujo', 'Shounen'],
      },
    ],
  },
  [Starter.Salad]: {
    label: 'MEAN SCORE 7.50 OR LESS',
    requiredChallenges: 20,
    extraInfo: [],
    validators: [validateScore(7.5, 'lte')],
    manualValidators: [],
  },
  [Starter.Gyoza]: {
    label: 'EPISODE DURATION OF 23 MINS OR MORE',
    requiredChallenges: 20,
    extraInfo: [],
    validators: [validateEpisodeDuration(23, 'gte')],
    manualValidators: [],
  },
  [Starter.SpringRolls]: {
    label: 'AIRED IN SAME MONTH',
    requiredChallenges: 20,
    extraInfo: [],
    validators: [cvalidateStartMonth(Starter.SpringRolls)],
    manualValidators: [],
    courseValidatorInfo: [
      {
        name: 'Month',
        type: 'select',
        values: range(1, 13).map((n) => n.toString()),
      },
    ],
  },
  [Starter.Prawns]: {
    label: 'STARTED AIRING BETWEEN 2000 AND 2009',
    requiredChallenges: 20,
    extraInfo: [],
    validators: [
      validateStartDate('2000-01-01', 'gte'),
      validateStartDate('2009-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  [Starter.ChickenWings]: {
    label: 'TV-TYPE ONLY',
    requiredChallenges: 20,
    extraInfo: [],
    validators: [validateType(['TV'])],
    manualValidators: [],
  },
  [Main.Burger]: {
    label: 'MEAN SCORE OF 7.00 OR GREATER',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [validateScore(7.0, 'gte')],
    manualValidators: [],
  },
  [Main.Sushi]: {
    label: 'NON-ALPHANUMERIC CHARACTER IN MAIN TITLE',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [validateTitleNonAlphanumericCount(1, 'gte')],
    manualValidators: [],
  },
  [Main.Spaghetti]: {
    label: 'PG-13 RATING',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [validateRating(['PG-13 - Teens 13 or older'])],
    manualValidators: [],
  },
  [Main.Pizza]: {
    label: '3+ HOURS WATCH TIME',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [validateRuntime(180, 'gte')],
    manualValidators: [],
  },
  [Main.Lasagna]: {
    label: 'STARTED AIRING SAME SEASON',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [cvalidateSeason(Main.Lasagna)],
    manualValidators: [],
    courseValidatorInfo: [
      {
        name: 'Season',
        type: 'select',
        values: ['Winter', 'Spring', 'Summer', 'Fall'],
      },
    ],
  },
  [Main.Sandwich]: {
    label: 'SAME NUMBER OF EPISODES',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [cvalidateEpisodeCount(Main.Sandwich)],
    manualValidators: [],
    courseValidatorInfo: [{ name: 'Number of Epidodes', type: 'text' }],
  },
  [Main.Omurice]: {
    label: 'STARTED AIRING BETWEEN 2021 and 2026',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [
      validateStartDate('2021-01-01', 'gte'),
      validateStartDate('2026-12-10', 'lte'),
    ],
    manualValidators: [],
  },
  [Main.FishAndChips]: {
    label: 'SHARED GENRE/THEME',
    requiredChallenges: 25,
    extraInfo: [],
    validators: [cvalidateGenreTheme(Main.FishAndChips)],
    manualValidators: [],
    courseValidatorInfo: [
      { name: 'Genre/Theme #1', type: 'text' },
      { name: 'Genre/Theme #2', type: 'text' },
    ],
  },
  [Side.Fries]: {
    label: 'SHARED STAFF',
    requiredChallenges: 15,
    extraInfo: [],
    validators: [],
    manualValidators: ['Anime shares a staff member with other sides'],
    courseValidatorInfo: [
      { name: 'Staff #1', type: 'text' },
      { name: 'Staff #2', type: 'text' },
    ],
  },
  [Side.Onigiri]: {
    label: '15 MINUTE OR LESS EPISODES',
    requiredChallenges: 15,
    extraInfo: [],
    validators: [validateEpisodeDuration(15, 'lte')],
    manualValidators: [],
  },
  [Side.OnionRings]: {
    label: 'SHIRITORI CHAIN',
    requiredChallenges: 15,
    extraInfo: [],
    validators: [],
    manualValidators: ['Anime valid for shiritori chain'],
  },
  [Side.GarlicBread]: {
    label: 'R-17/R+/Rx RATING',
    requiredChallenges: 15,
    extraInfo: [],
    validators: [
      validateRating([
        'R - 17+ (violence & profanity)',
        'R+ - Mild Nudity',
        'Rx - Hentai',
      ]),
    ],
    manualValidators: [],
  },
  [Side.TheMelon]: {
    label: 'STARTED AIRING BETWEEN 2011 AND 2020',
    requiredChallenges: 15,
    extraInfo: [],
    validators: [
      validateStartDate('2011-01-01', 'gte'),
      validateStartDate('2020-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  [Side.Tofu]: {
    label: 'MOVIES ONLY',
    requiredChallenges: 15,
    extraInfo: [],
    validators: [validateType(['Movie'])],
    manualValidators: [],
  },
  [Dessert.Cake]: {
    label: 'STARTED AIRING SAME YEAR',
    requiredChallenges: 10,
    extraInfo: [],
    validators: [cvalidateStartYear(Dessert.Cake)],
    manualValidators: [],
    courseValidatorInfo: [
      { name: 'Year #1', type: 'text' },
      { name: 'Year #2', type: 'text' },
    ],
  },
  [Dessert.IceCream]: {
    label: 'SAME TYPE',
    requiredChallenges: 10,
    extraInfo: [],
    validators: [cvalidateType(Dessert.IceCream)],
    manualValidators: [],
    courseValidatorInfo: [
      {
        name: 'Type',
        type: 'select',
        values: [
          'TV',
          'OVA',
          'Movie',
          'Special',
          'ONA',
          'Music',
          'TV Special',
          'PV',
          'CM',
        ],
      },
    ],
  },
  [Dessert.Cookie]: {
    label: 'MAIN TITLE 5 WORDS OR LESS',
    requiredChallenges: 10,
    extraInfo: [],
    validators: [],
    manualValidators: ['Anime title has <=5 words'],
  },
  [Dessert.ApplePie]: {
    label: 'MAIN TITLE STARTS WITH SAME LETTER',
    requiredChallenges: 10,
    extraInfo: [],
    validators: [cvalidateStartsWith(Dessert.ApplePie)],
    manualValidators: [],
    courseValidatorInfo: [
      {
        name: 'Letter',
        type: 'select',
        values: [
          ...String.fromCharCode(...range(65, 91)).split(''),
          ...range(10).map((n) => n.toString()),
          'Other',
        ],
      },
    ],
  },
  [Dessert.Milkshake]: {
    label: 'MC WITH UNNATURAL HAIR COLOR',
    requiredChallenges: 10,
    extraInfo: [],
    validators: [],
    manualValidators: [
      'Anime has main character with blue, green, pink, or purple hair',
    ],
  },
  [Dessert.Dango]: {
    label: 'STARTED AIRING 1999 OR EARLIER',
    requiredChallenges: 10,
    extraInfo: [],
    validators: [validateStartDate('1999-12-31', 'lte')],
    manualValidators: [],
  },
};

export const CHALLENGE_LIST: ChallengeList = {
  '1': {
    bbCode:
      "(1) Watch an anime an active [url=https://myanimelist.net/forum/?topicid=1867298#msg60815692][b]MAL Staff Member[/b][/url] (not AWC Staff) has listed in their 'MAL Score vs Anime Score' profile statistics",
    description:
      '(1) Watch an anime an active <a href="https://myanimelist.net/forum/?topicid=1867298#msg60815692">MAL Staff Member</a> (not AWC Staff) has listed in their \'MAL Score vs Anime Score\' profile statistics',
    addlInfo: [
      '— On the MAL user\'s profile click "All Anime Stats" just above the anime Mean Score or click "Statistics" under the Joined date',
    ],
    defaultExtraInfo: ['MAL Staff:', 'Screenshot:'],
    courses: [Main.Burger, Main.Lasagna, Main.Pizza],
    validators: [],
    manualValidators: [
      "Active MAL staff member has anime listed in 'MAL Score vs Anime Score'",
    ],
  },
  '2': {
    bbCode:
      '(2) Watch an anime from a [url=https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68289129][b]Stack[/b][/url] provided by an active AWC Staff Member',
    description:
      '(2) Watch an anime from a <a href="https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68289129">Stack</a> provided by an active AWC Staff Member',
    addlInfo: [],
    defaultExtraInfo: ['AWC Staff Stack:'],
    courses: [Starter.ChickenWings, Starter.Gyoza],
    validators: [],
    manualValidators: ['Anime in one of the listed stacks'],
  },
  '3': {
    bbCode:
      '(3) Watch an anime [u]after[/u] an [url=https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68289129][b]AWC Staff Member[/b][/url] has completed and rated it 8.00 or higher',
    description:
      '(3) Watch an anime <u>after</u> an <a href="https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68289129">AWC Staff Member</a> has completed and rated it 8.00 or higher',
    addlInfo: [],
    defaultExtraInfo: ['AWC Staff:'],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Omurice,
      Main.Spaghetti,
      Main.Sushi,
    ],
    validators: [],
    manualValidators: [
      'Anime completed by AWC Staff Member prior to starting',
      'Anime rated >= 8.00 by AWC Staff Member',
    ],
  },
  '4': {
    bbCode:
      '(4) Watch an anime recommended to you in the [url=https://myanimelist.net/forum/?topicid=2237153][b]AWC 2026 Staff Recs[/b][/url] thread by an active [url=https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68289129][b]AWC Staff Member[/b][/url]',
    description:
      '(4) Watch an anime recommended to you in the <a href="https://myanimelist.net/forum/?topicid=2237153">AWC 2026 Staff Recs</a> thread by an active <a href="https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68289129">AWC Staff Member</a>',
    addlInfo: [],
    defaultExtraInfo: ['Staff Rec Link:'],
    courses: [Dessert.ApplePie, Dessert.IceCream, Dessert.Milkshake],
    validators: [],
    manualValidators: ['Anime recommended to you in AWC 2026 Staff Recs'],
  },
  '5': {
    bbCode:
      '(5) Watch an anime recommended to you in the [url=https://myanimelist.net/forum/?topicid=2237155][b]AWC 2026 Participant Recs[/b][/url] thread',
    description:
      '(5) Watch an anime recommended to you in the <a href="https://myanimelist.net/forum/?topicid=2237155">AWC 2026 Participant Recs</a> thread',
    addlInfo: [],
    defaultExtraInfo: ['Participant Rec Link:'],
    courses: [Side.GarlicBread, Side.Onigiri, Side.TheMelon, Side.Tofu],
    validators: [],
    manualValidators: ['Anime recommended to you in AWC 2026 Participant Recs'],
  },
  '6': {
    bbCode:
      '(6) Watch an anime [u]after[/u] a 2026 participant with a [url=https://myanimelist.net/forum/?topicid=2245806][b]sign-up post[/b][/url] on page 1-3 completed and rated it 9.00 or higher',
    description:
      '(6) Watch an anime <u>after</u> a 2026 participant with a <a href="https://myanimelist.net/forum/?topicid=2245806">sign-up post</a> on page 1-3 completed and rated it 9.00 or higher',
    addlInfo: [],
    defaultExtraInfo: [
      'Participant:',
      'Link to Their Post:',
      'Link to Their Completed List:',
    ],
    courses: [Main.FishAndChips, Main.Lasagna, Main.Omurice, Main.Sandwich],
    validators: [],
    manualValidators: [
      'Anime completed by participant prior to starting',
      'Anime rated >= 9.00 by participant',
      'Participant on page 1-3 of the sign-up post',
    ],
  },
  '7': {
    bbCode:
      '(7) Watch an anime [u]after[/u] a 2026 participant has completed it for the current challenge',
    description:
      '(7) Watch an anime <u>after</u> a 2026 participant has completed it for the current challenge',
    addlInfo: [],
    defaultExtraInfo: ['Participant:', 'Item Used For:', 'Link to Their Post:'],
    courses: [Side.GarlicBread, Side.Onigiri],
    validators: [],
    manualValidators: ['Anime completed by participant prior to starting'],
  },
  '8': {
    bbCode:
      '(8) Watch an anime [u]after[/u] a 2026 participant watched 1 or more eps and dropped or put it on-hold September 30, 2025 or earlier',
    description:
      '(8) Watch an anime <u>after</u> a 2026 participant watched 1 or more eps and dropped or put it on-hold September 30, 2025 or earlier',
    addlInfo: [
      '— If participant does not track Start/Finish dates, their Last Updated must show a date of September 30, 2025 or earlier',
    ],
    defaultExtraInfo: [
      'AWC Participant:',
      'Their Post Link:',
      'Screenshot of Their Dropped/On-Hold:',
    ],
    courses: [
      Starter.ChickenWings,
      Starter.Gyoza,
      Starter.Soup,
      Starter.SpringRolls,
    ],
    validators: [],
    manualValidators: ['Anime dropped/put on-hold prior to September 30, 2025'],
  },
  '9': {
    bbCode:
      "(9) Watch an anime featured in a 2026 participant's forum avatar or signature",
    description:
      "(9) Watch an anime featured in a 2026 participant's forum avatar or signature",
    addlInfo: [
      '— The character in the avatar/signature must appear in the anime you choose to watch, not just the series in general',
    ],
    defaultExtraInfo: ['Participant:', 'Link to Their Post:'],
    courses: [Main.Burger, Main.Sushi],
    validators: [],
    manualValidators: [
      'Character from avatar or signature appears in the anime',
    ],
  },
  '10': {
    bbCode:
      "(10) Watch an anime a 2026 participant has listed in their 'Popularity vs Anime Score' profile statistics and provide a screenshot",
    description:
      "(10) Watch an anime a 2026 participant has listed in their 'Popularity vs Anime Score' profile statistics and provide a screenshot",
    addlInfo: [
      '— On the MAL user\'s profile click "All Anime Stats" just above the anime Mean Score or click "Statistics" under the Joined date',
    ],
    defaultExtraInfo: ['Participant:', 'Their Post Link:', 'Screenshot:'],
    courses: [Starter.ChickenWings],
    validators: [],
    manualValidators: [
      "Participant has anime listed in 'Popularity vs Anime Score'",
    ],
  },
  '11': {
    bbCode:
      '(11) Watch a TV-type anime with an episode duration of [url=https://github.com/nyomdalee/awc-helper-txt/blob/master/Anime%20by%20Episode%20Duration/TV%20type%20with%20episode%20duration%20of%2025min%20or%20more.txt][b]25 minutes[/b][/url] or more',
    description:
      '(11) Watch a TV-type anime with an episode duration of <a href="https://github.com/nyomdalee/awc-helper-txt/blob/master/Anime%20by%20Episode%20Duration/TV%20type%20with%20episode%20duration%20of%2025min%20or%20more.txt">25 minutes</a> or more',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Lasagna, Main.Pizza],
    validators: [validateType(['TV']), validateEpisodeDuration(25, 'gte')],
    manualValidators: [],
  },
  '12': {
    bbCode: '(12) Watch an ONA, OVA, or Special that has 10+ episodes',
    description: '(12) Watch an ONA, OVA, or Special that has 10+ episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Salad, Starter.Soup],
    validators: [
      validateType(['ONA', 'OVA', 'Special']),
      validateEpisodeCount(10, 'gte'),
    ],
    manualValidators: [],
  },
  '13': {
    bbCode:
      '(13) Watch a Movie with a total duration of 1 hour 30 minutes or more',
    description:
      '(13) Watch a Movie with a total duration of 1 hour 30 minutes or more',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cake, Dessert.Cookie],
    validators: [validateType(['Movie']), validateRuntime(90, 'gte')],
    manualValidators: [],
  },
  '14': {
    bbCode:
      '(14) Watch a TV-type anime with an irregular release schedule (an ep released more than/less than 7 days after its previous ep)',
    description:
      '(14) Watch a TV-type anime with an irregular release schedule (an ep released more than/less than 7 days after its previous ep)',
    addlInfo: [
      "— If the episode air dates are not listed in the anime's Episodes tab, you must provide a reliable source of this information (AniDB, AnimeNewsNetwork, etc.)",
    ],
    defaultExtraInfo: [],
    courses: [Side.GarlicBread, Side.TheMelon],
    validators: [validateType(['TV'])],
    manualValidators: ['Anime has an irregular release schedule'],
  },
  '15': {
    bbCode: '(15) Watch an anime with 2 to 6 episodes',
    description: '(15) Watch an anime with 2 to 6 episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.GarlicBread, Side.TheMelon],
    validators: [
      validateEpisodeCount(2, 'gte'),
      validateEpisodeCount(6, 'lte'),
    ],
    manualValidators: [],
  },
  '16': {
    bbCode: '(16) Watch an anime with 10 or more episodes',
    description: '(16) Watch an anime with 10 or more episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.Lasagna,
      Main.Omurice,
      Main.Spaghetti,
      Main.Sushi,
    ],
    validators: [validateEpisodeCount(10, 'gte')],
    manualValidators: [],
  },
  '17': {
    bbCode: '(17) Watch an anime with 17 or more episodes',
    description: '(17) Watch an anime with 17 or more episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Lasagna,
      Main.Omurice,
      Main.Pizza,
    ],
    validators: [validateEpisodeCount(17, 'gte')],
    manualValidators: [],
  },
  '18': {
    bbCode: '(18) Watch an anime with 26 or more episodes',
    description: '(18) Watch an anime with 26 or more episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cake, Dessert.Dango],
    validators: [validateEpisodeCount(26, 'gte')],
    manualValidators: [],
  },
  '19': {
    bbCode: '(19) Watch an anime with 40 or more episodes',
    description: '(19) Watch an anime with 40 or more episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.ChickenWings, Starter.Gyoza, Starter.Prawns],
    validators: [validateEpisodeCount(40, 'gte')],
    manualValidators: [],
  },
  '20': {
    bbCode: '(20) Watch an anime with 52 or more episodes',
    description: '(20) Watch an anime with 52 or more episodes',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.ChickenWings, Starter.Salad],
    validators: [validateEpisodeCount(52, 'gte')],
    manualValidators: [],
  },
  '21': {
    bbCode:
      '(21) Watch a TV-type anime with a direct Sequel listed under Related Entries',
    description:
      '(21) Watch a TV-type anime with a direct Sequel listed under Related Entries',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Omurice, Main.Pizza, Main.Spaghetti],
    validators: [validateType(['TV'])],
    manualValidators: ['Sequel for this anime is used in item 22'],
  },
  '22': {
    bbCode:
      '(22) Watch a Sequel (any anime type) to the anime used for Item (21)',
    description:
      '(22) Watch a Sequel (any anime type) to the anime used for Item (21)',
    addlInfo: [
      '— These can be watched in whatever order you want; sometimes a "prequel" airs after its "sequel"',
    ],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Omurice, Main.Pizza, Main.Spaghetti],
    validators: [],
    manualValidators: ['This anime is a sequel to the anime used in item 21'],
  },
  '23': {
    bbCode:
      '(23) Watch an anime that began airing between Jan 1, 2020 and Dec 31, 2025',
    description:
      '(23) Watch an anime that began airing between Jan 1, 2020 and Dec 31, 2025',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Pizza,
      Main.Sandwich,
      Main.Sushi,
    ],
    validators: [
      validateStartDate('2020-01-01', 'gte'),
      validateStartDate('2025-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  '24': {
    bbCode:
      '(24) Watch an anime that began airing between Jan 1, 2015 and Dec 31, 2019',
    description:
      '(24) Watch an anime that began airing between Jan 1, 2015 and Dec 31, 2019',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Side.Fries,
      Side.GarlicBread,
      Side.Onigiri,
      Side.OnionRings,
      Side.Tofu,
    ],
    validators: [
      validateStartDate('2015-01-01', 'gte'),
      validateStartDate('2019-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  '25': {
    bbCode:
      '(25) Watch an anime that began airing between Jan 1, 2010 and Dec 31, 2014',
    description:
      '(25) Watch an anime that began airing between Jan 1, 2010 and Dec 31, 2014',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Lasagna,
      Main.Spaghetti,
      Main.Sushi,
    ],
    validators: [
      validateStartDate('2010-01-01', 'gte'),
      validateStartDate('2014-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  '26': {
    bbCode:
      '(26) Watch an anime that began airing between Jan 1, 2000 and Dec 31, 2009',
    description:
      '(26) Watch an anime that began airing between Jan 1, 2000 and Dec 31, 2009',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cookie, Dessert.Milkshake],
    validators: [
      validateStartDate('2000-01-01', 'gte'),
      validateStartDate('2009-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  '27': {
    bbCode:
      '(27) Watch an anime that began airing between Jan 1, 1990 and Dec 31, 1999',
    description:
      '(27) Watch an anime that began airing between Jan 1, 1990 and Dec 31, 1999',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.OnionRings, Side.Tofu],
    validators: [
      validateStartDate('1990-01-01', 'gte'),
      validateStartDate('1999-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  '28': {
    bbCode:
      '(28) Watch an anime that  began airing between Jan 1, 1960 and Dec 31, 1989',
    description:
      '(28) Watch an anime that  began airing between Jan 1, 1960 and Dec 31, 1989',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Salad, Starter.SpringRolls],
    validators: [
      validateStartDate('1960-01-01', 'gte'),
      validateStartDate('1989-12-31', 'lte'),
    ],
    manualValidators: [],
  },
  '29': {
    bbCode: '(29) Watch an anime that started airing on a [b]Monday[/b]',
    description: '(29) Watch an anime that started airing on a <b>Monday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.FishAndChips,
      Main.Omurice,
      Main.Pizza,
      Main.Sandwich,
      Main.Sushi,
    ],
    validators: [validateBroadcastDate(['Monday'])],
    manualValidators: [],
  },
  '30': {
    bbCode: '(30) Watch an anime that started airing on a [b]Tuesday[/b]',
    description: '(30) Watch an anime that started airing on a <b>Tuesday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.GarlicBread, Side.OnionRings],
    validators: [validateBroadcastDate(['Tuesday'])],
    manualValidators: [],
  },
  '31': {
    bbCode: '(31) Watch an anime that started airing on a [b]Wednesday[/b]',
    description:
      '(31) Watch an anime that started airing on a <b>Wednesday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Cake, Dessert.Dango],
    validators: [validateBroadcastDate(['Wednesday'])],
    manualValidators: [],
  },
  '32': {
    bbCode: '(32) Watch an anime that started airing on a [b]Thursday[/b]',
    description: '(32) Watch an anime that started airing on a <b>Thursday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Salad],
    validators: [validateBroadcastDate(['Thursday'])],
    manualValidators: [],
  },
  '33': {
    bbCode: '(33) Watch an anime that started airing on a [b]Friday[/b]',
    description: '(33) Watch an anime that started airing on a <b>Friday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.ChickenWings, Starter.Prawns, Starter.Soup],
    validators: [validateBroadcastDate(['Friday'])],
    manualValidators: [],
  },
  '34': {
    bbCode: '(34) Watch an anime that started airing on a [b]Saturday[/b]',
    description: '(34) Watch an anime that started airing on a <b>Saturday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Burger, Main.FishAndChips, Main.Lasagna, Main.Omurice],
    validators: [validateBroadcastDate(['Saturday'])],
    manualValidators: [],
  },
  '35': {
    bbCode: '(35) Watch an anime that started airing on a [b]Sunday[/b]',
    description: '(35) Watch an anime that started airing on a <b>Sunday</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.GarlicBread],
    validators: [validateBroadcastDate(['Sunday'])],
    manualValidators: [],
  },
  '36': {
    bbCode: '(36) Watch an anime that started airing in [b]January[/b]',
    description: '(36) Watch an anime that started airing in <b>January</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Omurice, Main.Pizza, Main.Sushi],
    validators: [validateStartMonth([1])],
    manualValidators: [],
  },
  '37': {
    bbCode: '(37) Watch an anime that started airing in [b]February[/b]',
    description: '(37) Watch an anime that started airing in <b>February</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Salad],
    validators: [validateStartMonth([2])],
    manualValidators: [],
  },
  '38': {
    bbCode: '(38) Watch an anime that started airing in [b]March[/b]',
    description: '(38) Watch an anime that started airing in <b>March</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Onigiri, Side.OnionRings, Side.Tofu],
    validators: [validateStartMonth([3])],
    manualValidators: [],
  },
  '39': {
    bbCode: '(39) Watch an anime that started airing in [b]April[/b]',
    description: '(39) Watch an anime that started airing in <b>April</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Prawns, Starter.Salad, Starter.Soup],
    validators: [validateStartMonth([4])],
    manualValidators: [],
  },
  '40': {
    bbCode: '(40) Watch an anime that started airing in [b]May[/b]',
    description: '(40) Watch an anime that started airing in <b>May</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.IceCream],
    validators: [validateStartMonth([5])],
    manualValidators: [],
  },
  '41': {
    bbCode: '(41) Watch an anime that started airing in [b]June[/b]',
    description: '(41) Watch an anime that started airing in <b>June</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Milkshake],
    validators: [validateStartMonth([6])],
    manualValidators: [],
  },
  '42': {
    bbCode: '(42) Watch an anime that started airing in [b]July[/b]',
    description: '(42) Watch an anime that started airing in <b>July</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Side.Fries,
      Side.Onigiri,
      Side.OnionRings,
      Side.TheMelon,
      Side.Tofu,
    ],
    validators: [validateStartMonth([7])],
    manualValidators: [],
  },
  '43': {
    bbCode: '(43) Watch an anime that started airing in [b]August[/b]',
    description: '(43) Watch an anime that started airing in <b>August</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Prawns, Starter.Soup],
    validators: [validateStartMonth([8])],
    manualValidators: [],
  },
  '44': {
    bbCode: '(44) Watch an anime that started airing in [b]September[/b]',
    description: '(44) Watch an anime that started airing in <b>September</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza],
    validators: [validateStartMonth([9])],
    manualValidators: [],
  },
  '45': {
    bbCode: '(45) Watch an anime that started airing in [b]October[/b]',
    description: '(45) Watch an anime that started airing in <b>October</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Burger, Main.FishAndChips, Main.Omurice, Main.Sandwich],
    validators: [validateStartMonth([10])],
    manualValidators: [],
  },
  '46': {
    bbCode: '(46) Watch an anime that started airing in [b]November[/b]',
    description: '(46) Watch an anime that started airing in <b>November</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Sandwich, Main.Spaghetti],
    validators: [validateStartMonth([11])],
    manualValidators: [],
  },
  '47': {
    bbCode: '(47) Watch an anime that started airing in [b]December[/b]',
    description: '(47) Watch an anime that started airing in <b>December</b>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Omurice, Main.Spaghetti, Main.Sushi],
    validators: [validateStartMonth([12])],
    manualValidators: [],
  },
  '48': {
    bbCode:
      '(48) Watch an anime that began airing the same [b]year[/b] you joined MAL',
    description:
      '(48) Watch an anime that began airing the same <b>year</b> you joined MAL',
    addlInfo: [
      '— The anime must air in the same year you joined but can be any month and day',
    ],
    defaultExtraInfo: ['Join Year:'],
    courses: [Starter.ChickenWings, Starter.Gyoza, Starter.Soup],
    validators: [],
    manualValidators: ['Anime began airing the same year you joined MAL'],
  },
  '49': {
    bbCode:
      '(49) Watch an anime that began airing the same [b]month[/b] (eg. July) you joined MAL',
    description:
      '(49) Watch an anime that began airing the same <b>month</b> (eg. July) you joined MAL',
    addlInfo: [
      '— The anime must air in the same month but can be any year and day',
    ],
    defaultExtraInfo: ['Join Month:'],
    courses: [Dessert.Dango],
    validators: [],
    manualValidators: ['Anime began airing the same month you joined MAL'],
  },
  '50': {
    bbCode:
      '(50) Watch an anime that began airing the same [b]day[/b] (eg. 18th) you joined MAL',
    description:
      '(50) Watch an anime that began airing the same <b>day</b> (eg. 18th) you joined MAL',
    addlInfo: [
      '— The anime must air on the same day but can be any year and month',
    ],
    defaultExtraInfo: ['Join Day:'],
    courses: [Main.FishAndChips, Main.Sandwich, Main.Spaghetti, Main.Sushi],
    validators: [],
    manualValidators: ['Anime began airing the same day you joined MAL'],
  },
  '51': {
    bbCode:
      '(51) Watch an anime that has a main title starting with the same letter/number/character as your MAL username',
    description:
      '(51) Watch an anime that has a main title starting with the same letter/number/character as your MAL username',
    addlInfo: [
      "— If your username starts with a non-standard character (anything that isn't a number or letter like -, *, [, ], _, etc) the anime's main title can start with any non-alphanumeric character",
    ],
    defaultExtraInfo: [],
    courses: [Main.Lasagna, Main.Sandwich],
    validators: [validateTitleUsername()],
    manualValidators: [],
  },
  '52': {
    bbCode:
      '(52) Watch an anime with 7 or more words (not symbols and numbers) in the main title',
    description:
      '(52) Watch an anime with 7 or more words (not symbols and numbers) in the main title',
    addlInfo: [
      '— The words must be separated by a space; two words linked with a symbol (no space) will count as one word. Example: "Steins;Gate: Oukoubakko no Poriomania" has four words',
    ],
    defaultExtraInfo: [],
    courses: [
      Starter.ChickenWings,
      Starter.Prawns,
      Starter.Soup,
      Starter.SpringRolls,
    ],
    validators: [],
    manualValidators: ['Anime has 7 or more words in the title'],
  },
  '53': {
    bbCode:
      '(53) Watch an anime that contains an English number (9, five) somewhere in the main title',
    description:
      '(53) Watch an anime that contains an English number (9, five) somewhere in the main title',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.Onigiri, Side.OnionRings, Side.Tofu],
    validators: [],
    manualValidators: ['Anime contains an English number in the title'],
  },
  '54': {
    bbCode: '(54) Watch an anime that has a one-word main title',
    description: '(54) Watch an anime that has a one-word main title',
    addlInfo: [
      '— The word cannot be a symbol, single letter, or number (unless the number is written as a word)',
      '— Titles with punctuation separating words are not allowed (like Steins;Gate and K-On!)',
    ],
    defaultExtraInfo: [],
    courses: [
      Starter.Gyoza,
      Starter.Prawns,
      Starter.Salad,
      Starter.SpringRolls,
    ],
    validators: [],
    manualValidators: ['Anime has a one-word title'],
  },
  '55': {
    bbCode:
      '(55) Watch an anime that has a main character’s name/nickname/alternative name in the main title',
    description:
      '(55) Watch an anime that has a main character’s name/nickname/alternative name in the main title',
    addlInfo: [
      "— The name/nickname/alternative name must be listed on the character's MAL page in order to be valid",
    ],
    defaultExtraInfo: ['Character:'],
    courses: [Dessert.Cake, Dessert.Milkshake],
    validators: [],
    manualValidators: ["Anime has main character's name in the title"],
  },
  '56': {
    bbCode:
      '(56) Watch an anime with at least two [u]different[/u] non-alphanumeric characters in the main title',
    description:
      '(56) Watch an anime with at least two <u>different</u> non-alphanumeric characters in the main title',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Omurice,
      Main.Pizza,
      Main.Spaghetti,
    ],
    validators: [validateTitleNonAlphanumericCount(2, 'gte')],
    manualValidators: [],
  },
  '57': {
    bbCode:
      '(57) Watch an anime that has 3 or more words in the main title starting with the same letter',
    description:
      '(57) Watch an anime that has 3 or more words in the main title starting with the same letter',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.GarlicBread],
    validators: [validateWordsWithSameLetter(3)],
    manualValidators: [],
  },
  '58': {
    bbCode:
      '(58) Watch an anime that uses an English or Japanese color in the main title',
    description:
      '(58) Watch an anime that uses an English or Japanese color in the main title',
    addlInfo: [
      '— Common Japanese colors: Aka/akai (red), Ao/Aoi (blue), Kiiro/kiiroi (yellow), Kuro/kuroi (black), Shiro/shiroi (white), Orenji (orange), Midori (green), Murasaki (purple), Pinku (pink), Haiiro (grey), Chairo (brown), Kin/kiniro (gold), Gin/giniro (silver)',
    ],
    defaultExtraInfo: ['Color Used:'],
    courses: [Main.Lasagna, Main.Pizza, Main.Spaghetti],
    validators: [],
    manualValidators: ['Anime uses an English or Japanese color in title'],
  },
  '59': {
    bbCode:
      '(59) Watch an anime that uses an English or Japanese animal in the main title',
    description:
      '(59) Watch an anime that uses an English or Japanese animal in the main title',
    addlInfo: [
      '— Common Japanese animals: Neko (cat), Nezumi (mouse), Inu (dog), Tori (bird), Buta (pig), Karasu (crow), Ahiru (duck), Saru (monkey), Uma (horse), Shika (deer), Usagi (rabbit), Kuma (bear), Kaeru (frog), Tako (octopus), Same (shark), Mushi (insect), Hotaru (firefly), Kumo (spider)',
    ],
    defaultExtraInfo: ['Animal Used:'],
    courses: [Starter.Salad],
    validators: [],
    manualValidators: ['Anime uses an English or Japanese animal in title'],
  },
  '60': {
    bbCode: '(60) Watch an anime that has a non-Japanese main title',
    description: '(60) Watch an anime that has a non-Japanese main title',
    addlInfo: ['— Examples: School Days, Gravitation'],
    defaultExtraInfo: [],
    courses: [Dessert.Cookie, Dessert.Dango],
    validators: [],
    manualValidators: ['Anime has a non-Japanese title'],
  },
  '61': {
    bbCode:
      '(61) Watch an anime with a main title that shares at least three different letters/numbers/symbols with your MAL username',
    description:
      '(61) Watch an anime with a main title that shares at least three different letters/numbers/symbols with your MAL username',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Burger, Main.Pizza, Main.Sandwich, Main.Spaghetti],
    validators: [validateTitleUsernameShareCount(3, 'gte')],
    manualValidators: [],
  },
  '62': {
    bbCode: '(62) Watch an anime that has a main title starting with S or Z',
    description:
      '(62) Watch an anime that has a main title starting with S or Z',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.Omurice,
      Main.Pizza,
      Main.Sandwich,
      Main.Spaghetti,
    ],
    validators: [validateTitleStartsWith(['S', 'Z'])],
    manualValidators: [],
  },
  '63': {
    bbCode:
      '(63) Watch an anime that has a main title starting with A, G, or N',
    description:
      '(63) Watch an anime that has a main title starting with A, G, or N',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Burger, Main.Lasagna, Main.Omurice, Main.Pizza],
    validators: [validateTitleStartsWith(['A', 'G', 'N'])],
    manualValidators: [],
  },
  '64': {
    bbCode:
      '(64) Watch an anime that has a main title starting with C, D, or O',
    description:
      '(64) Watch an anime that has a main title starting with C, D, or O',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Side.Fries,
      Side.GarlicBread,
      Side.Onigiri,
      Side.TheMelon,
      Side.Tofu,
    ],
    validators: [validateTitleStartsWith(['C', 'D', 'O'])],
    manualValidators: [],
  },
  '65': {
    bbCode:
      '(65) Watch an anime that has a main title starting with F, I, or M',
    description:
      '(65) Watch an anime that has a main title starting with F, I, or M',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Dango, Dessert.IceCream],
    validators: [validateTitleStartsWith(['F', 'I', 'M'])],
    manualValidators: [],
  },
  '66': {
    bbCode:
      '(66) Watch an anime that has a main title starting with B, J, P, or U',
    description:
      '(66) Watch an anime that has a main title starting with B, J, P, or U',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.Onigiri, Side.Tofu],
    validators: [validateTitleStartsWith(['B', 'J', 'P', 'U'])],
    manualValidators: [],
  },
  '67': {
    bbCode:
      '(67) Watch an anime that has a main title starting with E, R, T, or X',
    description:
      '(67) Watch an anime that has a main title starting with E, R, T, or X',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Dango, Dessert.Milkshake],
    validators: [validateTitleStartsWith(['E', 'R', 'T', 'X'])],
    manualValidators: [],
  },
  '68': {
    bbCode:
      '(68) Watch an anime that has a main title starting with H, L, Q, or Y',
    description:
      '(68) Watch an anime that has a main title starting with H, L, Q, or Y',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Prawns, Starter.Salad],
    validators: [validateTitleStartsWith(['H', 'L', 'Q', 'Y'])],
    manualValidators: [],
  },
  '69': {
    bbCode:
      '(69) Watch an anime that has a main title starting with K, V, W, or a number/symbol',
    description:
      '(69) Watch an anime that has a main title starting with K, V, W, or a number/symbol',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.SpringRolls],
    validators: [validateTitleStartsWith(['K', 'V', 'W'], true)],
    manualValidators: [],
  },
  '70': {
    bbCode:
      '(70) Watch an anime that is tagged with one of your [u]two lowest ranked[/u] Genres/Themes/Demographics by Weighted Score according to your MAL statistics',
    description:
      '(70) Watch an anime that is tagged with one of your <u>two lowest ranked</u> Genres/Themes/Demographics by Weighted Score according to your MAL statistics',
    addlInfo: [
      '— On your profile under Statistics click "All Anime Stats"; click "Genres"; sort by smallest number of "Weighted" (the sorting triangle will be pointing up)',
      '— "Genres", "Themes", and "Demographics" should all have a check mark ("Explicit Genres" is optional)',
      '— Screenshot must show what options were selected at the bottom or the item is invalid',
    ],
    defaultExtraInfo: [
      'Lowest Ranked G/T/D 1:',
      'Lowest Ranked G/T/D 2:',
      'MAL Stats Screenshot:',
    ],
    courses: [Starter.Gyoza, Starter.Salad],
    validators: [],
    manualValidators: [
      'Anime is tagged with one of your two lowest ranked tags',
    ],
  },
  '71': {
    bbCode:
      '(71) Watch an anime that has the number [url=https://github.com/nyomdalee/awc-helper-txt/tree/master/Anime%20by%20ID][b]26[/b][/url] in its MAL ID',
    description:
      '(71) Watch an anime that has the number <a href="https://github.com/nyomdalee/awc-helper-txt/tree/master/Anime%20by%20ID">26</a> in its MAL ID',
    addlInfo: [
      '— The MAL ID is the set of digits after the "anime/" section of the anime page\'s URL (Cowboy Bebop\'s MAL ID is 1)',
    ],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Sushi],
    validators: [validateMALIdContains('26')],
    manualValidators: [],
  },
  '72': {
    bbCode:
      '(72) Watch an anime that was [url=https://myanimelist.net/reviews.php?t=anime][b]Reviewed[/b][/url] the same 2026 date you started it',
    description:
      '(72) Watch an anime that was <a href="https://myanimelist.net/reviews.php?t=anime">Reviewed</a> the same 2026 date you started it',
    addlInfo: [
      '— It is recommended to save a screenshot in case the review gets deleted',
      '— Reviews that are not in English and troll reviews will not be accepted',
    ],
    defaultExtraInfo: ['Review Link:', 'Review Screenshot:'],
    courses: [Main.Burger, Main.Sushi],
    validators: [],
    manualValidators: ['Anime was reviewed on the same day you started'],
  },
  '73': {
    bbCode:
      '(73) Watch an anime with a Review that has at least four different reaction emojis',
    description:
      '(73) Watch an anime with a Review that has at least four different reaction emojis',
    addlInfo: [],
    defaultExtraInfo: ['Review Link:', 'Review Screenshot:'],
    courses: [Drink.Coffee, Drink.Soda, Drink.Tea],
    validators: [],
    manualValidators: ['Anime has review with >=4 different reaction emojis'],
  },
  '74': {
    bbCode:
      '(74) Watch an anime where the difference between ranking and popularity is at least 1,000',
    description:
      '(74) Watch an anime where the difference between ranking and popularity is at least 1,000',
    addlInfo: [],
    defaultExtraInfo: ['Ranking When Started:', 'Popularity When Started:'],
    courses: [Drink.Coffee],
    validators: [validateRankingPopularityDiff(1000, 'gte')],
    manualValidators: [],
  },
  '75': {
    bbCode:
      '(75) Watch an anime that finished airing before starting the item and has [u]no[/u] Recommendations',
    description:
      '(75) Watch an anime that finished airing before starting the item and has <u>no</u> Recommendations',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie],
    validators: [validateFinishedAiring()],
    manualValidators: ['Anime has no recommendations'],
  },
  '76': {
    bbCode:
      '(76) Watch an anime that finished airing before starting the item and has less than 50,000 Completed members on their Stats page',
    description:
      '(76) Watch an anime that finished airing before starting the item and has less than 50,000 Completed members on their Stats page',
    addlInfo: [],
    defaultExtraInfo: ['Completed Members When Started:'],
    courses: [Starter.Prawns, Starter.Soup, Starter.SpringRolls],
    validators: [
      validateFinishedAiring(),
      validateStatistics('completed', 50_000, 'lt'),
    ],
    manualValidators: [],
  },
  '77': {
    bbCode:
      '(77) Watch an anime with 10 or more episodes that has a synopsis by MAL Rewrite',
    description:
      '(77) Watch an anime with 10 or more episodes that has a synopsis by MAL Rewrite',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Starter.ChickenWings,
      Starter.Prawns,
      Starter.Soup,
      Starter.SpringRolls,
    ],
    validators: [validateEpisodeCount(10, 'gte')],
    manualValidators: ['Anime has synopsis by MAL Rewrite'],
  },
  '78': {
    bbCode:
      '(78) Watch an anime with 150 or less favorites on MAL when you started watching it',
    description:
      '(78) Watch an anime with 150 or less favorites on MAL when you started watching it',
    addlInfo: [],
    defaultExtraInfo: ['Favorites When Started:'],
    courses: [Side.Fries, Side.GarlicBread, Side.Onigiri, Side.Tofu],
    validators: [validateFavorites(150, 'lte')],
    manualValidators: [],
  },
  '79': {
    bbCode:
      '(79) Watch an anime that has a higher score than a listed Adaptation under Related Anime',
    description:
      '(79) Watch an anime that has a higher score than a listed Adaptation under Related Anime',
    addlInfo: [],
    defaultExtraInfo: ['Anime Score:', 'Adaptation Score:'],
    courses: [Main.FishAndChips, Main.Lasagna, Main.Omurice, Main.Spaghetti],
    validators: [],
    manualValidators: ['Anime has a higher score than a listed adaptation'],
  },
  '80': {
    bbCode: '(80) Watch an anime with a popularity lower than #500',
    description: '(80) Watch an anime with a popularity lower than #500',
    addlInfo: [],
    defaultExtraInfo: ['Popularity When Started:'],
    courses: [Drink.Coffee, Drink.Lemonade, Drink.Soda, Drink.Tea],
    validators: [validatePopularity(500, 'gt')],
    manualValidators: [],
  },
  '81': {
    bbCode: '(81) Watch an anime with a popularity lower than #2026',
    description: '(81) Watch an anime with a popularity lower than #2026',
    addlInfo: [],
    defaultExtraInfo: ['Popularity When Started:'],
    courses: [Side.Fries, Side.GarlicBread, Side.Onigiri, Side.TheMelon],
    validators: [validatePopularity(2026, 'gt')],
    manualValidators: [],
  },
  '82': {
    bbCode: '(82) Watch an anime with a popularity lower than #3211',
    description: '(82) Watch an anime with a popularity lower than #3211',
    addlInfo: [],
    defaultExtraInfo: ['Popularity When Started:'],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Omurice,
      Main.Sandwich,
      Main.Spaghetti,
      Main.Sushi,
    ],
    validators: [validatePopularity(3211, 'gt')],
    manualValidators: [],
  },
  '83': {
    bbCode: '(83) Watch an anime with a popularity lower than #4015',
    description: '(83) Watch an anime with a popularity lower than #4015',
    addlInfo: [],
    defaultExtraInfo: ['Popularity When Started:'],
    courses: [Starter.Prawns, Starter.SpringRolls],
    validators: [validatePopularity(4015, 'gt')],
    manualValidators: [],
  },
  '84': {
    bbCode:
      '(84) Watch an anime with the numbers "2" or "6" in the score when you started watching it',
    description:
      '(84) Watch an anime with the numbers "2" or "6" in the score when you started watching it',
    addlInfo: [],
    defaultExtraInfo: ['Score Screenshot:'],
    courses: [Drink.Lemonade, Drink.Tea],
    validators: [validateScoreContains(['2', '6'])],
    manualValidators: [],
  },
  '85': {
    bbCode:
      '(85) Watch an anime with a score of 7.85 or above when you started watching it',
    description:
      '(85) Watch an anime with a score of 7.85 or above when you started watching it',
    addlInfo: [],
    defaultExtraInfo: ['Score When Started:'],
    courses: [Main.FishAndChips, Main.Lasagna, Main.Sandwich, Main.Spaghetti],
    validators: [validateScore(7.85, 'gte')],
    manualValidators: [],
  },
  '86': {
    bbCode:
      '(86) Watch an anime with a score of 7.50 or below when you started watching it',
    description:
      '(86) Watch an anime with a score of 7.50 or below when you started watching it',
    addlInfo: [],
    defaultExtraInfo: ['Score When Started:'],
    courses: [Drink.Coffee, Drink.Soda],
    validators: [validateScore(7.5, 'lte')],
    manualValidators: [],
  },
  '87': {
    bbCode:
      '(87) Watch an anime with a score of 6.26 or below when you started watching it',
    description:
      '(87) Watch an anime with a score of 6.26 or below when you started watching it',
    addlInfo: [],
    defaultExtraInfo: ['Score When Started:'],
    courses: [Side.TheMelon, Side.Tofu],
    validators: [validateScore(6.26, 'lte')],
    manualValidators: [],
  },
  '88': {
    bbCode:
      '(88) Watch an anime that is listed under [url=https://anidb.net/tag/6118][b]Eating Ramen[/b][/url], [url=https://anidb.net/tag/6100][b]Barbecue[/b][/url], or [url=https://anidb.net/tag/3233][b]Cooking Curry[/b][/url] on AniDB',
    description:
      '(88) Watch an anime that is listed under <a href="https://anidb.net/tag/6118">Eating Ramen</a>, <a href="https://anidb.net/tag/6100">Barbecue</a>, or <a href="https://anidb.net/tag/3233">Cooking Curry</a> on AniDB',
    addlInfo: [],
    defaultExtraInfo: ['List Used:'],
    courses: [Side.OnionRings],
    validators: [],
    manualValidators: ['Anime is listed under specified tags'],
  },
  '89': {
    bbCode:
      '(89) Watch an anime that has an [url=https://www.anime-planet.com/characters/tags/inanimate-objects][b]Inanimate Object[/b][/url] as a character',
    description:
      '(89) Watch an anime that has an <a href="https://www.anime-planet.com/characters/tags/inanimate-objects">Inanimate Object</a> as a character',
    addlInfo: [
      '— The character must be listed on Anime Planet in order to be valid, it does not have to be listed on MAL',
    ],
    defaultExtraInfo: ['Character:'],
    courses: [Starter.ChickenWings, Starter.Soup, Starter.SpringRolls],
    validators: [],
    manualValidators: ['Anime has a character with specified tag'],
  },
  '90': {
    bbCode: '(90) Watch an anime that only has one main character',
    description: '(90) Watch an anime that only has one main character',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.GarlicBread, Side.TheMelon],
    validators: [validateMainCharacterCountEquals(1)],
    manualValidators: [],
  },
  '91': {
    bbCode: '(91) Watch an anime with 8 or more main characters',
    description: '(91) Watch an anime with 8 or more main characters',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.Omurice,
      Main.Pizza,
      Main.Spaghetti,
      Main.Sushi,
    ],
    validators: [validateMainCharacterCountAtLeast(8)],
    manualValidators: [],
  },
  '92': {
    bbCode:
      '(92) Watch an anime that has more main characters than supporting characters',
    description:
      '(92) Watch an anime that has more main characters than supporting characters',
    addlInfo: [],
    defaultExtraInfo: ['# of Mains:', '# of Supporting:'],
    courses: [Dessert.IceCream],
    validators: [validateMoreMainThanSupporting()],
    manualValidators: [],
  },
  '93': {
    bbCode:
      '(93) Watch an anime with 3+ main characters that are of the same gender',
    description:
      '(93) Watch an anime with 3+ main characters that are of the same gender',
    addlInfo: [],
    defaultExtraInfo: [''],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Lasagna,
      Main.Omurice,
      Main.Sandwich,
    ],
    validators: [],
    manualValidators: ['Anime has >=3 main characters of the same gender'],
  },
  '94': {
    bbCode:
      '(94) Watch an anime where the same Voice Actor is credited under at least two different characters',
    description:
      '(94) Watch an anime where the same Voice Actor is credited under at least two different characters',
    addlInfo: [
      "— The voice actor/actress must be listed on the anime's Characters and Staff page next to both characters",
    ],
    defaultExtraInfo: ['Voice Actor 1:', 'Character 1:', 'Character 2:'],
    courses: [Starter.ChickenWings, Starter.Salad],
    validators: [],
    manualValidators: ['Anime has VA credited under >=2 different characters'],
  },
  '95': {
    bbCode:
      '(95) Watch an anime that has a main character with majority blue, green, pink, or purple [url=https://anidb.net/tag/12/chartb][b]hair color[/b][/url]',
    description:
      '(95) Watch an anime that has a main character with majority blue, green, pink, or purple <a href="https://anidb.net/tag/12/chartb">hair color</a>',
    addlInfo: [
      "— The character's hair must be mostly one or several of the listed colors; just streaks are not valid",
      '— The character can have a combination of the listed hair colors, as long as the listed hair colors make up the majority of their hair',
    ],
    defaultExtraInfo: ['Character:'],
    courses: [
      Starter.ChickenWings,
      Starter.Prawns,
      Starter.Soup,
      Starter.SpringRolls,
    ],
    validators: [],
    manualValidators: [
      'Main character has majority blue, green, pink, or purple hair',
    ],
  },
  '96': {
    bbCode:
      '(96) Watch an anime with a main character tagged with [url=https://www.anime-planet.com/characters/all?sort=title&order=asc&include_tags=341][b]Big Eaters[/b][/url] on Anime Planet',
    description:
      '(96) Watch an anime with a main character tagged with <a href="https://www.anime-planet.com/characters/all?sort=title&order=asc&include_tags=341">Big Eaters</a> on Anime Planet',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.IceCream],
    validators: [],
    manualValidators: ['Anime has a main character with specified tag'],
  },
  '97': {
    bbCode:
      '(97) Watch an anime in which a character wears [url=https://anidb.net/tag/2206][b]glasses[/b][/url]',
    description:
      '(97) Watch an anime in which a character wears <a href="https://anidb.net/tag/2206">glasses</a>',
    addlInfo: [
      "— The character does not have to be in the linked list, but it's a good place to start",
    ],
    defaultExtraInfo: ['Character:'],
    courses: [
      Main.Burger,
      Main.FishAndChips,
      Main.Omurice,
      Main.Spaghetti,
      Main.Sushi,
    ],
    validators: [],
    manualValidators: ['Anime has a character who wears glasses'],
  },
  '98': {
    bbCode:
      '(98) Watch an anime that is made by a Studio/Producer that starts with a letter in your MAL username',
    description:
      '(98) Watch an anime that is made by a Studio/Producer that starts with a letter in your MAL username',
    addlInfo: ['— The anime can have more than one Studio/Producer'],
    defaultExtraInfo: ['Studio/Producer:'],
    courses: [Side.Onigiri, Side.TheMelon, Side.Tofu],
    validators: [validateStudioProducerStartInUsername()],
    manualValidators: [
      'Anime is made by a Studio/Producer starting with same letter as your MAL username',
    ],
  },
  '99': {
    bbCode:
      "(99) Watch an anime by a studio with less than 45 anime in MAL's database",
    description:
      "(99) Watch an anime by a studio with less than 45 anime in MAL's database",
    addlInfo: [
      '— If there are multiple studios listed, only one of them needs to be valid',
    ],
    defaultExtraInfo: ['Studio:'],
    courses: [Main.FishAndChips, Main.Sushi],
    validators: [],
    manualValidators: ['Anime by studio with <45 anime'],
  },
  '100': {
    bbCode:
      "(100) Watch an anime by a studio you haven't seen anything from (studio cannot be listed as producer)",
    description:
      "(100) Watch an anime by a studio you haven't seen anything from (studio cannot be listed as producer)",
    addlInfo: [
      '— If you have an anime from the chosen studio on your Completed/Watching/On Hold/Dropped list, you cannot use that studio',
      '— If there are multiple studios listed, only one of them needs to be valid',
    ],
    defaultExtraInfo: ['Studio:'],
    courses: [Starter.Gyoza],
    validators: [],
    manualValidators: ["Anime by studio you haven't seen anything from"],
  },
  '101': {
    bbCode:
      '(101) Watch an anime that is from a Licensor/Producer/Studio starting with A',
    description:
      '(101) Watch an anime that is from a Licensor/Producer/Studio starting with A',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Dessert.ApplePie, Dessert.Dango],
    validators: [validateCompanyStartsWith(['A'])],
    manualValidators: [],
  },
  '102': {
    bbCode:
      '(102) Watch an anime that is from a Licensor/Producer/Studio starting with S',
    description:
      '(102) Watch an anime that is from a Licensor/Producer/Studio starting with S',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Side.Fries],
    validators: [validateCompanyStartsWith(['S'])],
    manualValidators: [],
  },
  '103': {
    bbCode:
      '(103) Watch an anime that is from a Licensor/Producer/Studio starting with T',
    description:
      '(103) Watch an anime that is from a Licensor/Producer/Studio starting with T',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Side.Fries, Side.GarlicBread, Side.OnionRings, Side.Tofu],
    validators: [validateCompanyStartsWith(['T'])],
    manualValidators: [],
  },
  '104': {
    bbCode:
      '(104) Watch an anime that is from a Licensor/Producer/Studio starting with B or O',
    description:
      '(104) Watch an anime that is from a Licensor/Producer/Studio starting with B or O',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Starter.Prawns, Starter.Salad, Starter.Soup],
    validators: [validateCompanyStartsWith(['B', 'O'])],
    manualValidators: [],
  },
  '105': {
    bbCode:
      '(105) Watch an anime that is from a Licensor/Producer/Studio starting with D or R',
    description:
      '(105) Watch an anime that is from a Licensor/Producer/Studio starting with D or R',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Main.Burger, Main.FishAndChips, Main.Sushi],
    validators: [validateCompanyStartsWith(['D', 'R'])],
    manualValidators: [],
  },
  '106': {
    bbCode:
      '(106) Watch an anime that is from a Licensor/Producer/Studio starting with E or P',
    description:
      '(106) Watch an anime that is from a Licensor/Producer/Studio starting with E or P',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Dessert.Cake],
    validators: [validateCompanyStartsWith(['E', 'P'])],
    manualValidators: [],
  },
  '107': {
    bbCode:
      '(107) Watch an anime that is from a Licensor/Producer/Studio starting with G or L',
    description:
      '(107) Watch an anime that is from a Licensor/Producer/Studio starting with G or L',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Starter.Prawns, Starter.Soup],
    validators: [validateCompanyStartsWith(['G', 'L'])],
    manualValidators: [],
  },
  '108': {
    bbCode:
      '(108) Watch an anime that is from a Licensor/Producer/Studio starting with H or I',
    description:
      '(108) Watch an anime that is from a Licensor/Producer/Studio starting with H or I',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Main.Sandwich, Main.Sushi],
    validators: [validateCompanyStartsWith(['H', 'I'])],
    manualValidators: [],
  },
  '109': {
    bbCode:
      '(109) Watch an anime that is from a Licensor/Producer/Studio starting with M or X',
    description:
      '(109) Watch an anime that is from a Licensor/Producer/Studio starting with M or X',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Starter.ChickenWings, Starter.Gyoza],
    validators: [validateCompanyStartsWith(['M', 'X'])],
    manualValidators: [],
  },
  '110': {
    bbCode:
      '(110) Watch an anime that is from a Licensor/Producer/Studio starting with C, Z, or a number/symbol',
    description:
      '(110) Watch an anime that is from a Licensor/Producer/Studio starting with C, Z, or a number/symbol',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Side.GarlicBread, Side.OnionRings, Side.Tofu],
    validators: [validateCompanyStartsWith(['C', 'Z'], true)],
    manualValidators: [],
  },
  '111': {
    bbCode:
      '(111) Watch an anime that is from a Licensor/Producer/Studio starting with F, J, or Y',
    description:
      '(111) Watch an anime that is from a Licensor/Producer/Studio starting with F, J, or Y',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Main.FishAndChips, Main.Lasagna, Main.Omurice, Main.Pizza],
    validators: [validateCompanyStartsWith(['F', 'J', 'Y'])],
    manualValidators: [],
  },
  '112': {
    bbCode:
      '(112) Watch an anime that is from a Licensor/Producer/Studio starting with K, Q, or U',
    description:
      '(112) Watch an anime that is from a Licensor/Producer/Studio starting with K, Q, or U',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Starter.ChickenWings, Starter.SpringRolls],
    validators: [validateCompanyStartsWith(['K', 'Q', 'U'])],
    manualValidators: [],
  },
  '113': {
    bbCode:
      '(113) Watch an anime that is from a Licensor/Producer/Studio starting with N, V, or W',
    description:
      '(113) Watch an anime that is from a Licensor/Producer/Studio starting with N, V, or W',
    addlInfo: [],
    defaultExtraInfo: ['Licensor/Producer/Studio:'],
    courses: [Main.Lasagna, Main.Omurice, Main.Pizza, Main.Spaghetti],
    validators: [validateCompanyStartsWith(['N', 'V', 'W'])],
    manualValidators: [],
  },
  '114': {
    bbCode:
      '(114) Watch an anime from [url=https://myanimelist.net/anime/producer/102][b]Funimation[/b][/url]',
    description:
      '(114) Watch an anime from <a href="https://myanimelist.net/anime/producer/102">Funimation</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.ChickenWings, Starter.Soup],
    validators: [validateCompany(['Funimation'])],
    manualValidators: [],
  },
  '115': {
    bbCode:
      '(115) Watch an anime from [url=https://myanimelist.net/anime/producer/111][b]NHK[/b][/url]',
    description:
      '(115) Watch an anime from <a href="https://myanimelist.net/anime/producer/111">NHK</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Onigiri, Side.OnionRings],
    validators: [validateCompany(['NHK'])],
    manualValidators: [],
  },
  '116': {
    bbCode:
      '(116) Watch an anime from [url=https://myanimelist.net/anime/producer/97][b]ADV Films[/b][/url] or [url=https://myanimelist.net/anime/producer/376][b]Sentai Filmworks[/b][/url]',
    description:
      '(116) Watch an anime from <a href="https://myanimelist.net/anime/producer/97">ADV Films</a> or <a href="https://myanimelist.net/anime/producer/376">Sentai Filmworks</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cookie],
    validators: [validateCompany(['ADV Films', 'Sentai Filmworks'])],
    manualValidators: [],
  },
  '117': {
    bbCode:
      '(117) Watch an anime from [url=https://myanimelist.net/anime/producer/28][b]OLM[/b][/url] or [url=https://myanimelist.net/anime/producer/18][b]Toei Animation[/b][/url]',
    description:
      '(117) Watch an anime from <a href="https://myanimelist.net/anime/producer/28">OLM</a> or <a href="https://myanimelist.net/anime/producer/18">Toei Animation</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Pizza, Main.Sandwich, Main.Spaghetti],
    validators: [validateCompany(['OLM', 'Toei Animation'])],
    manualValidators: [],
  },
  '118': {
    bbCode:
      '(118) Watch an anime from [url=https://myanimelist.net/anime/producer/17][b]Aniplex[/b][/url], [url=https://myanimelist.net/anime/producer/37][b]Studio Deen[/b][/url] or [url=https://myanimelist.net/anime/producer/1727][b]Tencent Video[/b][/url]',
    description:
      '(118) Watch an anime from <a href="https://myanimelist.net/anime/producer/17">Aniplex</a>, <a href="https://myanimelist.net/anime/producer/37">Studio Deen</a> or <a href="https://myanimelist.net/anime/producer/1727">Tencent Video</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Soup, Starter.SpringRolls],
    validators: [validateCompany(['Aniplex', 'Studio Deen', 'Tencent Video'])],
    manualValidators: [],
  },
  '119': {
    bbCode:
      '(119) Watch an anime from [url=https://myanimelist.net/anime/producer/493][b]Aniplex of America[/b][/url], [url=https://myanimelist.net/anime/producer/1696][b]Kadokawa[/b][/url] or [url=https://myanimelist.net/anime/producer/10][b]Production I.G[/b][/url]',
    description:
      '(119) Watch an anime from <a href="https://myanimelist.net/anime/producer/493">Aniplex of America</a>, <a href="https://myanimelist.net/anime/producer/1696">Kadokawa</a> or <a href="https://myanimelist.net/anime/producer/10">Production I.G</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Drink.Lemonade],
    validators: [
      validateCompany(['Aniplex of America', 'Kadokawa', 'Production I.G']),
    ],
    manualValidators: [],
  },
  '120': {
    bbCode:
      '(120) Watch an anime from [url=https://myanimelist.net/anime/producer/233][b]Bandai Entertainment[/b][/url], [url=https://myanimelist.net/anime/producer/467][b]Discotek Media[/b][/url] or [url=https://myanimelist.net/anime/producer/7][b]J.C.Staff[/b][/url]',
    description:
      '(120) Watch an anime from <a href="https://myanimelist.net/anime/producer/233">Bandai Entertainment</a>, <a href="https://myanimelist.net/anime/producer/467">Discotek Media</a> or <a href="https://myanimelist.net/anime/producer/7">J.C.Staff</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.ChickenWings, Starter.Prawns],
    validators: [
      validateCompany(['Bandai Entertainment', 'Discotek Media', 'J.C.Staff']),
    ],
    manualValidators: [],
  },
  '121': {
    bbCode:
      '(121) Watch an anime from [url=https://myanimelist.net/anime/producer/1414][b]bilibili[/b][/url], [url=https://myanimelist.net/anime/producer/169][b]Fuji TV[/b][/url] or [url=https://myanimelist.net/anime/producer/144][b]Pony Canyon[/b][/url]',
    description:
      '(121) Watch an anime from <a href="https://myanimelist.net/anime/producer/1414">bilibili</a>, <a href="https://myanimelist.net/anime/producer/169">Fuji TV</a> or <a href="https://myanimelist.net/anime/producer/144">Pony Canyon</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Salad, Starter.Soup, Starter.SpringRolls],
    validators: [validateCompany(['bilibili', 'Fuji TV', 'Pony Canyon'])],
    manualValidators: [],
  },
  '122': {
    bbCode:
      '(122) Watch an anime from [url=https://myanimelist.net/anime/producer/23][b]Bandai Visual[/b][/url], [url=https://myanimelist.net/anime/producer/166][b]Movic[/b][/url] or [url=https://myanimelist.net/anime/producer/247][b]Shin-Ei Animation[/b][/url]',
    description:
      '(122) Watch an anime from <a href="https://myanimelist.net/anime/producer/23">Bandai Visual</a>, <a href="https://myanimelist.net/anime/producer/166">Movic</a> or <a href="https://myanimelist.net/anime/producer/247">Shin-Ei Animation</a>',
    addlInfo: [],
    defaultExtraInfo: [''],
    courses: [Side.OnionRings],
    validators: [
      validateCompany(['Bandai Visual', 'Movic', 'Shin-Ei Animation']),
    ],
    manualValidators: [],
  },
  '123': {
    bbCode:
      '(123) Watch an anime from [url=https://myanimelist.net/anime/producer/276][b]DLE[/b][/url], [url=https://myanimelist.net/anime/producer/1365][b]Shueisha[/b][/url] or [url=https://myanimelist.net/anime/producer/14][b]Sunrise[/b][/url]',
    description:
      '(123) Watch an anime from <a href="https://myanimelist.net/anime/producer/276">DLE</a>, <a href="https://myanimelist.net/anime/producer/1365">Shueisha</a> or <a href="https://myanimelist.net/anime/producer/14">Sunrise</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.IceCream],
    validators: [validateCompany(['DLE', 'Shueisha', 'Sunrise'])],
    manualValidators: [],
  },
  '124': {
    bbCode:
      '(124) Watch an anime from [url=https://myanimelist.net/anime/producer/104][b]Lantis[/b][/url], [url=https://myanimelist.net/anime/producer/11][b]Madhouse[/b][/url] or [url=https://myanimelist.net/anime/producer/145][b]TBS[/b][/url]',
    description:
      '(124) Watch an anime from <a href="https://myanimelist.net/anime/producer/104">Lantis</a>, <a href="https://myanimelist.net/anime/producer/11">Madhouse</a> or <a href="https://myanimelist.net/anime/producer/145">TBS</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Lasagna, Main.Pizza],
    validators: [validateCompany(['Lantis', 'Madhouse', 'TBS'])],
    manualValidators: [],
  },
  '125': {
    bbCode:
      '(125) Watch an anime from [url=https://myanimelist.net/anime/producer/1][b]Studio Pierrot[/b][/url], [url=https://myanimelist.net/anime/producer/103][b]Tatsunoko Production[/b][/url] or [url=https://myanimelist.net/anime/producer/16][b]TV Tokyo[/b][/url]',
    description:
      '(125) Watch an anime from <a href="https://myanimelist.net/anime/producer/1">Studio Pierrot</a>, <a href="https://myanimelist.net/anime/producer/103">Tatsunoko Production</a> or <a href="https://myanimelist.net/anime/producer/16">TV Tokyo</a>',
    addlInfo: [],
    defaultExtraInfo: [''],
    courses: [Main.Lasagna, Main.Sandwich, Main.Spaghetti],
    validators: [
      validateCompany(['Studio Pierrot', 'Tatsunoko Production', 'TV Tokyo']),
    ],
    manualValidators: [],
  },
  '126': {
    bbCode:
      '(126) Watch an anime from [url=https://myanimelist.net/anime/producer/56][b]A-1 Pictures[/b][/url], [url=https://myanimelist.net/anime/producer/238][b]AT-X[/b][/url], [url=https://myanimelist.net/anime/producer/1468][b]Crunchyroll[/b][/url] or [url=https://myanimelist.net/anime/producer/306][b]Magic Capsule[/b][/url]',
    description:
      '(126) Watch an anime from <a href="https://myanimelist.net/anime/producer/56">A-1 Pictures</a>, <a href="https://myanimelist.net/anime/producer/238">AT-X</a>, <a href="https://myanimelist.net/anime/producer/1468">Crunchyroll</a> or <a href="https://myanimelist.net/anime/producer/306">Magic Capsule</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Drink.Lemonade],
    validators: [
      validateCompany(['A-1 Pictures', 'AT-X', 'Crunchyroll', 'Magic Capsule']),
    ],
    manualValidators: [],
  },
  '127': {
    bbCode:
      '(127) Watch an anime from [url=https://myanimelist.net/anime/producer/48][b]AIC[/b][/url], [url=https://myanimelist.net/anime/producer/113][b]Kadokawa Shoten[/b][/url], [url=https://myanimelist.net/anime/producer/73][b]TMS Entertainment[/b][/url] or [url=https://myanimelist.net/anime/producer/119][b]VIZ Media[/b][/url]',
    description:
      '(127) Watch an anime from <a href="https://myanimelist.net/anime/producer/48">AIC</a>, <a href="https://myanimelist.net/anime/producer/113">Kadokawa Shoten</a>, <a href="https://myanimelist.net/anime/producer/73">TMS Entertainment</a> or <a href="https://myanimelist.net/anime/producer/119">VIZ Media</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Cake],
    validators: [
      validateCompany([
        'AIC',
        'Kadokawa Shoten',
        'TMS Entertainment',
        'VIZ Media',
      ]),
    ],
    manualValidators: [],
  },
  '128': {
    bbCode:
      "(128) Watch an anime listed on a 2026 participant's Anime+ recommendations",
    description:
      "(128) Watch an anime listed on a 2026 participant's Anime+ recommendations",
    addlInfo: [],
    defaultExtraInfo: ['Participant:', 'Their Post Link:', 'Screenshot:'],
    courses: [Main.Burger, Main.Omurice, Main.Pizza, Main.Sandwich],
    validators: [],
    manualValidators: ["Anime on participant's recommendations"],
  },
  '129': {
    bbCode:
      '(129) Watch an anime suggested to you by MAL or by Anime+ and provide a [url=https://myanimelist.net/forum/?goto=post&topicid=1869539&id=68336127][b]screenshot[/b][/url] including your username',
    description:
      '(129) Watch an anime suggested to you by MAL or by Anime+ and provide a <a href="https://myanimelist.net/forum/?goto=post&topicid=1869539&id=68336127">screenshot</a> including your username',
    addlInfo: [],
    defaultExtraInfo: ['Screenshot Showing Username:'],
    courses: [Starter.ChickenWings, Starter.Gyoza, Starter.Soup],
    validators: [],
    manualValidators: ['Anime suggested by MAL or Anime+'],
  },
  '130': {
    bbCode:
      '(130) Watch an anime from one of your 5 lowest ranked studios sorted by Mean on Anime+',
    description:
      '(130) Watch an anime from one of your 5 lowest ranked studios sorted by Mean on Anime+',
    addlInfo: [
      '— On Anime+ under Anime Favorites, sort Favorite Studios by Mean, from lowest to highest',
      '— Anime can have two or more studios listed',
    ],
    defaultExtraInfo: ['Screenshot:', 'Lowest Ranked Studios:'],
    courses: [Main.Sushi],
    validators: [],
    manualValidators: ['Anime from applicable studios'],
  },
  '131': {
    bbCode:
      '(131) Watch an anime tagged with your lowest scored genre/theme/demographic sorted by Mean according to Anime+',
    description:
      '(131) Watch an anime tagged with your lowest scored genre/theme/demographic sorted by Mean according to Anime+',
    addlInfo: [
      '— On Anime+ under Anime Favorites, sort Favorite Genres by Mean (the "M" column) from lowest to highest',
      "— If two categories are rated the same use the one at the very top if you've sorted with lowest on top, or the one at the very bottom if you've sorted with lowest at the bottom",
      '— Hentai and Erotica CAN be skipped, but make note of it',
    ],
    defaultExtraInfo: [],
    courses: [Main.Sandwich],
    validators: [],
    manualValidators: ['Anime tagged with lowest scored by mean'],
  },
  '132': {
    bbCode:
      '(132) Watch an anime that can be found in the same public Interest Stack as one of your listed MAL favorite anime',
    description:
      '(132) Watch an anime that can be found in the same public Interest Stack as one of your listed MAL favorite anime',
    addlInfo: [],
    defaultExtraInfo: ['MAL Favorite:', 'Interest Stack:'],
    courses: [Dessert.IceCream, Dessert.Milkshake],
    validators: [],
    manualValidators: [
      'Anime found in same public interest stack as one of your favorites',
    ],
  },
  '133': {
    bbCode:
      '(133) Watch an anime that began airing the same season and year as one that was previously watched and listed in your MAL favorites',
    description:
      '(133) Watch an anime that began airing the same season and year as one that was previously watched and listed in your MAL favorites',
    addlInfo: [
      '— The favorite anime must be listed on your profile and must be completed (no airing anime) by you before this item is started',
      '— The anime do not have to be TV type or show the season/year on their MAL page',
    ],
    defaultExtraInfo: ['MAL Favorite:', 'Season/Year:'],
    courses: [Starter.Salad, Starter.SpringRolls],
    validators: [],
    manualValidators: [
      'Anime began airing the same season/year as one of your favorites',
      'Favorite anime completed before starting',
    ],
  },
  '134': {
    bbCode:
      '(134) Watch an anime Recommended to one you [u]already completed[/u] and have listed in your MAL Favorites',
    description:
      '(134) Watch an anime Recommended to one you <u>already completed</u> and have listed in your MAL Favorites',
    addlInfo: [],
    defaultExtraInfo: ['MAL Favorite:', 'Date Favorite Completed:'],
    courses: [Main.Burger, Main.Lasagna, Main.Sandwich, Main.Sushi],
    validators: [],
    manualValidators: [
      'Anime recommended to a completed anime in your favorites',
    ],
  },
  '135': {
    bbCode:
      '(135) Watch an anime in which one of the People listed in your MAL Favorites participated',
    description:
      '(135) Watch an anime in which one of the People listed in your MAL Favorites participated',
    addlInfo: [
      '— Person must be listed on your profile under People; they can be a voice actor/actress, director, original creator, musical artist, etc.',
    ],
    defaultExtraInfo: ['Favorite Person:'],
    courses: [Main.Lasagna, Main.Pizza, Main.Sandwich],
    validators: [],
    manualValidators: ['Favorite person participated in anime'],
  },
  '136': {
    bbCode:
      '(136) Watch an anime that has no Opening Theme and no Ending Theme listed on MAL',
    description:
      '(136) Watch an anime that has no Opening Theme and no Ending Theme listed on MAL',
    addlInfo: [
      '— The anime cannot have an Opening Theme and it also cannot have an Ending Theme',
    ],
    defaultExtraInfo: [],
    courses: [Drink.Soda],
    validators: [validateSongCountEquals(0, 0)],
    manualValidators: [],
  },
  '137': {
    bbCode:
      '(137) Watch an anime that has only one Opening Theme and one Ending Theme listed on MAL',
    description:
      '(137) Watch an anime that has only one Opening Theme and one Ending Theme listed on MAL',
    addlInfo: [
      '— Cannot have 1 OP and 0 ED; cannot have 0 OP and 1 ED; must have exactly one of each',
    ],
    defaultExtraInfo: [],
    courses: [Side.GarlicBread, Side.TheMelon],
    validators: [validateSongCountEquals(1, 1)],
    manualValidators: [],
  },
  '138': {
    bbCode:
      '(138) Watch an anime with either 5+ Opening Themes or 5+ Ending Themes listed',
    description:
      '(138) Watch an anime with either 5+ Opening Themes or 5+ Ending Themes listed',
    addlInfo: [
      "— Example: 2 OP and 5 ED, 6 OP and 1 ED, 5 OP and 5 ED; it can't be 2 OP and 3 ED",
    ],
    defaultExtraInfo: [],
    courses: [Dessert.Cookie, Dessert.Milkshake],
    validators: [validateSongCountAtLeast(5, 5)],
    manualValidators: [],
  },
  '139': {
    bbCode:
      '(139) Watch an anime in which 2+ [u]different[/u] Opening Theme and/or Ending Theme are performed by the same Artist/Group',
    description:
      '(139) Watch an anime in which 2+ <u>different</u> Opening Theme and/or Ending Theme are performed by the same Artist/Group',
    addlInfo: [
      '— Must be two different songs; can be 2 OP, 2 ED, 1 OP+1 ED, etc.',
      '— The artist/group can collaborate with others; for example: in Cowboy Bebop The Seatbelts are credited for the OP "Tank!" and ED #1 "The Real Folk Blues" featuring Mai Yamane',
    ],
    defaultExtraInfo: ['Artist/Group:'],
    courses: [Main.Burger, Main.Omurice, Main.Pizza, Main.Spaghetti],
    validators: [],
    manualValidators: [
      '>=2 different OP/ED themes are by the same artist/group',
    ],
  },
  '140': {
    bbCode:
      '(140) Watch an anime with a listed Voice Actor who is also credited with a Theme/Insert Song Performance in the anime',
    description:
      '(140) Watch an anime with a listed Voice Actor who is also credited with a Theme/Insert Song Performance in the anime',
    addlInfo: [
      "— If the voice actor is credited under their band's name it will not be valid; for example: Kishou Taniyama must be credited with a Theme/Insert Song Performance in the anime instead of GRANRODEO",
    ],
    defaultExtraInfo: ['Voice Actor:'],
    courses: [Starter.Salad, Starter.Soup, Starter.SpringRolls],
    validators: [],
    manualValidators: [
      'VA is credited with a Theme/Insert song performance in anime',
    ],
  },
  '141': {
    bbCode:
      '(141) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/1][b]Action[/b][/url]',
    description:
      '(141) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/1">Action</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Starter.ChickenWings,
      Starter.Prawns,
      Starter.Soup,
      Starter.SpringRolls,
    ],
    validators: [validateTags(['Action'], 1)],
    manualValidators: [],
  },
  '142': {
    bbCode:
      '(142) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/2][b]Adventure[/b][/url]',
    description:
      '(142) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/2">Adventure</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Cake, Dessert.Cookie, Dessert.Dango],
    validators: [validateTags(['Adventure'], 1)],
    manualValidators: [],
  },
  '143': {
    bbCode:
      '(143) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/4][b]Comedy[/b][/url]',
    description:
      '(143) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/4">Comedy</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Drink.Coffee, Drink.Lemonade, Drink.Soda, Drink.Tea],
    validators: [validateTags(['Comedy'], 1)],
    manualValidators: [],
  },
  '144': {
    bbCode:
      '(144) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/10][b]Fantasy[/b][/url]',
    description:
      '(144) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/10">Fantasy</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Drink.Coffee],
    validators: [validateTags(['Fantasy'], 1)],
    manualValidators: [],
  },
  '145': {
    bbCode:
      '(145) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/19][b]Music[/b][/url]',
    description:
      '(145) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/19">Music</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Side.Fries,
      Side.Onigiri,
      Side.OnionRings,
      Side.TheMelon,
      Side.Tofu,
    ],
    validators: [validateTags(['Music'], 1)],
    manualValidators: [],
  },
  '146': {
    bbCode:
      '(146) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/15][b]Kids[/b][/url]',
    description:
      '(146) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/15">Kids</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Prawns, Starter.SpringRolls],
    validators: [validateTags(['Kids'], 1)],
    manualValidators: [],
  },
  '147': {
    bbCode:
      '(147) Watch an anime tagged with either [url=https://myanimelist.net/anime/genre/51][b]Anthropomorphic[/b][/url] or [url=https://myanimelist.net/anime/genre/18][b]Mecha[/b][/url]',
    description:
      '(147) Watch an anime tagged with either <a href="https://myanimelist.net/anime/genre/51">Anthropomorphic</a> or <a href="https://myanimelist.net/anime/genre/18">Mecha</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Cookie],
    validators: [validateTags(['Anthropomorphic', 'Mecha'], 1)],
    manualValidators: [],
  },
  '148': {
    bbCode:
      '(148) Watch an anime tagged with either [url=https://myanimelist.net/anime/genre/5][b]Avant Garde[/b][/url] or [url=https://myanimelist.net/anime/genre/42][b]Seinen[/b][/url]',
    description:
      '(148) Watch an anime tagged with either <a href="https://myanimelist.net/anime/genre/5">Avant Garde</a> or <a href="https://myanimelist.net/anime/genre/42">Seinen</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Sandwich, Main.Spaghetti, Main.Sushi],
    validators: [validateTags(['Avant Garde', 'Seinen'], 1)],
    manualValidators: [],
  },
  '149': {
    bbCode:
      '(149) Watch an anime tagged with either [url=https://myanimelist.net/anime/genre/13][b]Historical[/b][/url] or [url=https://myanimelist.net/anime/genre/27][b]Shounen[/b][/url]',
    description:
      '(149) Watch an anime tagged with either <a href="https://myanimelist.net/anime/genre/13">Historical</a> or <a href="https://myanimelist.net/anime/genre/27">Shounen</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Main.Burger,
      Main.Lasagna,
      Main.Omurice,
      Main.Pizza,
      Main.Spaghetti,
    ],
    validators: [validateTags(['Historical', 'Shounen'], 1)],
    manualValidators: [],
  },
  '150': {
    bbCode:
      '(150) Watch an anime tagged with either [url=https://myanimelist.net/anime/genre/36][b]Slice of Life[/b][/url] or [url=https://myanimelist.net/anime/genre/37][b]Supernatural[/b][/url]',
    description:
      '(150) Watch an anime tagged with either <a href="https://myanimelist.net/anime/genre/36">Slice of Life</a> or <a href="https://myanimelist.net/anime/genre/37">Supernatural</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Prawns, Starter.Soup, Starter.SpringRolls],
    validators: [validateTags(['Slice of Life', 'Supernatural'], 1)],
    manualValidators: [],
  },
  '151': {
    bbCode:
      '(151) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/50][b]Adult Cast[/b][/url], [url=https://myanimelist.net/anime/genre/73][b]Reverse Harem[/b][/url] or [url=https://myanimelist.net/anime/genre/75][b]Showbiz[/b][/url]',
    description:
      '(151) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/50">Adult Cast</a>, <a href="https://myanimelist.net/anime/genre/73">Reverse Harem</a> or <a href="https://myanimelist.net/anime/genre/75">Showbiz</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Lasagna, Main.Pizza, Main.Spaghetti],
    validators: [validateTags(['Adult Cast', 'Reverse Harem', 'Showbiz'], 1)],
    manualValidators: [],
  },
  '152': {
    bbCode:
      '(152) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/28][b]Boys Love[/b][/url], [url=https://myanimelist.net/anime/genre/7][b]Mystery[/b][/url] or [url=https://myanimelist.net/anime/genre/83][b]Villainess[/b][/url]',
    description:
      '(152) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/28">Boys Love</a>, <a href="https://myanimelist.net/anime/genre/7">Mystery</a> or <a href="https://myanimelist.net/anime/genre/83">Villainess</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Burger],
    validators: [validateTags(['Boys Love', 'Mystery', 'Villainess'], 1)],
    manualValidators: [],
  },
  '153': {
    bbCode:
      '(153) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/53][b]Childcare[/b][/url], [url=https://myanimelist.net/anime/genre/20][b]Parody[/b][/url] or [url=https://myanimelist.net/anime/genre/65][b]Magical Sex Shift[/b][/url]',
    description:
      '(153) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/53">Childcare</a>, <a href="https://myanimelist.net/anime/genre/20">Parody</a> or <a href="https://myanimelist.net/anime/genre/65">Magical Sex Shift</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Lasagna, Main.Sandwich],
    validators: [validateTags(['Childcare', 'Parody', 'Magical Sex Shift'], 1)],
    manualValidators: [],
  },
  '154': {
    bbCode:
      '(154) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/54][b]Combat Sports[/b][/url], [url=https://myanimelist.net/anime/genre/74][b]Love Status Quo[/b][/url] or [url=https://myanimelist.net/anime/genre/17][b]Martial Arts[/b][/url]',
    description:
      '(154) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/54">Combat Sports</a>, <a href="https://myanimelist.net/anime/genre/74">Love Status Quo</a> or <a href="https://myanimelist.net/anime/genre/17">Martial Arts</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cookie, Dessert.IceCream],
    validators: [
      validateTags(['Combat Sports', 'Love Status Quo', 'Martial Arts'], 1),
    ],
    manualValidators: [],
  },
  '155': {
    bbCode:
      '(155) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/81][b]Crossdressing[/b][/url], [url=https://myanimelist.net/anime/genre/38][b]Military[/b][/url] or [url=https://myanimelist.net/anime/genre/80][b]Visual Arts[/b][/url]',
    description:
      '(155) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/81">Crossdressing</a>, <a href="https://myanimelist.net/anime/genre/38">Military</a> or <a href="https://myanimelist.net/anime/genre/80">Visual Arts</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Sandwich, Main.Spaghetti, Main.Sushi],
    validators: [validateTags(['Crossdressing', 'Military', 'Visual Arts'], 1)],
    manualValidators: [],
  },
  '156': {
    bbCode:
      '(156) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/55][b]Delinquents[/b][/url], [url=https://myanimelist.net/anime/genre/31][b]Super Power[/b][/url] or [url=https://myanimelist.net/anime/genre/76][b]Survival[/b][/url]',
    description:
      '(156) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/55">Delinquents</a>, <a href="https://myanimelist.net/anime/genre/31">Super Power</a> or <a href="https://myanimelist.net/anime/genre/76">Survival</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cake],
    validators: [validateTags(['Delinquents', 'Super Power', 'Survival'], 1)],
    manualValidators: [],
  },
  '157': {
    bbCode:
      '(157) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/56][b]Educational[/b][/url], [url=https://myanimelist.net/anime/genre/82][b]Urban Fantasy[/b][/url] or [url=https://myanimelist.net/anime/genre/32][b]Vampire[/b][/url]',
    description:
      '(157) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/56">Educational</a>, <a href="https://myanimelist.net/anime/genre/82">Urban Fantasy</a> or <a href="https://myanimelist.net/anime/genre/32">Vampire</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Milkshake],
    validators: [validateTags(['Educational', 'Urban Fantasy', 'Vampire'], 1)],
    manualValidators: [],
  },
  '158': {
    bbCode:
      '(158) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/57][b]Gag Humor[/b][/url], [url=https://myanimelist.net/anime/genre/35][b]Harem[/b][/url] or [url=https://myanimelist.net/anime/genre/78][b]Time Travel[/b][/url]',
    description:
      '(158) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/57">Gag Humor</a>, <a href="https://myanimelist.net/anime/genre/35">Harem</a> or <a href="https://myanimelist.net/anime/genre/78">Time Travel</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cake, Dessert.IceCream],
    validators: [validateTags(['Gag Humor', 'Harem', 'Time Travel'], 1)],
    manualValidators: [],
  },
  '159': {
    bbCode:
      '(159) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/26][b]Girls Love[/b][/url], [url=https://myanimelist.net/anime/genre/14][b]Horror[/b][/url] or [url=https://myanimelist.net/anime/genre/70][b]Performing Arts[/b][/url]',
    description:
      '(159) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/26">Girls Love</a>, <a href="https://myanimelist.net/anime/genre/14">Horror</a> or <a href="https://myanimelist.net/anime/genre/70">Performing Arts</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Sandwich, Main.Sushi],
    validators: [validateTags(['Girls Love', 'Horror', 'Performing Arts'], 1)],
    manualValidators: [],
  },
  '160': {
    bbCode:
      '(160) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/58][b]Gore[/b][/url], [url=https://myanimelist.net/anime/genre/40][b]Psychological[/b][/url] or [url=https://myanimelist.net/anime/genre/79][b]Video Game[/b][/url]',
    description:
      '(160) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/58">Gore</a>, <a href="https://myanimelist.net/anime/genre/40">Psychological</a> or <a href="https://myanimelist.net/anime/genre/79">Video Game</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.GarlicBread, Side.OnionRings],
    validators: [validateTags(['Gore', 'Psychological', 'Video Game'], 1)],
    manualValidators: [],
  },
  '161': {
    bbCode:
      '(161) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/59][b]High Stakes Game[/b][/url], [url=https://myanimelist.net/anime/genre/6][b]Mythology[/b][/url] or [url=https://myanimelist.net/anime/genre/68][b]Organized Crime[/b][/url]',
    description:
      '(161) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/59">High Stakes Game</a>, <a href="https://myanimelist.net/anime/genre/6">Mythology</a> or <a href="https://myanimelist.net/anime/genre/68">Organized Crime</a>',
    addlInfo: [],
    defaultExtraInfo: [''],
    courses: [Starter.Gyoza, Starter.Salad, Starter.SpringRolls],
    validators: [
      validateTags(['High Stakes Game', 'Mythology', 'Organized Crime'], 1),
    ],
    manualValidators: [],
  },
  '162': {
    bbCode:
      '(162) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/60][b]Idols (Female)[/b][/url], [url=https://myanimelist.net/anime/genre/66][b]Mahou Shoujo[/b][/url] or [url=https://myanimelist.net/anime/genre/72][b]Reincarnation[/b][/url]',
    description:
      '(162) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/60">Idols (Female)</a>, <a href="https://myanimelist.net/anime/genre/66">Mahou Shoujo</a> or <a href="https://myanimelist.net/anime/genre/72">Reincarnation</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Salad],
    validators: [
      validateTags(['Idols (Female)', 'Mahou Shoujo', 'Reincarnation'], 1),
    ],
    manualValidators: [],
  },
  '163': {
    bbCode:
      '(163) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/61][b]Idols (Male)[/b][/url], [url=https://myanimelist.net/anime/genre/62][b]Isekai[/b][/url] or [url=https://myanimelist.net/anime/genre/3][b]Racing[/b][/url]',
    description:
      '(163) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/61">Idols (Male)</a>, <a href="https://myanimelist.net/anime/genre/62">Isekai</a> or <a href="https://myanimelist.net/anime/genre/3">Racing</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Sushi],
    validators: [validateTags(['Idols (Male)', 'Isekai', 'Racing'], 1)],
    manualValidators: [],
  },
  '164': {
    bbCode:
      '(164) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/43][b]Josei[/b][/url], [url=https://myanimelist.net/anime/genre/71][b]Pets[/b][/url] or [url=https://myanimelist.net/anime/genre/25][b]Shoujo[/b][/url]',
    description:
      '(164) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/43">Josei</a>, <a href="https://myanimelist.net/anime/genre/71">Pets</a> or <a href="https://myanimelist.net/anime/genre/25">Shoujo</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Salad],
    validators: [validateTags(['Josei', 'Pets', 'Shoujo'], 1)],
    manualValidators: [],
  },
  '165': {
    bbCode:
      '(165) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/64][b]Love Polygon[/b][/url], [url=https://myanimelist.net/anime/genre/69][b]Otaku Culture[/b][/url] or [url=https://myanimelist.net/anime/genre/29][b]Space[/b][/url]',
    description:
      '(165) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/64">Love Polygon</a>, <a href="https://myanimelist.net/anime/genre/69">Otaku Culture</a> or <a href="https://myanimelist.net/anime/genre/29">Space</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.Cookie, Dessert.Milkshake],
    validators: [validateTags(['Love Polygon', 'Otaku Culture', 'Space'], 1)],
    manualValidators: [],
  },
  '166': {
    bbCode:
      '(166) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/46][b]Award Winning[/b][/url], [url=https://myanimelist.net/anime/genre/52][b]CGDCT[/b][/url] or [url=https://myanimelist.net/anime/genre/41][b]Suspense[/b][/url]',
    description:
      '(166) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/46">Award Winning</a>, <a href="https://myanimelist.net/anime/genre/52">CGDCT</a> or <a href="https://myanimelist.net/anime/genre/41">Suspense</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.OnionRings, Side.TheMelon],
    validators: [validateTags(['Award Winning', 'CGDCT', 'Suspense'], 1)],
    manualValidators: [],
  },
  '167': {
    bbCode:
      '(167) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/39][b]Detective[/b][/url], [url=https://myanimelist.net/anime/genre/63][b]Iyashikei[/b][/url] or [url=https://myanimelist.net/anime/genre/77][b]Team Sports[/b][/url]',
    description:
      '(167) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/39">Detective</a>, <a href="https://myanimelist.net/anime/genre/63">Iyashikei</a> or <a href="https://myanimelist.net/anime/genre/77">Team Sports</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Lasagna, Main.Sandwich, Main.Sushi],
    validators: [validateTags(['Detective', 'Iyashikei', 'Team Sports'], 1)],
    manualValidators: [],
  },
  '168': {
    bbCode:
      '(168) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/47][b]Gourmet[/b][/url], [url=https://myanimelist.net/anime/genre/67][b]Medical[/b][/url] or [url=https://myanimelist.net/anime/genre/30][b]Sports[/b][/url]',
    description:
      '(168) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/47">Gourmet</a>, <a href="https://myanimelist.net/anime/genre/67">Medical</a> or <a href="https://myanimelist.net/anime/genre/30">Sports</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.Burger, Main.Lasagna],
    validators: [validateTags(['Gourmet', 'Medical', 'Sports'], 1)],
    manualValidators: [],
  },
  '169': {
    bbCode:
      '(169) Watch an anime tagged with [url=https://myanimelist.net/anime/genre/21][b]Samurai[/b][/url], [url=https://myanimelist.net/anime/genre/11][b]Strategy Game[/b][/url] or [url=https://myanimelist.net/anime/genre/48][b]Workplace[/b][/url]',
    description:
      '(169) Watch an anime tagged with <a href="https://myanimelist.net/anime/genre/21">Samurai</a>, <a href="https://myanimelist.net/anime/genre/11">Strategy Game</a> or <a href="https://myanimelist.net/anime/genre/48">Workplace</a>',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Salad],
    validators: [validateTags(['Samurai', 'Strategy Game', 'Workplace'], 1)],
    manualValidators: [],
  },
  '170': {
    bbCode:
      '(170) Watch an anime tagged with at least TWO of the following: [url=https://myanimelist.net/anime/genre/8][b]Drama[/b][/url], [url=https://myanimelist.net/anime/genre/22][b]Romance[/b][/url], [url=https://myanimelist.net/anime/genre/23][b]School[/b][/url], [url=https://myanimelist.net/anime/genre/24][b]Sci-Fi[/b][/url]',
    description:
      '(170) Watch an anime tagged with at least TWO of the following: <a href="https://myanimelist.net/anime/genre/8">Drama</a>, <a href="https://myanimelist.net/anime/genre/22">Romance</a>, <a href="https://myanimelist.net/anime/genre/23">School</a>, <a href="https://myanimelist.net/anime/genre/24">Sci-Fi</a>',
    addlInfo: [],
    defaultExtraInfo: ['Tagged With 1:', 'Tagged With 2:'],
    courses: [Starter.ChickenWings, Starter.Gyoza, Starter.Prawns],
    validators: [validateTags(['Drama', 'Romance', 'School', 'Sci-Fi'], 2)],
    manualValidators: [],
  },
  '171': {
    bbCode: '(171) Watch an anime tagged with 2 Genres or more',
    description: '(171) Watch an anime tagged with 2 Genres or more',
    addlInfo: ['— Themes and Demographics are not valid'],
    defaultExtraInfo: [''],
    courses: [Drink.Tea],
    validators: [validateGenreCount(2, 'gte')],
    manualValidators: [],
  },
  '172': {
    bbCode: '(172) Watch an anime tagged with 3 Genres or more',
    description: '(172) Watch an anime tagged with 3 Genres or more',
    addlInfo: ['— Themes and Demographics are not valid'],
    defaultExtraInfo: [],
    courses: [Dessert.Dango, Dessert.IceCream],
    validators: [validateGenreCount(3, 'gte')],
    manualValidators: [],
  },
  '173': {
    bbCode: '(173) Watch an anime rated G - All Ages or PG - Children',
    description: '(173) Watch an anime rated G - All Ages or PG - Children',
    addlInfo: ['— Does NOT include anime rated PG-13 - Teens 13 or Older'],
    defaultExtraInfo: [],
    courses: [Main.Burger, Main.Lasagna, Main.Omurice, Main.Pizza, Main.Sushi],
    validators: [validateRating(['G - All Ages', 'PG - Children'])],
    manualValidators: [],
  },
  '174': {
    bbCode: '(174) Watch an anime rated PG-13 - Teens 13 or older',
    description: '(174) Watch an anime rated PG-13 - Teens 13 or older',
    addlInfo: ['— Does NOT include anime rated PG - Children'],
    defaultExtraInfo: [],
    courses: [Drink.Soda, Drink.Tea],
    validators: [validateRating(['PG-13 - Teens 13 or older'])],
    manualValidators: [],
  },
  '175': {
    bbCode:
      '(175) Watch an anime rated R -17+, R+ - Mild Nudity, or Rx - Hentai',
    description:
      '(175) Watch an anime rated R -17+, R+ - Mild Nudity, or Rx - Hentai',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Starter.ChickenWings,
      Starter.Prawns,
      Starter.Salad,
      Starter.SpringRolls,
    ],
    validators: [
      validateRating([
        'R - 17+ (violence & profanity)',
        'R+ - Mild Nudity',
        'Rx - Hentai',
      ]),
    ],
    manualValidators: [],
  },
  '176': {
    bbCode: '(176) Watch an anime adapted from a [b]Game[/b] Source',
    description: '(176) Watch an anime adapted from a <b>Game</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Omurice, Main.Pizza, Main.Spaghetti],
    validators: [validateSource(['Game'])],
    manualValidators: [],
  },
  '177': {
    bbCode: '(177) Watch an anime adapted from a [b]Manga[/b] Source',
    description: '(177) Watch an anime adapted from a <b>Manga</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Gyoza, Starter.Prawns, Starter.Soup, Starter.SpringRolls],
    validators: [validateSource(['Manga'])],
    manualValidators: [],
  },
  '178': {
    bbCode: '(178) Watch an anime adapted from an [b]Original[/b] Source',
    description: '(178) Watch an anime adapted from an <b>Original</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Cake, Dessert.Dango],
    validators: [validateSource(['Original'])],
    manualValidators: [],
  },
  '179': {
    bbCode: '(179) Watch an anime adapted from an [b]Unknown[/b] Source',
    description: '(179) Watch an anime adapted from an <b>Unknown</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [
      Side.Fries,
      Side.Onigiri,
      Side.OnionRings,
      Side.TheMelon,
      Side.Tofu,
    ],
    validators: [validateSource(['Unknown'])],
    manualValidators: [],
  },
  '180': {
    bbCode:
      '(180) Watch an anime adapted from a [b]4-koma Manga[/b] or [b]Novel[/b] Source',
    description:
      '(180) Watch an anime adapted from a <b>4-koma Manga</b> or <b>Novel</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.TheMelon],
    validators: [validateSource(['4-koma Manga', 'Novel'])],
    manualValidators: [],
  },
  '181': {
    bbCode:
      '(181) Watch an anime adapted from a [b]Book[/b] or [b]Light Novel[/b] Source',
    description:
      '(181) Watch an anime adapted from a <b>Book</b> or <b>Light Novel</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Drink.Lemonade],
    validators: [validateSource(['Book', 'Light Novel'])],
    manualValidators: [],
  },
  '182': {
    bbCode:
      '(182) Watch an anime adapted from a [b]Mixed Media[/b] or [b]Visual Novel[/b] Source',
    description:
      '(182) Watch an anime adapted from a <b>Mixed Media</b> or <b>Visual Novel</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.Prawns, Starter.Salad],
    validators: [validateSource(['Mixed Media', 'Visual Novel'])],
    manualValidators: [],
  },
  '183': {
    bbCode:
      '(183) Watch an anime adapted from a [b]Music[/b], [b]Picture Book[/b] or [b]Web Manga[/b] Source',
    description:
      '(183) Watch an anime adapted from a <b>Music</b>, <b>Picture Book</b> or <b>Web Manga</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Onigiri, Side.TheMelon],
    validators: [validateSource(['Music', 'Picture Book', 'Web Manga'])],
    manualValidators: [],
  },
  '184': {
    bbCode:
      '(184) Watch an anime adapted from an [b]Other[/b] or [b]Web Novel[/b] Source',
    description:
      '(184) Watch an anime adapted from an <b>Other</b> or <b>Web Novel</b> Source',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Main.FishAndChips, Main.Lasagna, Main.Pizza, Main.Sandwich],
    validators: [validateSource(['Other', 'Web Novel'])],
    manualValidators: [],
  },
  '185': {
    bbCode:
      '(185) Watch an anime generated using [url=https://spin.moe/][b]Spin.moe[/b][/url] ([url=https://myanimelist.net/forum/?goto=post&topicid=1869539&id=71952295][b]Instructions[/b][/url])',
    description:
      '(185) Watch an anime generated using <a href="https://spin.moe/">Spin.moe</a> (<a href="https://myanimelist.net/forum/?goto=post&topicid=1869539&id=71952295">Instructions</a>)',
    addlInfo: [],
    defaultExtraInfo: ['Screenshot:'],
    courses: [Dessert.Cookie, Dessert.IceCream],
    validators: [],
    manualValidators: ['Anime generated using spin.moe'],
  },
  '186': {
    bbCode:
      '(186) Watch a [url=https://anime.jhiday.net/hof/challenge/koreanchinese#challengeItems][b]Chinese or Korean[/b][/url] anime',
    description:
      '(186) Watch a <a href="https://anime.jhiday.net/hof/challenge/koreanchinese#challengeItems">Chinese or Korean</a> anime',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Onigiri, Side.Tofu],
    validators: [],
    manualValidators: ['Anime present on HOF challenge'],
  },
  '187': {
    bbCode:
      '(187) Finish an anime that you watched at least one episode of and dropped/put on hold before September 30, 2025 (Alternatively: watch an anime provided by [url=https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68342157][b]other participants[/b][/url])',
    description:
      '(187) Finish an anime that you watched at least one episode of and dropped/put on hold before September 30, 2025 (Alternatively: watch an anime provided by <a href="https://myanimelist.net/forum/?goto=post&topicid=1867298&id=68342157">other participants</a>)',
    addlInfo: [
      '— The anime needs to have more than one episode and you must have watched at least one episode previously',
    ],
    defaultExtraInfo: [
      'Original Anime Start Date:',
      'Last Watched Episode Date:',
      'Eps Previously Watched:',
      'Screenshot:',
    ],
    courses: [Main.Sandwich, Main.Sushi],
    validators: [],
    manualValidators: [
      'Anime dropped/put on-hold before September 30, 2025',
      'Anime has more than one episode',
      'At least one episode watched previously',
    ],
  },
  '188': {
    bbCode:
      '(188) Watch an anime that has been adapted to [url=https://myanimelist.net/clubs.php?cid=5450][b]live-action[/b][/url]',
    description:
      '(188) Watch an anime that has been adapted to <a href="https://myanimelist.net/clubs.php?cid=5450">live-action</a>',
    addlInfo: [
      '— The anime needs to be listed under Anime Relations on the right side of the club page',
    ],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Milkshake],
    validators: [],
    manualValidators: ['Anime present under Anime Relations on club page'],
  },
  '189': {
    bbCode:
      '(189) Watch an anime that is listed in the [url=https://anidb.net/tag/2669][b]School Clubs[/b][/url] tag on AniDB',
    description:
      '(189) Watch an anime that is listed in the <a href="https://anidb.net/tag/2669">School Clubs</a> tag on AniDB',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Starter.ChickenWings, Starter.Gyoza],
    validators: [],
    manualValidators: ['Anime has specified tag on AniDB'],
  },
  '190': {
    bbCode: '(190) Watch an anime with no related anime listed',
    description: '(190) Watch an anime with no related anime listed',
    addlInfo: [
      '— There can be no related anime listed, although there can be a related Manga/Light Novel/Novel',
    ],
    defaultExtraInfo: [],
    courses: [Dessert.Dango, Dessert.Milkshake],
    validators: [],
    manualValidators: ['Anime has no related anime listed'],
  },
  '191': {
    bbCode:
      '(191) Watch an [b]afternoon/evening[/b] anime (broadcast between [b]17:00 and 22:59[/b] JST)',
    description:
      '(191) Watch an <b>afternoon/evening</b> anime (broadcast between <b>17:00 and 22:59</b> JST)',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Side.Fries, Side.OnionRings, Side.TheMelon],
    validators: [validateAirTime(['17', '18', '19', '20', '21', '22'])],
    manualValidators: [],
  },
  '192': {
    bbCode:
      '(192) Watch a [b]late night[/b] anime (broadcast between [b]23:00 and 03:59[/b] JST)',
    description:
      '(192) Watch a <b>late night</b> anime (broadcast between <b>23:00 and 03:59</b> JST)',
    addlInfo: [],
    defaultExtraInfo: [],
    courses: [Dessert.ApplePie, Dessert.Cake, Dessert.Cookie],
    validators: [validateAirTime(['23', '00', '01', '02', '03'])],
    manualValidators: [],
  },
};

export function hashManualValidators(
  manualValidators: string[],
  courses?: CourseItem[]
) {
  return manualValidators.reduce(
    (prev, curr) => ({
      ...prev,
      [stringHash(curr)]: { valid: false, courses },
    }),
    {} as { [hash: number]: ManualValidator }
  );
}

export function getManualValidatorsForChallenge(
  challengeId: string,
  course: CourseItem
) {
  return [
    ...CHALLENGE_LIST[challengeId].manualValidators,
    ...COURSE_DATA[course].manualValidators,
  ];
}

export function generateChallengeData() {
  const data: ChallengeData = {};
  for (const [id, value] of Object.entries(CHALLENGE_LIST)) {
    data[id] = {
      id,
      malId: '',
      startDate: '',
      endDate: '',
      extraInfo:
        value.defaultExtraInfo?.map((key) => ({
          key,
          value: '',
          required: true,
        })) ?? [],
      courses: value.courses,
      manualValidators: hashManualValidators(value.manualValidators),
    };

    for (const course of value.courses) {
      for (const extraInfo of COURSE_DATA[course].extraInfo) {
        data[id].extraInfo.push({
          key: extraInfo,
          value: '',
          required: true,
          courses: [course],
        });
      }

      data[id].manualValidators = {
        ...data[id].manualValidators,
        ...hashManualValidators(COURSE_DATA[course].manualValidators, [course]),
      };
    }
  }
  return data;
}

export function getEnabledCourses(courses: ConfigData['courses']) {
  function isCourseEnabled(course: any) {
    if (Object.values(Drink).includes(course))
      return courses.drink.enabled && courses.drink.value === course;
    else if (Object.values(Starter).includes(course))
      return courses.starter.enabled && courses.starter.value === course;
    else if (Object.values(Main).includes(course))
      return courses.main.enabled && courses.main.value === course;
    else if (Object.values(Side).includes(course))
      return courses.side.enabled && courses.side.value === course;
    else return courses.dessert.enabled && courses.dessert.value === course;
  }

  return COURSE_VALUES.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: isCourseEnabled(curr),
    }),
    {} as Record<CourseItem, boolean>
  );
}

export function getEnabledChallenges(
  courses: ConfigData['courses'],
  challengeData: ChallengeData
) {
  const enabledCourses = getEnabledCourses(courses);
  const enabledChallenges: ChallengeData = {};
  for (const [id, value] of Object.entries(challengeData)) {
    if (
      value.courses.some(
        (course) => enabledCourses[course as keyof typeof enabledCourses]
      )
    ) {
      enabledChallenges[id] = value;
    }
  }
  return enabledChallenges;
}

export function generateCourseValidatorInfo() {
  return Object.entries(COURSE_DATA).reduce(
    (prevData, [course, datum]) => ({
      ...prevData,
      [course]: datum.courseValidatorInfo?.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.name]: curr.values?.[0] ?? '',
        }),
        {} as Record<string, string>
      ),
    }),
    {} as Record<CourseItem, Record<string, string>>
  );
}
