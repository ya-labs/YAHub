using YaHub.Domain.Projects;

namespace YaHub.Application.Interfaces.Project;

public interface IProjectRepository
{
    Task CreateAsync(YaHub.Domain.Projects.Project project);
    Task<List<YaHub.Domain.Projects.Project>> ReadAllAsync();
    Task<YaHub.Domain.Projects.Project?> FindByIdAsync(Guid id);
    Task UpdateAsync(YaHub.Domain.Projects.Project project);
    Task DeleteAsync(YaHub.Domain.Projects.Project project);
}
