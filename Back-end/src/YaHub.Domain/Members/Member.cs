using YaHub.Domain.Projects;

namespace YaHub.Domain.Members;
public class Member
{
    public int Id { get; private set; }
    public string Name { get; private set; }
    public string Role { get; private set; }

    public List<Project> Projects { get; private set; } = [];

    public Member(string name, string role)
    {
        Name = name;
        Role = role;
    }
}