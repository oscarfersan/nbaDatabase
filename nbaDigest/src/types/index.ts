export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

export interface Game {
  id: number;
  date: string;
  home_team_score: number;
  visitor_team_score: number;
  home_team: Team;
  visitor_team: Team;
  status: string;
}

export interface Subscriber {
  id: number;
  email: string;
  status: 'active' | 'unsubscribed';
  created_at: string;
}

export interface CachedGame {
  _id: string;
  dateTime: string;
  externalId: string;
}

export class AppError extends Error {
  constructor(public message: string, public code?: string) {
    super(message);
    this.name = 'AppError';
  }
}

export class NbaApiError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'NbaApiError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'DatabaseError';
  }
}
