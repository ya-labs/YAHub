using YaHub.Application.DTOs.Member;
using YaHub.Application.Interfaces.Mappers;
using DomainMember = YaHub.Domain.Members.Member;

namespace YaHub.Application.Mappers;

public sealed class MemberMapper : IMemberMapper
{
    public DomainMember ToEntity(MemberRequest request)
    {
        return new DomainMember(request.Name, request.Role);
    }

    public MemberResponse ToResponse(DomainMember member)
    {
        return new MemberResponse
        {
            Id = member.Id,
            Name = member.Name,
            Role = member.Role
        };
    }

    public List<MemberResponse> ToResponseList(List<DomainMember> members)
    {
        return members.Select(ToResponse).ToList();
    }
}
