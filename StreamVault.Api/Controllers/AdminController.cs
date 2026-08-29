using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamVault.Api.Data;
using StreamVault.Api.DTOs;
using StreamVault.Api.Models;

namespace StreamVault.Api.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = AppRoles.Admin)]
public class AdminController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;

    public AdminController(ApplicationDbContext db, UserManager<ApplicationUser> userManager)
    {
        _db = db;
        _userManager = userManager;
    }

    // ---- Movie management ----

    [HttpPost("movies")]
    public async Task<ActionResult<MovieDetailDto>> CreateMovie(MovieCreateDto dto)
    {
        var movie = new Movie
        {
            Title = dto.Title.Trim(),
            Description = dto.Description,
            PosterUrl = dto.PosterUrl,
            BannerUrl = dto.BannerUrl,
            TrailerUrl = dto.TrailerUrl,
            VideoUrl = dto.VideoUrl,
            ReleaseYear = dto.ReleaseYear,
            Duration = dto.Duration,
            IsFeatured = dto.IsFeatured
        };

        _db.Movies.Add(movie);
        await _db.SaveChangesAsync();

        foreach (var categoryId in dto.CategoryIds.Distinct())
        {
            _db.MovieCategories.Add(new MovieCategory { MovieId = movie.Id, CategoryId = categoryId });
        }
        await _db.SaveChangesAsync();

        return CreatedAtAction(
            nameof(MoviesController.GetById),
            "Movies",
            new { id = movie.Id },
            movie);
    }

    [HttpPut("movies/{id:int}")]
    public async Task<IActionResult> UpdateMovie(int id, MovieUpdateDto dto)
    {
        var movie = await _db.Movies
            .Include(m => m.Categories)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (movie is null) return NotFound();

        movie.Title = dto.Title.Trim();
        movie.Description = dto.Description;
        movie.PosterUrl = dto.PosterUrl;
        movie.BannerUrl = dto.BannerUrl;
        movie.TrailerUrl = dto.TrailerUrl;
        movie.VideoUrl = dto.VideoUrl;
        movie.ReleaseYear = dto.ReleaseYear;
        movie.Duration = dto.Duration;
        movie.IsFeatured = dto.IsFeatured;

        _db.MovieCategories.RemoveRange(movie.Categories);
        foreach (var categoryId in dto.CategoryIds.Distinct())
        {
            _db.MovieCategories.Add(new MovieCategory { MovieId = movie.Id, CategoryId = categoryId });
        }

        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("movies/{id:int}")]
    public async Task<IActionResult> DeleteMovie(int id)
    {
        var movie = await _db.Movies.FindAsync(id);
        if (movie is null) return NotFound();

        _db.Movies.Remove(movie);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    // ---- Series & episode management ----

    [HttpPost("series")]
    public async Task<ActionResult<Series>> CreateSeries(MovieCreateDto dto)
    {
        var series = new Series
        {
            Title = dto.Title.Trim(),
            Description = dto.Description,
            PosterUrl = dto.PosterUrl,
            BannerUrl = dto.BannerUrl,
            TrailerUrl = dto.TrailerUrl,
            ReleaseYear = dto.ReleaseYear,
            IsFeatured = dto.IsFeatured
        };

        _db.Series.Add(series);
        await _db.SaveChangesAsync();

        return Ok(series);
    }

    // ---- User management ----

    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<object>>> GetUsers()
    {
        var users = await _db.Users.ToListAsync();
        var result = new List<object>();

        foreach (var user in users)
        {
            var roles = await _userManager.GetRolesAsync(user);
            result.Add(new
            {
                user.Id,
                user.Email,
                user.DisplayName,
                user.JoinedOn,
                Roles = roles
            });
        }

        return Ok(result);
    }

    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user is null) return NotFound();

        await _userManager.DeleteAsync(user);
        return NoContent();
    }

    [HttpPost("users/{id}/promote")]
    public async Task<IActionResult> PromoteToAdmin(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user is null) return NotFound();

        if (!await _userManager.IsInRoleAsync(user, AppRoles.Admin))
        {
            await _userManager.AddToRoleAsync(user, AppRoles.Admin);
        }

        return NoContent();
    }

    // ---- Review moderation ----

    [HttpDelete("reviews/{reviewId:int}")]
    public async Task<IActionResult> DeleteReview(int reviewId)
    {
        var review = await _db.Reviews.FindAsync(reviewId);
        if (review is null) return NotFound();

        _db.Reviews.Remove(review);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
