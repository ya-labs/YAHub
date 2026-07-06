using System.Text.Json.Serialization;

namespace YaHub.Application.Common;

public sealed record Result<T>(
    [property: JsonPropertyName("result")] bool IsSuccess,
    string? Message,
    T? Data)
{
    public static Result<T> Ok(T data)
    {
        return new Result<T>(true, null, data);
    }

    public static Result<T> Fail(string message)
    {
        return new Result<T>(false, message, default);
    }
}
