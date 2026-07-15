using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YaHub.Application.DTOs.Login;
using YaHub.Application.Interfaces.Login;

namespace YaHub.Api.Controllers;

[ApiController]
[Route("api")]
public class AuthController : ControllerBase
{
    private readonly ILoginService _loginService;

    public AuthController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
    {
        var result = await _loginService.LoginAsync(loginRequest);

        if (!result.IsSuccess)
            return Unauthorized(result);

        return Ok(result);
    }
}
