using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamVault.Api.Data;
using StreamVault.Api.DTOs;
using StreamVault.Api.Models;

namespace StreamVault.Api.Controllers;

[ApiController]
[Route("api/movies/{movieId:int}/reviews")]
public class ReviewsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ReviewsController(ApplicationDbContext db)
    {
        _db = db;
    }

    private string CurrentUserId =>
        User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue("sub") ?? string.Empty;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReviewDto>>> GetForMovie(int movieId)
    {
        var reviews = await _db.Reviews
            .Include(r => r.User)
            .Where(r => r.MovieId == movieId)
            .OrderByDescending(r => r.PostedOn)
            .Select(r => new ReviewDto
            {
                Id = r.Id,
                MovieId = r.MovieId,
                UserId = r.UserId,
                DisplayName = r.User!.DisplayName,
                Stars = r.Stars,
                Comment = r.Comment,
                PostedOn = r.PostedOn
            })
            .ToListAsync();

        return Ok(reviews);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ReviewDto>> Post(int movieId, ReviewCreateDto dto)
    {
        var movieExists = await _db.Movies.AnyAsync(m => m.Id == movieId);
        if (!movieExists) return NotFound(new { message = "Movie not found." });

        var existing = await _db.Reviews
            .FirstOrDefaultAsync(r => r.MovieId == movieId && r.UserId == CurrentUserId);

        if (existing is not null)
        {
            existing.Stars = dto.Stars;
            existing.Comment = dto.Comment;
            existing.PostedOn = DateTime.UtcNow;
        }
        else
        {
            existing = new Review
            {
                MovieId = movieId,
                UserId = CurrentUserId,
                Stars = dto.Stars,
                Comment = dto.Comment
            };
            _db.Reviews.Add(existing);
        }

        await _db.SaveChangesAsync();

        var user = await _db.Users.FindAsync(CurrentUserId);

        return Ok(new ReviewDto
        {
            Id = existing.Id,
            MovieId = movieId,
            UserId = CurrentUserId,
            DisplayName = user?.DisplayName ?? "You",
            Stars = existing.Stars,
            Comment = existing.Comment,
            PostedOn = existing.PostedOn
        });
    }

    [Authorize]
    [HttpDelete("{reviewId:int}")]
    public async Task<IActionResult> Delete(int movieId, int reviewId)
    {
        var review = await _db.Reviews.FirstOrDefaultAsync(r => r.Id == reviewId && r.MovieId == movieId);
        if (review is null) return NotFound();

        var isOwner = review.UserId == CurrentUserId;
        var isAdmin = User.IsInRole(AppRoles.Admin);

        if (!isOwner && !isAdmin) return Forbid();

        _db.Reviews.Remove(review);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
