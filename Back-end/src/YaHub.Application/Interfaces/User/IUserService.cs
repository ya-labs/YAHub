using YaHub.Application.Common;
using YaHub.Application.DTOs.User;

namespace YaHub.Application.Interfaces.User;

public interface IUserService
{
    public Task<Result<UserResponse>> CreateAsync (UserRequest userRequest);
    public Task<Result<List<UserResponse>>> ReadAllAsync ();
    public Task<Result<UserResponse>> UpdateAsync (Guid id, UserRequest userRequest);
    public Task<Result<UserResponse>> DeleteAsync (Guid id);
}
