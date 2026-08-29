using System.ComponentModel.DataAnnotations;

namespace StreamVault.Api.DTOs;

public class MovieSummaryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? PosterUrl { get; set; }
    public int ReleaseYear { get; set; }
    public double AverageRating { get; set; }
    public List<string> Categories { get; set; } = new();
}

public class MovieDetailDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? PosterUrl { get; set; }
    public string? BannerUrl { get; set; }
    public string? TrailerUrl { get; set; }
    public string VideoUrl { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public int Duration { get; set; }
    public double AverageRating { get; set; }
    public int ReviewCount { get; set; }
    public List<string> Categories { get; set; } = new();
}

public class MovieCreateDto
{
    [Required, StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Description { get; set; } = string.Empty;

    public string? PosterUrl { get; set; }
    public string? BannerUrl { get; set; }
    public string? TrailerUrl { get; set; }

    [Required]
    public string VideoUrl { get; set; } = string.Empty;

    [Range(1900, 2100)]
    public int ReleaseYear { get; set; }

    [Range(1, 600)]
    public int Duration { get; set; }

    public bool IsFeatured { get; set; }

    public List<int> CategoryIds { get; set; } = new();
}

public class MovieUpdateDto : MovieCreateDto
{
}

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class CategoryCreateDto
{
    [Required, StringLength(50)]
    public string Name { get; set; } = string.Empty;
}
