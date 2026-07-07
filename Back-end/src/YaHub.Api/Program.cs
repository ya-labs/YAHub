using YaHub.Api.Endpoints;
using YaHub.Application.Abstractions.Clock;
using YaHub.Infrastructure.Clock;
using Microsoft.EntityFrameworkCore;
using YaHub.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<IDateTimeProvider, SystemDateTimeProvider>();

// EF Persistence
builder.Services.AddDbContext<YaHubDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthEndpoints();

app.Run();
