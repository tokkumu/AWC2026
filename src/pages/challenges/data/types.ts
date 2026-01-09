import { AnimeDetails, CourseItem } from '../../../types';
import { ConfigData } from '../../config/types';
import { ChallengeEntry } from '../types';

export type Challenge = {
  bbCode: string;
  description: string;
  addlInfo: string[];
  defaultExtraInfo?: string[];
  courses: CourseItem[];
  validators: Validator[];
  manualValidators: string[];
};
export type ChallengeList = { [challengeId: string]: Challenge };

export type ValidatorStatus = { criterion: string; valid: boolean };

export type ValidationStatus = {
  valid: boolean;
  success: string[];
  error: string[];
};

export interface ValidatorParams {
  anime: AnimeDetails;
  config: ConfigData;
  entry: ChallengeEntry;
  course: CourseItem;
}

export type Validator = (params: ValidatorParams) => ValidatorStatus;

export type CourseValidatorInfo = {
  name: string;
  type: 'select' | 'text';
  values?: string[];
};

export type CourseDatum = {
  label: string;
  requiredChallenges: number;
  validators: Validator[];
  manualValidators: string[];
  extraInfo: string[];
  courseValidatorInfo?: CourseValidatorInfo[];
};

export type CourseData = Record<CourseItem, CourseDatum>;
