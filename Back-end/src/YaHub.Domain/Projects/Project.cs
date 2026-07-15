using YaHub.Domain.Members;

namespace YaHub.Domain.Projects;

public class Project
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; }
    public string Description { get; private set; }
    public string Url { get; private set; }

    public List<Member> Members { get; private set; } = [];

    private Project()
    {
        Name = string.Empty;
        Description = string.Empty;
        Url = string.Empty;
    }

    public Project(string name, string description, string url)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        Url = url;
    }

    public void Update(string name, string description, string url)
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
