using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamVault.Api.Data;
using StreamVault.Api.DTOs;
using StreamVault.Api.Models;

namespace StreamVault.Api.Controllers;

[ApiController]
[Route("api/watchlist")]
[Authorize]
public class WatchlistController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public WatchlistController(ApplicationDbContext db)
    {
        _db = db;
    }

    private string CurrentUserId =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub") ?? string.Empty;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WatchlistItemDto>>> GetMyWatchlist()
    {
        var items = await _db.WatchlistItems
            .Include(w => w.Movie)
            .Where(w => w.UserId == CurrentUserId)
            .OrderByDescending(w => w.AddedOn)
            .Select(w => new WatchlistItemDto
            {
                Id = w.Id,
                MovieId = w.MovieId,
                Title = w.Movie!.Title,
                PosterUrl = w.Movie.PosterUrl,
                AddedOn = w.AddedOn
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{movieId:int}")]
    public async Task<IActionResult> Add(int movieId)
    {
        var movieExists = await _db.Movies.AnyAsync(m => m.Id == movieId);
        if (!movieExists) return NotFound(new { message = "Movie not found." });

        var alreadyAdded = await _db.WatchlistItems
            .AnyAsync(w => w.UserId == CurrentUserId && w.MovieId == movieId);

        if (alreadyAdded) return Ok(new { message = "Already in your watchlist." });

        _db.WatchlistItems.Add(new WatchlistItem { UserId = CurrentUserId, MovieId = movieId });
        await _db.SaveChangesAsync();

        return Ok(new { message = "Added to watchlist." });
    }

    [HttpDelete("{movieId:int}")]
    public async Task<IActionResult> Remove(int movieId)
    {
        var item = await _db.WatchlistItems
            .FirstOrDefaultAsync(w => w.UserId == CurrentUserId && w.MovieId == movieId);

        if (item is null) return NotFound();

        _db.WatchlistItems.Remove(item);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
