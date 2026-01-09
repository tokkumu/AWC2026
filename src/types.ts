export enum Drink {
  Coffee = 'Coffee',
  Tea = 'Tea',
  Soda = 'Soda',
  Lemonade = 'Lemonade',
}

export enum Starter {
  Soup = 'Soup',
  Salad = 'Salad',
  Gyoza = 'Gyoza',
  SpringRolls = 'Spring Rolls',
  Prawns = 'Prawns',
  ChickenWings = 'Chicken Wings',
}

export enum Main {
  Burger = 'Burger',
  Sushi = 'Sushi',
  Spaghetti = 'Spaghetti',
  Pizza = 'Pizza',
  Lasagna = 'Lasagna',
  Sandwich = 'Sandwich',
  Omurice = 'Omurice',
  FishAndChips = 'Fish & Chips',
}

export enum Side {
  Fries = 'Fries',
  Onigiri = 'Onigiri',
  OnionRings = 'Onion Rings',
  GarlicBread = 'Garlic Bread',
  TheMelon = 'The Melon',
  Tofu = 'Tofu',
}

export enum Dessert {
  Cake = 'Cake',
  IceCream = 'Ice Cream',
  Cookie = 'Cookie',
  ApplePie = 'Apple Pie',
  Milkshake = 'Milkshake',
  Dango = 'Dango',
}

export type CourseItem = Drink | Starter | Main | Side | Dessert;

export const COURSE_VALUES = [
  ...Object.values(Drink),
  ...Object.values(Starter),
  ...Object.values(Main),
  ...Object.values(Side),
  ...Object.values(Dessert),
] as const;

export type AnimeDetails = {
  timestamp: number;
  malId: number;
  title: string;
  type: string;
  source: string;
  episodes: number;
  status: string;
  aired: {
    day: string;
    time: string;
    from: {
      year: number;
      month: number;
      day: number;
    };
    to: {
      year: number;
      month: number;
      day: number;
    };
  };
  duration: string;
  episodeDurationMinutes: number;
  rating: string;
  score: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  season: string;
  year: number;
  producers: string[];
  licensors: string[];
  studios: string[];
  genres: string[];
  themes: string[];
  demographics: string[];
  openingCount: number;
  endingCount: number;
  mainCharacters: number;
  supportingCharacters: number;
  statistics: {
    watching: number;
    completed: number;
    onHold: number;
    ptw: number;
    dropped: number;
  };
};
