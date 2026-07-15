using YaHub.Application.DTOs.User;
using DomainUser = YaHub.Domain.Users.User;

namespace YaHub.Application.Interfaces.Mappers;

public interface IUserMapper
{
    DomainUser ToEntity(UserRequest request, string passwordHash);
    UserResponse ToResponse(DomainUser user);
    List<UserResponse> ToResponseList(List<DomainUser> users);
}
