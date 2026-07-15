using YaHub.Application.DTOs.User;
using YaHub.Application.Interfaces.Mappers;
using DomainUser = YaHub.Domain.Users.User;

namespace YaHub.Application.Mappers;

public sealed class UserMapper : IUserMapper
{
    public DomainUser ToEntity(UserRequest request, string passwordHash)
    {
        return DomainUser.Create(
            request.Username,
            request.Email,
            passwordHash);
    }

    public UserResponse ToResponse(DomainUser user)
    {
        return new UserResponse
        {
            Username = user.Name,
            Email = user.Email
        };
    }

    public List<UserResponse> ToResponseList(List<DomainUser> users)
    {
        if (users == null) return new List<UserResponse>();

        return users.Select(ToResponse).ToList();
    }
}
