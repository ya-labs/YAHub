using DomainUser = YaHub.Domain.Users.User;

namespace YaHub.Application.Interfaces.Security;

public interface IJwtTokenProvider
{
    string Generate(DomainUser user, DateTimeOffset expiresAt);
}
