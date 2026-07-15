namespace YaHub.Application.DTOs.Member;

public record MemberResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
