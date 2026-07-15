using YaHub.Api.Endpoints;
using YaHub.Application.Abstractions.Clock;
using YaHub.Infrastructure.Clock;
using Microsoft.EntityFrameworkCore;
using YaHub.Infrastructure.Persistence;
using YaHub.Application.Interfaces.User;
using YaHub.Infrastructure.Data;
using YaHub.Application.UseCases.User;
using YaHub.Api.Middlewares;
using YaHub.Infrastructure.Security;
using YaHub.Application.Interfaces.Security;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<IDateTimeProvider, SystemDateTimeProvider>();

// Repository
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Services
builder.Services.AddScoped<IUserService, UserService>();

// Security
builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>();

// EF Persistence
builder.Services.AddDbContext<YaHubDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthEndpoints();

app.Run();
