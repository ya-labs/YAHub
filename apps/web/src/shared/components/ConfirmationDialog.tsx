type ConfirmationDialogProps = {
    title: string;
    description: string;
    confirmLabel: string;
    isConfirming: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export function ConfirmationDialog({
    title,
    description,
    confirmLabel,
    isConfirming,
    onCancel,
    onConfirm,
}: ConfirmationDialogProps) {
    return (
        <div className="admin-confirmation-dialog" role="presentation">
            <section
                className="admin-confirmation-dialog__content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="admin-confirmation-dialog-title"
            >
                <h2 id="admin-confirmation-dialog-title">{title}</h2>
                <p>{description}</p>
                <div className="admin-confirmation-dialog__actions">
                    <button type="button" onClick={onCancel} disabled={isConfirming}>
                        Cancelar
                    </button>
                    <button type="button" className="admin-button--danger" onClick={onConfirm} disabled={isConfirming}>
                        {isConfirming ? 'Removendo...' : confirmLabel}
                    </button>
                </div>
            </section>
        </div>
    );
}
