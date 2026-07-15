using DomainMember = YaHub.Domain.Members.Member;

namespace YaHub.Application.Interfaces.Member;

public interface IMemberRepository
{
    Task CreateAsync(DomainMember member);
    Task<List<DomainMember>> ReadAllAsync();
    Task<DomainMember?> FindByIdAsync(Guid id);
    Task UpdateAsync(DomainMember member);
    Task DeleteAsync(DomainMember member);
}
