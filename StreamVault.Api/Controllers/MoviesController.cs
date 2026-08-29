using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StreamVault.Api.Data;
using StreamVault.Api.DTOs;

namespace StreamVault.Api.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public MoviesController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET api/movies?search=&categoryId=&year=&sort=trending|latest|popular
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MovieSummaryDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] int? categoryId,
        [FromQuery] int? year,
        [FromQuery] string? sort)
    {
        var query = _db.Movies
            .Include(m => m.Categories).ThenInclude(mc => mc.Category)
            .Include(m => m.Reviews)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(m => m.Title.ToLower().Contains(term));
        }

        if (categoryId.HasValue)
        {
            query = query.Where(m => m.Categories.Any(c => c.CategoryId == categoryId.Value));
        }

        if (year.HasValue)
        {
            query = query.Where(m => m.ReleaseYear == year.Value);
        }

        query = sort switch
        {
            "latest" => query.OrderByDescending(m => m.AddedOn),
            "popular" => query.OrderByDescending(m => m.Reviews.Count),
            "trending" => query.OrderByDescending(m => m.IsFeatured).ThenByDescending(m => m.AddedOn),
            _ => query.OrderByDescending(m => m.AddedOn)
        };

        var movies = await query.ToListAsync();

        return Ok(movies.Select(ToSummary));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MovieDetailDto>> GetById(int id)
    {
        var movie = await _db.Movies
            .Include(m => m.Categories).ThenInclude(mc => mc.Category)
            .Include(m => m.Reviews)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (movie is null) return NotFound();

        return Ok(new MovieDetailDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            PosterUrl = movie.PosterUrl,
            BannerUrl = movie.BannerUrl,
            TrailerUrl = movie.TrailerUrl,
            VideoUrl = movie.VideoUrl,
            ReleaseYear = movie.ReleaseYear,
            Duration = movie.Duration,
            AverageRating = movie.Reviews.Count > 0 ? Math.Round(movie.Reviews.Average(r => r.Stars), 1) : 0,
            ReviewCount = movie.Reviews.Count,
            Categories = movie.Categories.Select(c => c.Category!.Name).ToList()
        });
    }

    private static MovieSummaryDto ToSummary(Models.Movie movie) => new()
    {
        Id = movie.Id,
        Title = movie.Title,
        PosterUrl = movie.PosterUrl,
        ReleaseYear = movie.ReleaseYear,
        AverageRating = movie.Reviews.Count > 0 ? Math.Round(movie.Reviews.Average(r => r.Stars), 1) : 0,
        Categories = movie.Categories.Select(c => c.Category!.Name).ToList()
    };
}
