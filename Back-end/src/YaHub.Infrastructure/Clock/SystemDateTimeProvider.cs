using YaHub.Application.Abstractions.Clock;

namespace YaHub.Infrastructure.Clock;

public sealed class SystemDateTimeProvider : IDateTimeProvider
{
    public DateTimeOffset UtcNow => DateTimeOffset.UtcNow;
}
