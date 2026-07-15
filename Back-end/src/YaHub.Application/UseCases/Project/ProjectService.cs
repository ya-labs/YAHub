using Microsoft.Extensions.Logging;
using YaHub.Application.Common;
using YaHub.Application.DTOs.Project;
using YaHub.Application.Interfaces.Mappers;
using YaHub.Application.Interfaces.Project;

namespace YaHub.Application.UseCases.Project;

public sealed class ProjectService : IProjectService
{
    private readonly IProjectRepository _repository;
    private readonly IProjectMapper _mapper;
    private readonly ILogger<ProjectService> _logger;

    public ProjectService(
        IProjectRepository repository,
        IProjectMapper mapper,
        ILogger<ProjectService> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<Result<ProjectResponse>> CreateAsync(ProjectRequest projectRequest)
    {
        if (projectRequest == null)
            return Result<ProjectResponse>.Fail("Project request cannot be empty.");

        var project = _mapper.ToEntity(projectRequest);

        await _repository.CreateAsync(project);
        _logger.LogInformation("Project {ProjectId} successfully created.", project.Id);

        return Result<ProjectResponse>.Ok(_mapper.ToResponse(project));
    }

    public async Task<Result<List<ProjectResponse>>> ReadAllAsync()
    {
        var projects = await _repository.ReadAllAsync();

        return Result<List<ProjectResponse>>.Ok(_mapper.ToResponseList(projects));
    }

    public async Task<Result<ProjectResponse>> UpdateAsync(Guid id, ProjectRequest projectRequest)
    {
        if (projectRequest == null)
            return Result<ProjectResponse>.Fail("Project request cannot be empty.");

        var project = await _repository.FindByIdAsync(id);

        if (project == null)
            return Result<ProjectResponse>.Fail($"Project with id {id} not found.");

        project.Update(projectRequest.Name, projectRequest.Description, projectRequest.Url);

        await _repository.UpdateAsync(project);
        _logger.LogInformation("Project {ProjectId} successfully updated.", project.Id);

        return Result<ProjectResponse>.Ok(_mapper.ToResponse(project));
    }

    public async Task<Result<ProjectResponse>> DeleteAsync(Guid id)
    {
        var project = await _repository.FindByIdAsync(id);

        if (project == null)
            return Result<ProjectResponse>.Fail($"Project with id {id} not found.");

        await _repository.DeleteAsync(project);
        _logger.LogInformation("Project {ProjectId} successfully deleted.", project.Id);

        return Result<ProjectResponse>.Ok(_mapper.ToResponse(project));
    }
}
