namespace YaHub.Application.DTOs.User;

public record UserResponse
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

}