using Microsoft.EntityFrameworkCore;
using YaHub.Domain.Members;
using YaHub.Domain.Projects;
using YaHub.Domain.Users;

namespace YaHub.Infrastructure.Persistence;

public class YaHubDbContext : DbContext
{
    public YaHubDbContext(DbContextOptions<YaHubDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Member> Members => Set<Member>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Project>().ToTable("projects");
        modelBuilder.Entity<Member>().ToTable("members");
    }
}