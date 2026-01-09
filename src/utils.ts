import { AnimeDetails } from './types';

export function durationToMinutes(duration: string) {
  if (duration === 'Unknown') return 0;
  const { hr, min, sec } = duration.match(
    /^(?:(?<hr>\d+) hr)? *(?:(?<min>\d+) min)? *(?:(?<sec>\d+) sec)?.*$/
  )!.groups!;
  return +(
    (parseInt(hr) || 0) * 60 +
    (parseInt(min) || 0) +
    (parseInt(sec) || 0) / 60
  ).toFixed(2);
}

export async function loadAnime(
  malId: string
): Promise<AnimeDetails | undefined> {
  if (!malId || isNaN(+malId)) {
    return;
  }

  const { data } = await (
    await fetch(`https://api.jikan.moe/v4/anime/${malId}/full`)
  ).json();

  const charactersData = await (
    await fetch(`https://api.jikan.moe/v4/anime/${malId}/characters`)
  ).json();

  const statisticsData = (await (
    await fetch(`https://api.jikan.moe/v4/anime/${malId}/statistics`)
  ).json()) as { data: Record<string, number> };

  if (!data) {
    return;
  }

  return {
    timestamp: Date.now(),
    malId: data.mal_id,
    title: data.title,
    type: data.type,
    source: data.source,
    episodes: data.episodes,
    status: data.status,
    aired: {
      day: data.broadcast.day ?? data.broadcast.string,
      time: data.broadcast.time,
      from: data.aired.prop.from,
      to: data.aired.prop.to,
    },
    duration: data.duration,
    episodeDurationMinutes: durationToMinutes(data.duration),
    rating: data.rating,
    score: data.score,
    rank: data.rank,
    popularity: data.popularity,
    members: data.members,
    favorites: data.favorites,
    season: data.season,
    year: data.season_year,
    producers: data.producers.map((g: { name: string }) => g.name),
    licensors: data.licensors.map((g: { name: string }) => g.name),
    studios: data.studios.map((g: { name: string }) => g.name),
    genres: data.genres.map((g: { name: string }) => g.name),
    themes: data.themes.map((t: { name: string }) => t.name),
    demographics: data.demographics.map((d: { name: string }) => d.name),
    openingCount: data.theme.openings.length,
    endingCount: data.theme.endings.length,
    mainCharacters: charactersData.data.filter(
      (c: { role: string }) => c.role === 'Main'
    ).length,
    supportingCharacters: charactersData.data.filter(
      (c: { role: string }) => c.role === 'Supporting'
    ).length,
    statistics: {
      watching: statisticsData.data.watching,
      completed: statisticsData.data.completed,
      onHold: statisticsData.data.on_hold,
      ptw: statisticsData.data.plan_to_watch,
      dropped: statisticsData.data.dropped,
    },
  };
}
