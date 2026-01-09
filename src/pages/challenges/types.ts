import { Dispatch, SetStateAction } from 'react';
import { ConfigData } from '../config/types';
import { AnimeDetails, CourseItem } from '../../types';

export interface SidebarProps {
  courses: Record<CourseItem, boolean>;
  setCurrentCourse: Dispatch<SetStateAction<CourseItem>>;
}

export interface ExtraInfo {
  key: string;
  value: string;
  required: boolean;
  courses?: CourseItem[];
}

export interface ManualValidator {
  valid: boolean;
  courses?: CourseItem[];
}

export interface ChallengeEntry {
  id: string;
  malId: string;
  startDate: string;
  endDate: string;
  extraInfo: ExtraInfo[];
  manualValidators: { [hash: number]: ManualValidator };
  courses: CourseItem[];
  animeData?: AnimeDetails;
}

export interface ChallengeData {
  [challengeId: string]: ChallengeEntry;
}

export interface CourseProps {
  currentCourse: CourseItem;
  challengeData: ChallengeData;
  setChallengeData: Dispatch<SetStateAction<ChallengeData>>;
  config: ConfigData;
}

export interface ChallengesProps {
  challengeData: ChallengeData;
  setChallengeData: Dispatch<SetStateAction<ChallengeData>>;
  config: ConfigData;
}
