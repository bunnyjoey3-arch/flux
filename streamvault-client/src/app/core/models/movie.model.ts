export interface MovieSummary {
  id: number;
  title: string;
  posterUrl?: string;
  releaseYear: number;
  averageRating: number;
  categories: string[];
}

export interface MovieDetail {
  id: number;
  title: string;
  description: string;
  posterUrl?: string;
  bannerUrl?: string;
  trailerUrl?: string;
  videoUrl: string;
  releaseYear: number;
  duration: number;
  averageRating: number;
  reviewCount: number;
  categories: string[];
}

export interface MovieDraft {
  title: string;
  description: string;
  posterUrl?: string;
  bannerUrl?: string;
  trailerUrl?: string;
  videoUrl: string;
  releaseYear: number;
  duration: number;
  isFeatured: boolean;
  categoryIds: number[];
}

export interface Category {
  id: number;
  name: string;
}
