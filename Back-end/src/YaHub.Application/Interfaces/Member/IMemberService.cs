using YaHub.Application.Common;
using YaHub.Application.DTOs.Member;

namespace YaHub.Application.Interfaces.Member;

public interface IMemberService
{
    public Task<Result<MemberResponse>> CreateAsync (MemberRequest memberRequest);
    public Task<Result<List<MemberResponse>>> ReadAllAsync ();
    public Task<Result<MemberResponse>> UpdateAsync (MemberRequest memberRequest);
    public Task<Result<MemberResponse>> DeleteAsync (MemberRequest memberRequest);
}