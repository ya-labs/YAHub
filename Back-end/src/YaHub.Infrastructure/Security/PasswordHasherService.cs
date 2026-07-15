using Microsoft.AspNetCore.Identity;
using YaHub.Application.Interfaces.Security;

namespace YaHub.Infrastructure.Security;

public sealed class PasswordHasherService : IPasswordHasherService
{
    private readonly PasswordHasher<string> _passwordHasher = new();

    public string Hash(string password)
    {
        return _passwordHasher.HashPassword("YaHub", password);
    }

    public bool Verify(string password, string passwordHash)
    {
        var result = _passwordHasher.VerifyHashedPassword(
            "YaHub",
            passwordHash,
            password);

        return result == PasswordVerificationResult.Success ||
               result == PasswordVerificationResult.SuccessRehashNeeded;
    }
}