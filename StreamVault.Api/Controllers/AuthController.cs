using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StreamVault.Api.DTOs.Auth;
using StreamVault.Api.Models;
using StreamVault.Api.Services;

namespace StreamVault.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthController(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        var email = dto.Email.Trim();
        var displayName = dto.DisplayName.Trim();

        var existing = await _userManager.FindByEmailAsync(email);
        if (existing is not null)
        {
            return Conflict(new { message = "An account with that email already exists." });
        }

        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            DisplayName = displayName
        };

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        await _userManager.AddToRoleAsync(user, AppRoles.Member);

        return await BuildAuthResponse(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var email = dto.Email.Trim();
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        var passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!passwordValid)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        return await BuildAuthResponse(user);
    }

    [Authorize]
    [HttpGet("profile")]
    public async Task<ActionResult<AuthResponseDto>> GetProfile()
    {
        var userId = User.FindFirst("sub")?.Value ?? User.Identity?.Name;
        var user = await _userManager.FindByIdAsync(userId ?? string.Empty);

        if (user is null) return NotFound();

        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new AuthResponseDto
        {
            UserId = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email ?? string.Empty,
            Roles = roles
        });
    }

    private async Task<AuthResponseDto> BuildAuthResponse(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var (token, expiresOn) = _tokenService.CreateToken(user, roles);

        return new AuthResponseDto
        {
            UserId = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email ?? string.Empty,
            Token = token,
            ExpiresOn = expiresOn,
            Roles = roles
        };
    }
}
