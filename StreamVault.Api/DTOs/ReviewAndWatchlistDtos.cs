using System.ComponentModel.DataAnnotations;

namespace StreamVault.Api.DTOs;

public class ReviewDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public int Stars { get; set; }
    public string? Comment { get; set; }
    public DateTime PostedOn { get; set; }
}

public class ReviewCreateDto
{
    [Range(1, 5)]
    public int Stars { get; set; }

    [StringLength(1000)]
    public string? Comment { get; set; }
}

public class WatchlistItemDto
{
    public int Id { get; set; }
    public int MovieId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? PosterUrl { get; set; }
    public DateTime AddedOn { get; set; }
}
