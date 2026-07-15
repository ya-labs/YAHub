namespace YaHub.Domain.Users;

public sealed class User
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }

    private User(int id, string name, string email, string passwordHash, DateTimeOffset createdAt)
    {
        Id = id;
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
    }

    public static User Create(
        string name,
        string email,
        string passwordHash)
    {
        return new User(
            0,
            name,
            email,
            passwordHash,
            DateTimeOffset.UtcNow);
    }
}
