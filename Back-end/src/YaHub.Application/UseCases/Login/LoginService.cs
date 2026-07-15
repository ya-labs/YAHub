using Microsoft.Extensions.Logging;
using YaHub.Application.Common;
using YaHub.Application.DTOs.Login;
using YaHub.Application.Interfaces.Login;
using YaHub.Application.Interfaces.Security;
using YaHub.Application.Interfaces.User;

namespace YaHub.Application.UseCases.Login;

public sealed class LoginService : ILoginService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IJwtTokenProvider _jwtTokenProvider;
    private readonly ILogger<LoginService> _logger;

    public LoginService(
        IUserRepository userRepository,
        IPasswordHasherService passwordHasher,
        IJwtTokenProvider jwtTokenProvider,
        ILogger<LoginService> logger)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenProvider = jwtTokenProvider;
        _logger = logger;
    }

    public async Task<Result<LoginResponse>> LoginAsync(LoginRequest loginRequest)
    {
        if (loginRequest == null)
            return Result<LoginResponse>.Fail("Login request cannot be empty.");

        var user = await _userRepository.FindByEmailAsync(loginRequest.Email);

        if (user == null)
            return Result<LoginResponse>.Fail("Invalid email or password.");

        var passwordIsValid = _passwordHasher.Verify(loginRequest.Password, user.PasswordHash);

        if (!passwordIsValid)
            return Result<LoginResponse>.Fail("Invalid email or password.");

        var expiresAt = DateTimeOffset.UtcNow.AddHours(8);
        var token = _jwtTokenProvider.Generate(user, expiresAt);

        _logger.LogInformation("User {Email} successfully authenticated.", user.Email);

        return Result<LoginResponse>.Ok(new LoginResponse
        {
            Username = user.Name,
            Email = user.Email,
            Token = token,
            ExpiresAt = expiresAt
        });
    }
}
