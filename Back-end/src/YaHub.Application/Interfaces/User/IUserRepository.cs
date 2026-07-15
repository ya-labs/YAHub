namespace YaHub.Application.Interfaces.User;
using YaHub.Domain.Users;
public interface IUserRepository
{
    public Task CreateAsync (User user);
    public Task<List<User>> ReadAllAsync ();
    public Task<User> FindByIdAsync (int id);
    public Task UpdateAsync (User user);
    public Task DeleteAsync (User user);
}