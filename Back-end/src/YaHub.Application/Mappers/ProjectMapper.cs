using YaHub.Application.DTOs.Project;
using YaHub.Application.Interfaces.Mappers;
using DomainProject = YaHub.Domain.Projects.Project;

namespace YaHub.Application.Mappers;

public sealed class ProjectMapper : IProjectMapper
{
    public DomainProject ToEntity(ProjectRequest request)
    {
        return new DomainProject(request.Name, request.Description, request.Url);
    }

    public ProjectResponse ToResponse(DomainProject project)
    {
        return new ProjectResponse
        {
            Id = project.Id,
            Name = project.Name,
            Description = project.Description,
            Url = project.Url
        };
    }

    public List<ProjectResponse> ToResponseList(List<DomainProject> projects)
    {
        return projects.Select(ToResponse).ToList();
    }
}
