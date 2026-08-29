namespace StreamVault.Api.Models;

public abstract class TitleBase
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string? PosterUrl { get; set; }

    public string? BannerUrl { get; set; }

    public string? TrailerUrl { get; set; }

    public int ReleaseYear { get; set; }

    public bool IsFeatured { get; set; }

    public DateTime AddedOn { get; set; } = DateTime.UtcNow;

    public ICollection<MovieCategory> Categories { get; set; } = new List<MovieCategory>();

    public ICollection<Review> Reviews { get; set; } = new List<Review>();
}

public class Movie : TitleBase
{
    public string VideoUrl { get; set; } = string.Empty;

    // Duration in minutes.
    public int Duration { get; set; }
}

public class Series : TitleBase
{
    public ICollection<Episode> Episodes { get; set; } = new List<Episode>();
}

public class Episode
{
    public int Id { get; set; }

    public int SeriesId { get; set; }

    public Series? Series { get; set; }

    public int SeasonNumber { get; set; }

    public int EpisodeNumber { get; set; }

    public string Title { get; set; } = string.Empty;

    public string VideoUrl { get; set; } = string.Empty;

    // Duration in minutes.
    public int Duration { get; set; }
}

public class Category
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public ICollection<MovieCategory> MovieCategories { get; set; } = new List<MovieCategory>();
}

// Join entity for the Movie <-> Category many-to-many relationship.
public class MovieCategory
{
    public int MovieId { get; set; }

    public Movie? Movie { get; set; }

    public int CategoryId { get; set; }

    public Category? Category { get; set; }
}

public class Review
{
    public int Id { get; set; }

    public int MovieId { get; set; }

    public Movie? Movie { get; set; }

    public string UserId { get; set; } = string.Empty;

    public ApplicationUser? User { get; set; }

    public int Stars { get; set; }

    public string? Comment { get; set; }

    public DateTime PostedOn { get; set; } = DateTime.UtcNow;
}

public class WatchlistItem
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public ApplicationUser? User { get; set; }

    public int MovieId { get; set; }

    public Movie? Movie { get; set; }

    public DateTime AddedOn { get; set; } = DateTime.UtcNow;
}

public class ContinueWatchingEntry
{
    public int Id { get; set; }

    public string UserId { get; set; } = string.Empty;

    public ApplicationUser? User { get; set; }

    public int MovieId { get; set; }

    public Movie? Movie { get; set; }

    // How far into the video the user got, in seconds.
    public int PositionSeconds { get; set; }

    public DateTime LastWatchedOn { get; set; } = DateTime.UtcNow;
}
