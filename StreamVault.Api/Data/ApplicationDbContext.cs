using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StreamVault.Api.Models;

namespace StreamVault.Api.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Movie> Movies => Set<Movie>();
    public DbSet<Series> Series => Set<Series>();
    public DbSet<Episode> Episodes => Set<Episode>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<MovieCategory> MovieCategories => Set<MovieCategory>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<WatchlistItem> WatchlistItems => Set<WatchlistItem>();
    public DbSet<ContinueWatchingEntry> ContinueWatchingEntries => Set<ContinueWatchingEntry>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<MovieCategory>()
            .HasKey(mc => new { mc.MovieId, mc.CategoryId });

        builder.Entity<MovieCategory>()
            .HasOne(mc => mc.Movie)
            .WithMany(m => m.Categories)
            .HasForeignKey(mc => mc.MovieId);

        builder.Entity<MovieCategory>()
            .HasOne(mc => mc.Category)
            .WithMany(c => c.MovieCategories)
            .HasForeignKey(mc => mc.CategoryId);

        builder.Entity<Episode>()
            .HasOne(e => e.Series)
            .WithMany(s => s.Episodes)
            .HasForeignKey(e => e.SeriesId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Review>()
            .HasOne(r => r.Movie)
            .WithMany(m => m.Reviews)
            .HasForeignKey(r => r.MovieId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Review>()
            .HasOne(r => r.User)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<WatchlistItem>()
            .HasIndex(w => new { w.UserId, w.MovieId })
            .IsUnique();

        builder.Entity<ContinueWatchingEntry>()
            .HasIndex(c => new { c.UserId, c.MovieId })
            .IsUnique();

        // Seed a handful of categories so the app isn't empty on first run.
        builder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Action" },
            new Category { Id = 2, Name = "Comedy" },
            new Category { Id = 3, Name = "Drama" },
            new Category { Id = 4, Name = "Horror" },
            new Category { Id = 5, Name = "Sci-Fi" },
            new Category { Id = 6, Name = "Documentary" }
        );

        builder.Entity<Movie>().HasData(
            new Movie
            {
                Id = 1,
                Title = "The Last Frontier",
                Description = "A hardened survivalist must lead a band of strangers across a frozen wasteland to reach a hidden city before the first storm hits.",
                PosterUrl = "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
                BannerUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
                TrailerUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
                VideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
                ReleaseYear = 2024,
                Duration = 128,
                IsFeatured = true,
                AddedOn = new DateTime(2026, 1, 12, 0, 0, 0, DateTimeKind.Utc)
            },
            new Movie
            {
                Id = 2,
                Title = "Laugh Track",
                Description = "A struggling comedian gets one shot at a comeback when a viral podcast host invites him to a live comedy special in the middle of a citywide blackout.",
                PosterUrl = "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=800&q=80",
                BannerUrl = "https://images.unsplash.com/photo-1521714161819-1558d3d0d8f6?auto=format&fit=crop&w=1600&q=80",
                TrailerUrl = "https://www.w3schools.com/html/movie.mp4",
                VideoUrl = "https://www.w3schools.com/html/movie.mp4",
                ReleaseYear = 2023,
                Duration = 101,
                IsFeatured = true,
                AddedOn = new DateTime(2026, 2, 5, 0, 0, 0, DateTimeKind.Utc)
            },
            new Movie
            {
                Id = 3,
                Title = "Glass Harbor",
                Description = "After a devastating storm claims the town's power grid, a marine biologist and a local builder race to uncover the truth behind a hidden deep-sea signal.",
                PosterUrl = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
                BannerUrl = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80",
                TrailerUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
                VideoUrl = "https://www.w3schools.com/html/mov_bbb.mp4",
                ReleaseYear = 2021,
                Duration = 118,
                IsFeatured = false,
                AddedOn = new DateTime(2026, 3, 10, 0, 0, 0, DateTimeKind.Utc)
            },
            new Movie
            {
                Id = 4,
                Title = "Night Bloom",
                Description = "Two sisters uncover a conspiracy beneath a city museum while trying to protect the one place that still feels like home.",
                PosterUrl = "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80",
                BannerUrl = "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1600&q=80",
                TrailerUrl = "https://www.w3schools.com/html/movie.mp4",
                VideoUrl = "https://www.w3schools.com/html/movie.mp4",
                ReleaseYear = 2025,
                Duration = 109,
                IsFeatured = true,
                AddedOn = new DateTime(2026, 4, 8, 0, 0, 0, DateTimeKind.Utc)
            }
        );

        builder.Entity<MovieCategory>().HasData(
            new MovieCategory { MovieId = 1, CategoryId = 1 },
            new MovieCategory { MovieId = 1, CategoryId = 5 },
            new MovieCategory { MovieId = 2, CategoryId = 2 },
            new MovieCategory { MovieId = 2, CategoryId = 3 },
            new MovieCategory { MovieId = 3, CategoryId = 3 },
            new MovieCategory { MovieId = 3, CategoryId = 6 },
            new MovieCategory { MovieId = 4, CategoryId = 4 },
            new MovieCategory { MovieId = 4, CategoryId = 1 }
        );
    }
}
