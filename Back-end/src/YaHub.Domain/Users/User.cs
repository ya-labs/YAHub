using YaHub.Domain.Common;

namespace YaHub.Domain.Users;

public sealed class User : AuditableEntity
{
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }

    private User(Guid id, string name, string email, string passwordHash, DateTimeOffset createdAt)
        : base(id, createdAt)
    {
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
    }

    public static User Create(string name, string email, string passwordHash, DateTimeOffset createdAt)
    {
        return new User(Guid.NewGuid(), name, email, passwordHash, createdAt);
    }
}
