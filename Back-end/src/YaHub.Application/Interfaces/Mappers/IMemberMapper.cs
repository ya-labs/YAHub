using YaHub.Application.DTOs.Member;
using DomainMember = YaHub.Domain.Members.Member;

namespace YaHub.Application.Interfaces.Mappers;

public interface IMemberMapper
{
    DomainMember ToEntity(MemberRequest request);
    MemberResponse ToResponse(DomainMember member);
    List<MemberResponse> ToResponseList(List<DomainMember> members);
}
