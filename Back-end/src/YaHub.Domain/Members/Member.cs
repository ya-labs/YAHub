using YaHub.Domain.Projects;

namespace YaHub.Domain.Members;
public class Member
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; }
    public string Role { get; private set; }

    public List<Project> Projects { get; private set; } = [];

    private Member()
    {
        Name = string.Empty;
        Role = string.Empty;
    }

    public Member(string name, string role)
    {
        Id = Guid.NewGuid();
        Name = name;
        Role = role;
    }

    public void Update(string name, string role)
    {
        Name = name;
        Role = role;
    }
}
