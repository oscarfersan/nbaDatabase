import { Game, NbaApiError } from '../types/index';

const BASE_URL = 'https://api.balldontlie.io/v1/games';
const RATE_LIMIT_PER_MINUTE = 5;
const MIN_REQUEST_INTERVAL_MS = Math.ceil(60000 / RATE_LIMIT_PER_MINUTE);
const DEFAULT_PER_PAGE = 100;

let nextAllowedRequestAt = 0;

interface GamesApiMeta {
  next_page?: number | null;
  total_pages?: number;
}

interface GamesApiResponse {
  data: Game[];
  meta?: GamesApiMeta;
}

function getApiKey(): string {
  const apiKey = process.env.DATA_PROVIDER_API_KEY;
  if (!apiKey) {
    throw new NbaApiError('DATA_PROVIDER_API_KEY is not defined in environment variables');
  }

  return apiKey;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function enforceRateLimit(): Promise<void> {
  const now = Date.now();
  if (now < nextAllowedRequestAt) {
    await sleep(nextAllowedRequestAt - now);
  }

  nextAllowedRequestAt = Date.now() + MIN_REQUEST_INTERVAL_MS;
}

function isGamesApiResponse(value: unknown): value is GamesApiResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<GamesApiResponse>;
  return Array.isArray(candidate.data);
}

async function fetchGamesWithParams(params: URLSearchParams): Promise<GamesApiResponse> {
  await enforceRateLimit();

  const apiKey = getApiKey();
  const url = `${BASE_URL}?${params.toString()}`;
  const response = await fetch(url, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new NbaApiError(`balldontlie API error: ${response.status} - ${errorText}`);
  }

  const payload: unknown = await response.json();
  if (!isGamesApiResponse(payload)) {
    throw new NbaApiError('Invalid balldontlie API response shape');
  }

  return payload;
}

export async function fetchGamesForDate(date: string): Promise<Game[]> {
  try {
    const params = new URLSearchParams();
    params.append('dates[]', date);
    params.set('per_page', String(DEFAULT_PER_PAGE));

    const data = await fetchGamesWithParams(params);
    return data.data;
  } catch (error: unknown) {
    if (error instanceof NbaApiError) throw error;
    const message = error instanceof Error ? error.message : String(error);
    throw new NbaApiError(`Failed to fetch games: ${message}`);
  }
}

export async function fetchGamesForDates(dates: string[]): Promise<Game[]> {
  const uniqueDates = Array.from(new Set(dates)).sort();
  if (uniqueDates.length === 0) {
    return [];
  }

  try {
    const results: Game[] = [];
    let page = 1;

    while (true) {
      const params = new URLSearchParams();
      params.set('per_page', String(DEFAULT_PER_PAGE));
      params.set('page', String(page));
      for (const date of uniqueDates) {
        params.append('dates[]', date);
      }

      const data = await fetchGamesWithParams(params);
      results.push(...data.data);

      const nextPage = data.meta?.next_page;
      const totalPages = data.meta?.total_pages;
      const reachedTotalPages = typeof totalPages === 'number' && page >= totalPages;

      if (typeof nextPage === 'number' && nextPage > page) {
        page = nextPage;
        continue;
      }

      if (reachedTotalPages || data.data.length < DEFAULT_PER_PAGE) {
        break;
      }

      page += 1;
    }

    return results;
  } catch (error: unknown) {
    if (error instanceof NbaApiError) throw error;
    const message = error instanceof Error ? error.message : String(error);
    throw new NbaApiError(`Failed to fetch weekly games: ${message}`);
  }
}

export async function fetchGamesByExternalIds(externalIds: string[]): Promise<Game[]> {
  const uniqueExternalIds = Array.from(new Set(externalIds));
  if (uniqueExternalIds.length === 0) {
    return [];
  }

  try {
    const chunkSize = DEFAULT_PER_PAGE;
    const result: Game[] = [];

    for (let offset = 0; offset < uniqueExternalIds.length; offset += chunkSize) {
      const batch = uniqueExternalIds.slice(offset, offset + chunkSize);
      const params = new URLSearchParams();
      params.set('per_page', String(DEFAULT_PER_PAGE));
      for (const externalId of batch) {
        params.append('ids[]', externalId);
      }

      const data = await fetchGamesWithParams(params);
      result.push(...data.data);
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof NbaApiError) throw error;
    const message = error instanceof Error ? error.message : String(error);
    throw new NbaApiError(`Failed to fetch games by ids: ${message}`);
  }
}
