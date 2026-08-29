using StreamVault.Api.Models;

namespace StreamVault.Api.Services;

public interface ITokenService
{
    (string Token, DateTime ExpiresOn) CreateToken(ApplicationUser user, IList<string> roles);
}
