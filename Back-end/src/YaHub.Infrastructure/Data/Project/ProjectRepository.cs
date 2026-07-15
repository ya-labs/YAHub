using Microsoft.EntityFrameworkCore;
using YaHub.Application.Interfaces.Project;
using YaHub.Infrastructure.Persistence;
using DomainProject = YaHub.Domain.Projects.Project;

namespace YaHub.Infrastructure.Data;

public sealed class ProjectRepository : IProjectRepository
{
    private readonly YaHubDbContext _context;

    public ProjectRepository(YaHubDbContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(DomainProject project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
    }

    public async Task<List<DomainProject>> ReadAllAsync()
    {
        return await _context.Projects
            .OrderBy(project => project.Name)
            .ToListAsync();
    }

    public async Task<DomainProject?> FindByIdAsync(Guid id)
    {
        return await _context.Projects
            .FirstOrDefaultAsync(project => project.Id == id);
    }

    public async Task UpdateAsync(DomainProject project)
    {
        _context.Projects.Update(project);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(DomainProject project)
    {
        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
    }
}
