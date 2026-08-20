import { Injectable } from '@angular/core';
import { FluxContent, ContentCategory } from '../models/content.model';

/**
 * All titles in this catalog are original, fictional placeholders created for
 * this demo — Flux is a sample application and does not stream real content.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly catalog: FluxContent[] = [
    {
      id: 1,
      title: 'Aftercurrent',
      category: 'Movie',
      genres: ['Sci-Fi', 'Thriller'],
      year: 2025,
      ageRating: '16+',
      matchScore: 97,
      duration: '2h 08m',
      synopsis:
        'When a power-grid engineer discovers a signal riding the current itself, she has 48 hours to prove humanity isn\u2019t alone before the signal proves it first.',
      gradient: ['#7b5cfa', '#17e9c0'],
      language: 'English',
      image: 'https://picsum.photos/seed/aftercurrent/400/600',
      featured: true,
      trending: true,
    },
    {
      id: 2,
      title: 'Glass Meridian',
      category: 'Series',
      genres: ['Drama', 'Mystery'],
      year: 2024,
      ageRating: '18+',
      matchScore: 94,
      duration: '48m episodes',
      seasons: 3,
      synopsis:
        'Three generations of a shipbuilding family guard a secret buried under their shipyard \u2014 and the tide is finally going out.',
      gradient: ['#ff3d7f', '#7b5cfa'],
      language: 'English',
      image: 'https://picsum.photos/seed/glassmeridian/400/600',
      trending: true,
    },
    {
      id: 3,
      title: 'Ronin of the Ninth Sky',
      category: 'Anime',
      genres: ['Action', 'Fantasy'],
      year: 2023,
      ageRating: '16+',
      matchScore: 98,
      duration: '24m episodes',
      seasons: 2,
      synopsis:
        'Exiled from a floating empire, a masterless swordsman collects fallen stars to forge the one blade that can bring his sky home.',
      gradient: ['#17e9c0', '#0ea5e9'],
      language: 'Japanese',
      image: 'https://picsum.photos/seed/ronin/400/600',
      trending: true,
      featured: true,
    },
    {
      id: 4,
      title: 'Paper Cranes',
      category: 'Anime',
      genres: ['Slice of Life', 'Romance'],
      year: 2022,
      ageRating: '13+',
      matchScore: 91,
      duration: '23m episodes',
      seasons: 1,
      synopsis:
        'A quiet origami club becomes the unlikely center of a school year neither of its two founders expected to remember forever.',
      gradient: ['#f59e0b', '#ff3d7f'],
      language: 'Japanese',
    },
    {
      id: 5,
      title: 'The Long Static',
      category: 'Movie',
      genres: ['Horror'],
      year: 2024,
      ageRating: '18+',
      matchScore: 88,
      duration: '1h 41m',
      synopsis:
        'A late-night radio host starts receiving calls from listeners who haven\u2019t been born yet \u2014 warning her about tonight.',
      gradient: ['#0ea5e9', '#7b5cfa'],
      language: 'English',
      image: 'https://picsum.photos/seed/longstatic/400/600',
      newRelease: true,
    },
    {
      id: 6,
      title: 'Kindling',
      category: 'Movie',
      genres: ['Drama', 'Romance'],
      year: 2021,
      ageRating: '13+',
      matchScore: 90,
      duration: '1h 56m',
      synopsis:
        'Two wildfire lookout rangers spend one isolated season learning that the hardest thing to contain is how they feel.',
      gradient: ['#ff3d7f', '#f59e0b'],
      language: 'English',
      image: 'https://picsum.photos/seed/kindling/400/600',
    },
    {
      id: 7,
      title: 'Circuit City',
      category: 'Series',
      genres: ['Crime', 'Thriller'],
      year: 2025,
      ageRating: '18+',
      matchScore: 95,
      duration: '52m episodes',
      seasons: 1,
      synopsis:
        'A rookie detective and a rogue AI trace a string of impossible heists through a city that never stops rewriting its own map.',
      gradient: ['#7b5cfa', '#0ea5e9'],
      language: 'English',
      image: 'https://picsum.photos/seed/circuitcity/400/600',
      newRelease: true,
      trending: true,
    },
    {
      id: 8,
      title: 'Nine Tails Academy',
      category: 'Anime',
      genres: ['Comedy', 'Fantasy'],
      year: 2020,
      ageRating: '13+',
      matchScore: 93,
      duration: '24m episodes',
      seasons: 4,
      synopsis:
        'The only fox spirit ever accepted into a prestigious human high school just wants to graduate without anyone finding out.',
      gradient: ['#f59e0b', '#17e9c0'],
      language: 'Japanese',
    },
    {
      id: 9,
      title: 'Undertow',
      category: 'Documentary',
      genres: ['Nature'],
      year: 2023,
      ageRating: 'All',
      matchScore: 89,
      duration: '1h 22m',
      synopsis:
        'Following four ocean currents across a single year, from Arctic melt to equatorial storm, in unbroken underwater cinematography.',
      gradient: ['#0ea5e9', '#17e9c0'],
      language: 'English',
    },
    {
      id: 10,
      title: 'Static & Stone',
      category: 'Documentary',
      genres: ['Music', 'Biography'],
      year: 2022,
      ageRating: '13+',
      matchScore: 86,
      duration: '1h 38m',
      synopsis:
        'The rise, breakup and unlikely reunion of the garage band that soundtracked a decade nobody expected them to survive.',
      gradient: ['#7b5cfa', '#ff3d7f'],
      language: 'English',
    },
    {
      id: 11,
      title: 'Voltage',
      category: 'Movie',
      genres: ['Action'],
      year: 2026,
      ageRating: '16+',
      matchScore: 92,
      duration: '2h 02m',
      synopsis:
        'A decommissioned power-suit test pilot is pulled back in when the grid she once protected is turned into a weapon.',
      gradient: ['#ff3d7f', '#7b5cfa'],
      language: 'English',
      image: 'https://picsum.photos/seed/voltage/400/600',
      newRelease: true,
    },
    {
      id: 12,
      title: 'Low Orbit',
      category: 'Series',
      genres: ['Sci-Fi', 'Drama'],
      year: 2023,
      ageRating: '16+',
      matchScore: 96,
      duration: '45m episodes',
      seasons: 2,
      synopsis:
        'The first commercial space station is also the first place a murder has ever happened with nowhere at all to run.',
      gradient: ['#0ea5e9', '#7b5cfa'],
      language: 'English',
      image: 'https://picsum.photos/seed/loworbit/400/600',
      trending: true,
    },
    {
      id: 13,
      title: 'Iron Bloom',
      category: 'Anime',
      genres: ['Action', 'Drama'],
      year: 2021,
      ageRating: '16+',
      matchScore: 97,
      duration: '24m episodes',
      seasons: 3,
      synopsis:
        'In a kingdom where flowers grow from battle scars, a disgraced war medic builds an army out of the ones the war forgot.',
      gradient: ['#17e9c0', '#7b5cfa'],
      language: 'Japanese',
      trending: true,
    },
    {
      id: 14,
      title: 'Confection',
      category: 'Series',
      genres: ['Comedy'],
      year: 2024,
      ageRating: '13+',
      matchScore: 87,
      duration: '30m episodes',
      seasons: 2,
      synopsis:
        'Four strangers inherit a failing bakery, one impossible recipe book, and absolutely no idea how to run a business together.',
      gradient: ['#f59e0b', '#ff3d7f'],
      language: 'English',
      newRelease: true,
    },
    {
      id: 15,
      title: 'Halfmoon Bay',
      category: 'Movie',
      genres: ['Mystery', 'Drama'],
      year: 2020,
      ageRating: '16+',
      matchScore: 85,
      duration: '1h 49m',
      synopsis:
        'A tide-locked coastal town loses power for one night a year \u2014 and every year, somebody new goes missing.',
      gradient: ['#7b5cfa', '#17e9c0'],
      language: 'English',
      image: 'https://picsum.photos/seed/halfmoonbay/400/600',
    },
    {
      id: 16,
      title: 'Second Wind',
      category: 'Anime',
      genres: ['Sports'],
      year: 2019,
      ageRating: 'All',
      matchScore: 90,
      duration: '23m episodes',
      seasons: 2,
      synopsis:
        'Cut from her club for being too small, a sprinter builds an underdog relay team out of everyone else who got cut too.',
      gradient: ['#17e9c0', '#f59e0b'],
      language: 'Japanese',
    },
    {
      id: 17,
      title: 'The Quiet Frequency',
      category: 'Documentary',
      genres: ['Science'],
      year: 2025,
      ageRating: 'All',
      matchScore: 84,
      duration: '1h 15m',
      synopsis:
        'Inside the global network of listening stations built for one purpose: to hear something arrive from very far away.',
      gradient: ['#0ea5e9', '#7b5cfa'],
      language: 'English',
      newRelease: true,
    },
    {
      id: 18,
      title: 'Wraithline',
      category: 'Series',
      genres: ['Horror', 'Mystery'],
      year: 2022,
      ageRating: '18+',
      matchScore: 93,
      duration: '50m episodes',
      seasons: 1,
      synopsis:
        'A decommissioned subway line reopens for one express run a night, and its conductor is collecting a very specific fare.',
      gradient: ['#ff3d7f', '#0ea5e9'],
      language: 'English',
    },
    {
      id: 19,
      title: 'Salt & Circuit',
      category: 'Movie',
      genres: ['Sci-Fi', 'Adventure'],
      year: 2024,
      ageRating: '13+',
      matchScore: 91,
      duration: '1h 58m',
      synopsis:
        'A desert-scavenging engineer and a shipwrecked navigation drone cross a dead ocean floor to find the last working port.',
      gradient: ['#f59e0b', '#17e9c0'],
      language: 'English',
      image: 'https://picsum.photos/seed/saltandcircuit/400/600',
    },
    {
      id: 20,
      title: 'Crimson Loom',
      category: 'Anime',
      genres: ['Fantasy', 'Drama'],
      year: 2025,
      ageRating: '16+',
      matchScore: 99,
      duration: '24m episodes',
      seasons: 1,
      synopsis:
        'Every thread a weaver cuts ends a fate somewhere in the world. The newest apprentice just cut the wrong one on purpose.',
      gradient: ['#ff3d7f', '#7b5cfa'],
      language: 'Japanese',
      featured: true,
      newRelease: true,
      trending: true,
    },
    {
      id: 21,
      title: 'Borrowed Light',
      category: 'Movie',
      genres: ['Drama'],
      year: 2018,
      ageRating: '13+',
      matchScore: 82,
      duration: '2h 04m',
      synopsis:
        'A lighthouse keeper\u2019s estranged daughter returns for one final winter to keep a promise she never agreed to make.',
      gradient: ['#7b5cfa', '#f59e0b'],
      language: 'English',
    },
    {
      id: 22,
      title: 'Nightshift Prefecture',
      category: 'Anime',
      genres: ['Comedy', 'Slice of Life'],
      year: 2023,
      ageRating: '13+',
      matchScore: 88,
      duration: '24m episodes',
      seasons: 1,
      synopsis:
        'The graveyard-shift convenience store where every regular customer turns out to be a minor deity in disguise.',
      gradient: ['#17e9c0', '#ff3d7f'],
      language: 'Japanese',
    },
    {
      id: 23,
      title: 'Fault Lines',
      category: 'Series',
      genres: ['Drama', 'Thriller'],
      year: 2021,
      ageRating: '16+',
      matchScore: 92,
      duration: '55m episodes',
      seasons: 2,
      synopsis:
        'A seismologist who predicted the Big One three years too early gets one more chance when the ground starts moving again.',
      gradient: ['#0ea5e9', '#f59e0b'],
      language: 'English',
    },
    {
      id: 24,
      title: 'Amplitude',
      category: 'Documentary',
      genres: ['Sports'],
      year: 2024,
      ageRating: 'All',
      matchScore: 87,
      duration: '1h 30m',
      synopsis:
        'Inside one Olympic cycle with the free-diving world record holder training her body to need almost nothing at all.',
      gradient: ['#7b5cfa', '#17e9c0'],
      language: 'English',
      newRelease: true,
    },
    {
      id: 25,
      title: 'The Cartographer\u2019s Ghost',
      category: 'Movie',
      genres: ['Fantasy', 'Adventure'],
      year: 2022,
      ageRating: '13+',
      matchScore: 90,
      duration: '2h 11m',
      synopsis:
        'A map that redraws itself every full moon leads a disgraced explorer toward a continent that isn\u2019t supposed to exist.',
      gradient: ['#ff3d7f', '#17e9c0'],
      language: 'English',
      image: 'https://picsum.photos/seed/cartographersghost/400/600',
    },
    {
      id: 26,
      title: 'Static Bloom',
      category: 'Anime',
      genres: ['Sci-Fi', 'Romance'],
      year: 2024,
      ageRating: '13+',
      matchScore: 95,
      duration: '24m episodes',
      seasons: 1,
      synopsis:
        'In a city where memories can be traded like currency, two strangers keep buying back the same forgotten afternoon.',
      gradient: ['#7b5cfa', '#ff3d7f'],
      language: 'Japanese',
      newRelease: true,
    },
    {
      id: 27,
      title: 'Harborlight',
      category: 'Series',
      genres: ['Drama', 'Family'],
      year: 2020,
      ageRating: 'All',
      matchScore: 89,
      duration: '42m episodes',
      seasons: 4,
      synopsis:
        'Four siblings inherit their grandmother\u2019s failing fishing fleet and one very stubborn houseboat named after all of them.',
      gradient: ['#f59e0b', '#0ea5e9'],
      language: 'English',
    },
    {
      id: 28,
      title: 'Deadband',
      category: 'Movie',
      genres: ['Thriller', 'Sci-Fi'],
      year: 2023,
      ageRating: '16+',
      matchScore: 86,
      duration: '1h 47m',
      synopsis:
        'A signal jammer for hire takes one job too many when the frequency she\u2019s paid to silence turns out to be a person.',
      gradient: ['#0ea5e9', '#ff3d7f'],
      language: 'English',
    },
    {
      id: 29,
      title: 'Vellichor',
      category: 'Anime',
      genres: ['Fantasy', 'Mystery'],
      year: 2018,
      ageRating: '13+',
      matchScore: 94,
      duration: '24m episodes',
      seasons: 2,
      synopsis:
        'A secondhand bookshop that only appears at dusk sells one true memory a night \u2014 for a price nobody remembers paying.',
      gradient: ['#7b5cfa', '#0ea5e9'],
      language: 'Japanese',
    },
    {
      id: 30,
      title: 'Groundwater',
      category: 'Documentary',
      genres: ['Science', 'Nature'],
      year: 2021,
      ageRating: 'All',
      matchScore: 83,
      duration: '1h 12m',
      synopsis:
        'Tracing a single aquifer under three countries and the farmers, engineers and smugglers who all depend on it.',
      gradient: ['#17e9c0', '#0ea5e9'],
      language: 'English',
    },
    {
      id: 31,
      title: 'Redshift Diner',
      category: 'Movie',
      genres: ['Comedy', 'Sci-Fi'],
      year: 2025,
      ageRating: '13+',
      matchScore: 88,
      duration: '1h 39m',
      synopsis:
        'The only 24-hour diner at the edge of the solar system is having the worst \u2014 and best \u2014 night shift of its existence.',
      gradient: ['#f59e0b', '#7b5cfa'],
      language: 'English',
      image: 'https://picsum.photos/seed/redshiftdiner/400/600',
      newRelease: true,
    },
    {
      id: 32,
      title: 'Hollow Choir',
      category: 'Series',
      genres: ['Horror', 'Drama'],
      year: 2025,
      ageRating: '18+',
      matchScore: 91,
      duration: '48m episodes',
      seasons: 1,
      synopsis:
        'A boarding school choir\u2019s missing seventh voice keeps showing up on the recordings, singing perfectly in tune.',
      gradient: ['#ff3d7f', '#7b5cfa'],
      language: 'English',
      newRelease: true,
    },
    {
      id: 33,
      title: 'Ferroglass',
      category: 'Anime',
      genres: ['Action', 'Sci-Fi'],
      year: 2022,
      ageRating: '16+',
      matchScore: 96,
      duration: '24m episodes',
      seasons: 2,
      synopsis:
        'Built from the wreckage of a war she doesn\u2019t remember, a glass-boned pilot fights to keep the peace that replaced it.',
      gradient: ['#0ea5e9', '#17e9c0'],
      language: 'Japanese',
      trending: true,
    },
    {
      id: 34,
      title: 'Terracotta Season',
      category: 'Movie',
      genres: ['Drama', 'Family'],
      year: 2019,
      ageRating: 'All',
      matchScore: 85,
      duration: '1h 52m',
      synopsis:
        'A potter teaches her estranged grandson the family trade over one long, difficult, unexpectedly funny summer.',
      gradient: ['#f59e0b', '#ff3d7f'],
      language: 'English',
    },
    {
      id: 35,
      title: 'The Interval',
      category: 'Series',
      genres: ['Sci-Fi', 'Mystery'],
      year: 2026,
      ageRating: '16+',
      matchScore: 97,
      duration: '46m episodes',
      seasons: 1,
      synopsis:
        'Every seven minutes, time skips a beat and one person in the city remembers what happened in the gap.',
      gradient: ['#7b5cfa', '#ff3d7f'],
      language: 'English',
      newRelease: true,
      trending: true,
    },
    {
      id: 36,
      title: 'Marrow & Moss',
      category: 'Anime',
      genres: ['Fantasy', 'Horror'],
      year: 2020,
      ageRating: '16+',
      matchScore: 92,
      duration: '24m episodes',
      seasons: 1,
      synopsis:
        'A forest that grows over anything left too still swallows a hunting party whole \u2014 except for the one it decides to keep.',
      gradient: ['#17e9c0', '#7b5cfa'],
      language: 'Japanese',
    },
    {
      id: 37,
      title: 'Pit Lane',
      category: 'Documentary',
      genres: ['Sports', 'Biography'],
      year: 2020,
      ageRating: '13+',
      matchScore: 88,
      duration: '1h 45m',
      synopsis:
        'A season inside the smallest team on the grid, held together by two mechanics, a rookie driver and pure stubbornness.',
      gradient: ['#0ea5e9', '#f59e0b'],
      language: 'English',
    },
    {
      id: 38,
      title: 'Afterglow Arcade',
      category: 'Series',
      genres: ['Comedy', 'Slice of Life'],
      year: 2023,
      ageRating: '13+',
      matchScore: 86,
      duration: '28m episodes',
      seasons: 2,
      synopsis:
        'The last arcade in town survives on nostalgia, questionable pizza, and a night-shift crew that\u2019s closer than family.',
      gradient: ['#ff3d7f', '#f59e0b'],
      language: 'English',
    },
    {
      id: 39,
      title: 'Obsidian Tide',
      category: 'Movie',
      genres: ['Action', 'Thriller'],
      year: 2026,
      ageRating: '16+',
      matchScore: 93,
      duration: '2h 05m',
      synopsis:
        'A retired smuggler is pulled back for one last run when the cargo turns out to be the daughter she never got to raise.',
      gradient: ['#7b5cfa', '#0ea5e9'],
      language: 'English',
      image: 'https://picsum.photos/seed/obsidiantide/400/600',
      newRelease: true,
    },
    {
      id: 40,
      title: 'Lanternfish',
      category: 'Anime',
      genres: ['Adventure', 'Fantasy'],
      year: 2019,
      ageRating: 'All',
      matchScore: 90,
      duration: '24m episodes',
      seasons: 3,
      synopsis:
        'A village of deep-sea lantern keepers sends its youngest into the trench to find out why the light is finally needed again.',
      gradient: ['#17e9c0', '#f59e0b'],
      language: 'Japanese',
    },
  ];

  getAll(): FluxContent[] {
    return this.catalog;
  }

  getById(id: number): FluxContent | undefined {
    return this.catalog.find((item) => item.id === id);
  }

  getFeatured(): FluxContent {
    const featured = this.catalog.filter((item) => item.featured);
    return featured[Math.floor(Math.random() * featured.length)] ?? this.catalog[0];
  }

  getTrending(): FluxContent[] {
    return this.catalog.filter((item) => item.trending);
  }

  getNewReleases(): FluxContent[] {
    return this.catalog.filter((item) => item.newRelease);
  }

  getByCategory(category: ContentCategory): FluxContent[] {
    return this.catalog.filter((item) => item.category === category);
  }

  getByGenre(genre: string): FluxContent[] {
    return this.catalog.filter((item) => item.genres.includes(genre));
  }

  search(term: string): FluxContent[] {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return this.catalog.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.genres.some((g) => g.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }

  getSimilar(item: FluxContent, limit = 10): FluxContent[] {
    return this.catalog
      .filter(
        (c) =>
          c.id !== item.id &&
          (c.category === item.category || c.genres.some((g) => item.genres.includes(g)))
      )
      .slice(0, limit);
  }
}
