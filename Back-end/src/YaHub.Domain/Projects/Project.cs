using YaHub.Domain.Members;

namespace YaHub.Domain.Projects;

public class Project
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; }
    public string Description { get; private set; }
    public string Url { get; private set; }

    public List<Member> Members { get; private set; } = [];

    public Project(string name, string description, string url)
    {
        Name = name;
        Description = description;
        Url = url;
    }

    public void AddMember(Member member)
    {
        Members.Add(member);
    }
}