export type ContentCategory = 'Movie' | 'Series' | 'Anime' | 'Documentary';

export interface FluxContent {
  id: number;
  title: string;
  category: ContentCategory;
  genres: string[];
  year: number;
  ageRating: string;
  matchScore: number;
  duration: string;
  seasons?: number;
  synopsis: string;
  /** Two-tone gradient used to render the placeholder artwork for this title. */
  gradient: [string, string];
  language: string;
  trending?: boolean;
  featured?: boolean;
  newRelease?: boolean;
  /** Optional poster or artwork URL for the title. */
  image?: string;
}
