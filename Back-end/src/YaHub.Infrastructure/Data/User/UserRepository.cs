using Microsoft.EntityFrameworkCore;
using YaHub.Application.Interfaces.User;
using YaHub.Domain.Users;
using YaHub.Infrastructure.Persistence;

namespace YaHub.Infrastructure.Data;

public class UserRepository : IUserRepository
{
    private readonly YaHubDbContext _context;

    public UserRepository(YaHubDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();
    }

    public async Task<List<User>> ReadAllAsync()
    {
        return await _context.Users
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    public async Task<User?> FindByIdAsync(Guid id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task UpdateAsync(User user)
    {
        _context.Update(user);

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(User user)
    {
        _context.Remove(user);

        await _context.SaveChangesAsync();
    }

    public async Task<User?> FindByEmailAsync(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<bool> ExistsByEmailAsync(string email)
    {
        return await _context.Users.AnyAsync(x => x.Email == email);
    }
}
