import { Game, NbaApiError } from '../types/index';

export async function fetchGamesForDate(date: string): Promise<Game[]> {
  const apiKey = process.env.DATA_PROVIDER_API_KEY;
  if (!apiKey) {
    throw new NbaApiError('DATA_PROVIDER_API_KEY is not defined in environment variables');
  }

  const url = `https://api.balldontlie.io/v1/games?dates[]=${date}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new NbaApiError(`balldontlie API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.data as Game[];
  } catch (error: any) {
    if (error instanceof NbaApiError) throw error;
    throw new NbaApiError(`Failed to fetch games: ${error.message}`);
  }
}
