namespace YaHub.Application.Abstractions.Clock;

public interface IDateTimeProvider
{
    DateTimeOffset UtcNow { get; }
}
