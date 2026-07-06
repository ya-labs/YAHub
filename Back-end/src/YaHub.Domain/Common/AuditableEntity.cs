namespace YaHub.Domain.Common;

public abstract class AuditableEntity : Entity
{
    public DateTimeOffset CreatedAt { get; protected set; }
    public DateTimeOffset? UpdatedAt { get; protected set; }

    protected AuditableEntity(Guid id, DateTimeOffset createdAt)
        : base(id)
    {
        CreatedAt = createdAt;
    }

    protected void MarkAsUpdated(DateTimeOffset updatedAt)
    {
        UpdatedAt = updatedAt;
    }
}
