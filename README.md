# StreamVault

A streaming-platform demo app — movies, search, watchlist, star ratings and
reviews, and an admin panel — built with ASP.NET Core Identity/JWT on the
backend and Angular standalone components on the frontend.

This is a learning/portfolio project, not a production streaming service:
there's no real video transcoding or DRM, "videos" are just URLs the
`<video>` tag plays directly (point them at your own MP4s or a public test
stream while trying it out).

## Project layout

```
StreamVault/
├── StreamVault.Api/         ASP.NET Core Web API (Identity, JWT, EF Core)
└── streamvault-client/      Angular frontend
```

## Running the API

Requirements: .NET 8 SDK, SQL Server (LocalDB, Express, or full).

```bash
cd StreamVault.Api
dotnet restore

# 1. Update the connection string in appsettings.json if you're not
#    using the default local SQL Server instance.
# 2. Replace the "Jwt:Key" value in appsettings.json with your own
#    long random secret before running this anywhere but your own machine.

dotnet ef migrations add InitialCreate
dotnet ef database update

dotnet run
```

The API prints the URL it's listening on (default `http://localhost:5090`).
Open `/swagger` there to try endpoints directly — click "Authorize" and
paste a JWT (from `/api/auth/login`) to call protected routes.

On first run, the app seeds two roles (`Admin`, `Member`) and one default
admin account:

- **Email:** `admin@streamvault.local`
- **Password:** `ChangeMe123!`

Log in with that account, then either use it directly or promote your own
account to Admin from the admin panel. Change or remove the seeded password
before deploying this anywhere public.

### Main endpoints

| Area       | Route                                    |
|------------|-------------------------------------------|
| Auth       | `POST /api/auth/register`, `/login`, `GET /api/auth/profile` |
| Movies     | `GET /api/movies` (search/filter/sort), `GET /api/movies/{id}` |
| Categories | `GET /api/categories`, admin-only `POST`/`DELETE` |
| Watchlist  | `GET/POST/DELETE /api/watchlist` (auth required) |
| Reviews    | `GET/POST /api/movies/{movieId}/reviews`, `DELETE .../{reviewId}` |
| Admin      | `POST/PUT/DELETE /api/admin/movies`, `/api/admin/users`, `/api/admin/reviews` |

## Running the frontend

Requirements: Node.js 18+, Angular CLI (`npm install -g @angular/cli`).

```bash
cd streamvault-client
npm install
ng serve
```

Open `http://localhost:4200`. If your API runs on a different port, update
`apiUrl` in `src/environments/environment.ts`.

## What's implemented

- **Auth** — register, login, JWT stored client-side, route guards for
  logged-in and admin-only pages.
- **Movies & search** — home page with trending/popular/latest rows, a
  searchable/filterable movie list, and a detail page.
- **Watchlist** — add/remove from any movie page, dedicated watchlist page.
- **Reviews & ratings** — 1–5 star reviews with comments; users can edit
  their own review by resubmitting; owners and admins can delete.
- **Admin panel** — movie CRUD (with genre tagging), category management,
  user list with promote-to-admin and delete.
- **Video player** — a native HTML5 `<video>` player with the browser's
  built-in controls (play/pause/seek/volume/fullscreen/subtitles-if-provided).

## What's intentionally left out

A few things from a full production streaming platform are out of scope for
a learning project like this, noted here rather than silently skipped:

- **Series/episodes UI** — the API supports creating series, but there's no
  Angular screen for browsing seasons/episodes yet.
- **Continue watching** — the `ContinueWatchingEntry` table exists, but
  nothing writes playback position from the player yet.
- **Refresh tokens** — the JWT simply expires after 2 hours; there's no
  silent refresh flow.
- **Real video delivery** — no transcoding, adaptive bitrate, or CDN; the
  player just points at whatever URL you give it.

## Making this genuinely your own

- Swap the palette (currently near-black with a red accent) for your own.
- Build out the series/episodes screens using the existing API endpoints.
- Add a "continue watching" row on the home page using the existing table.
- Add integration tests for the controllers (xUnit + `WebApplicationFactory`).
- Deploy the API to Azure App Service/Render and the Angular build to
  Netlify/Vercel, so you have a live link to share instead of a local demo.
