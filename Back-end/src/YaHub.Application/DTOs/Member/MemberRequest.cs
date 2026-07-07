namespace YaHub.Application.DTOs.Member;

public record MemberRequest
{
    public string Name { get; set; } = string.Empty;
}