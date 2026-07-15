using Microsoft.EntityFrameworkCore;
using YaHub.Application.Interfaces.Member;
using YaHub.Domain.Members;
using YaHub.Infrastructure.Persistence;

namespace YaHub.Infrastructure.Data;

public sealed class MemberRepository : IMemberRepository
{
    private readonly YaHubDbContext _context;

    public MemberRepository(YaHubDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(Member member)
    {
        _context.Members.Add(member);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Member>> ReadAllAsync()
    {
        return await _context.Members
            .OrderBy(member => member.Name)
            .ToListAsync();
    }

    public async Task<Member?> FindByIdAsync(Guid id)
    {
        return await _context.Members
            .FirstOrDefaultAsync(member => member.Id == id);
    }

    public async Task UpdateAsync(Member member)
    {
        _context.Members.Update(member);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Member member)
    {
        _context.Members.Remove(member);
        await _context.SaveChangesAsync();
    }
}
