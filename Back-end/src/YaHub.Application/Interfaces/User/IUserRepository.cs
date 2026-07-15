namespace YaHub.Application.Interfaces.User;

using YaHub.Domain.Users;
public interface IUserRepository
{
    public Task CreateAsync(User user);
    public Task<List<User>> ReadAllAsync();
    public Task<User?> FindByIdAsync(Guid id);
    public Task UpdateAsync(User user);
    public Task DeleteAsync(User user);
    public Task<User?> FindByEmailAsync(string email);
    Task<bool> ExistsByEmailAsync(string email);
}
