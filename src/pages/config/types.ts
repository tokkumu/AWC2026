import { CourseItem } from '../../types';

export interface CourseConfigItem {
  enabled?: boolean;
  value: CourseItem;
}

export interface ConfigData {
  username: string;
  completedAnime: string;
  timeZone: string;
  animeInForum: string;
  initialPostNumber: string;
  legend: {
    ptw: string;
    watching: string;
    completed: string;
  };
  courses: {
    drink: CourseConfigItem;
    starter: CourseConfigItem;
    main: CourseConfigItem;
    side: CourseConfigItem;
    dessert: CourseConfigItem;
  };
  courseValidatorInfo: Record<CourseItem, Record<string, string>>;
}
