using YaHub.Application.Common;
using YaHub.Application.DTOs.Member;

namespace YaHub.Application.Interfaces.Member;

public interface IMemberService
{
    Task<Result<MemberResponse>> CreateAsync(MemberRequest memberRequest);
    Task<Result<List<MemberResponse>>> ReadAllAsync();
    Task<Result<MemberResponse>> UpdateAsync(Guid id, MemberRequest memberRequest);
    Task<Result<MemberResponse>> DeleteAsync(Guid id);
}
