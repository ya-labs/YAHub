namespace YaHub.Domain.Users;

public sealed class User
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset? UpdatedAt { get; private set; }

    private User()
    {
        Name = string.Empty;
        Email = string.Empty;
        PasswordHash = string.Empty;
    }

    private User(Guid id, string name, string email, string passwordHash, DateTimeOffset createdAt)
    {
        Id = id;
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
        CreatedAt = createdAt;
    }

    public static User Create(
        string name,
        string email,
        string passwordHash)
    {
        return new User(
            Guid.NewGuid(),
            name,
            email,
            passwordHash,
            DateTimeOffset.UtcNow);
    }

    public void Update(string name, string email)
    {
        Name = name;
        Email = email;
        UpdatedAt = DateTimeOffset.UtcNow;
    }
}
