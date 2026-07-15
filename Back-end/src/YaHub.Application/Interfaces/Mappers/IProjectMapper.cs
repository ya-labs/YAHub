using YaHub.Application.DTOs.Project;
using DomainProject = YaHub.Domain.Projects.Project;

namespace YaHub.Application.Interfaces.Mappers;

public interface IProjectMapper
{
    DomainProject ToEntity(ProjectRequest request);
    ProjectResponse ToResponse(DomainProject project);
    List<ProjectResponse> ToResponseList(List<DomainProject> projects);
}
