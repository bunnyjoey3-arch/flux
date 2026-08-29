export interface Review {
  id: number;
  movieId: number;
  userId: string;
  displayName: string;
  stars: number;
  comment?: string;
  postedOn: string;
}

export interface ReviewDraft {
  stars: number;
  comment?: string;
}

export interface WatchlistItem {
  id: number;
  movieId: number;
  title: string;
  posterUrl?: string;
  addedOn: string;
}
