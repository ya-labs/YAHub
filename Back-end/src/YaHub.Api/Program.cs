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
using YaHub.Application.Interfaces.Mappers;
using YaHub.Application.Mappers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using YaHub.Application.Interfaces.Login;
using YaHub.Application.UseCases.Login;
using Microsoft.OpenApi.Models;
using YaHub.Application.Interfaces.Member;
using YaHub.Application.Interfaces.Project;
using YaHub.Application.UseCases.Member;
using YaHub.Application.UseCases.Project;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Informe apenas o token JWT. O prefixo Bearer é aplicado automaticamente."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            []
        }
    });
});
builder.Services.AddSingleton<IDateTimeProvider, SystemDateTimeProvider>();
builder.Services.AddControllers();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var secretKey = builder.Configuration["Jwt:SecretKey"]
            ?? throw new InvalidOperationException("Jwt:SecretKey is not configured.");

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });
builder.Services.AddAuthorization();

// Repository
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IMemberRepository, MemberRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();

// Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IUserMapper, UserMapper>();
builder.Services.AddScoped<IMemberMapper, MemberMapper>();
builder.Services.AddScoped<IProjectMapper, ProjectMapper>();

// Security
builder.Services.AddScoped<IPasswordHasherService, PasswordHasherService>();
builder.Services.AddScoped<IJwtTokenProvider, JwtTokenProvider>();

// EF Persistence
builder.Services.AddDbContext<YaHubDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHealthEndpoints();

app.Run();
