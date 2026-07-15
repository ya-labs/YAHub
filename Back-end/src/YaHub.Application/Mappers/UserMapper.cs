using YaHub.Application.DTOs.User;
using YaHub.Domain.Users;

namespace YaHub.Application.Mappers;

public sealed class UserMapper
{
    public User ToEntity(UserRequest request, string passwordHash)
    {
        return User.Create(
            request.Username,
            request.Email,
            passwordHash);
    }

    public UserResponse ToResponse(User user)
    {
        return new UserResponse
        {
            Username = user.Name,
            Email = user.Email
        };
    }

    public List<UserResponse> ToResponseList (List<User> users)
    {
        if (users == null) return new List<UserResponse>();

        return users.Select(users => ToResponse(users)).ToList();
    }
}