using YaHub.Application.Common;
using YaHub.Application.DTOs.Login;

namespace YaHub.Application.Interfaces.Login;

public interface ILoginService
{
    public Task<Result<LoginResponse>> LoginAsync (LoginRequest loginRequest);

}