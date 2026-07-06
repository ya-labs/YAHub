namespace YaHub.Api.Endpoints;

public static class HealthEndpoints
{
    public static IEndpointRouteBuilder MapHealthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/health", () => Results.Ok("OK"))
            .WithName("HealthCheck")
            .WithTags("Health");

        return app;
    }
}
