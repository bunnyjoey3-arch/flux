using Microsoft.AspNetCore.Identity;

namespace StreamVault.Api.Models;

public class ApplicationUser : IdentityUser
{
    public string DisplayName { get; set; } = string.Empty;

    public DateTime JoinedOn { get; set; } = DateTime.UtcNow;

    public ICollection<WatchlistItem> WatchlistItems { get; set; } = new List<WatchlistItem>();

    public ICollection<Review> Reviews { get; set; } = new List<Review>();

    public ICollection<ContinueWatchingEntry> ContinueWatching { get; set; } = new List<ContinueWatchingEntry>();
}

// Role names used across the app. Kept as constants so controllers and
// seed logic never rely on magic strings.
public static class AppRoles
{
    public const string Admin = "Admin";
    public const string Member = "Member";
}
