using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YaHub.Application.DTOs.User;
using YaHub.Application.Interfaces.User;

namespace YaHub.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpPost("/users")]
    public async Task<IActionResult> Create([FromBody] UserRequest userRequest)
    {
        var result = await _userService.CreateAsync(userRequest);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpGet("/users")]
    public async Task<IActionResult> Read()
    {
        var result = await _userService.ReadAllAsync();

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpPut("/users/{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UserRequest userRequest)
    {
        var result = await _userService.UpdateAsync(id, userRequest);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }

    [Authorize]
    [HttpDelete("/users/{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _userService.DeleteAsync(id);

        if (!result.IsSuccess)
            return BadRequest(result.Message);

        return Ok(result);
    }
}
