namespace YaHub.Application.DTOs.Member;

public record MemberRequest
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
