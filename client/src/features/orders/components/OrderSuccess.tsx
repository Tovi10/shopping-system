interface OrderSuccessProps {
    orderId: string;
    onContinue: () => void;
}

export default function OrderSuccess({
    orderId,
    onContinue,
}: OrderSuccessProps) {
    return (
        <div
            className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4"
            dir="rtl"
        >
            <div className="card border-0 shadow-sm rounded-4 text-center w-100" style={{ maxWidth: '520px' }}>
                <div className="card-body p-5">
                    <div className="display-3 mb-4">
                        ✓
                    </div>

                    <h1 className="h3 fw-bold mb-3">
                        ההזמנה נקלטה בהצלחה!
                    </h1>

                    <p className="text-secondary mb-4">
                        תודה על ההזמנה. הפרטים נשמרו במערכת.
                    </p>

                    <div className="bg-light rounded-3 p-3 mb-4">
                        <div className="small text-secondary mb-1">
                            מספר הזמנה
                        </div>

                        <div className="fw-bold">
                            {orderId}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary btn-lg w-100 rounded-3"
                        onClick={onContinue}
                    >
                        חזרה לקטלוג
                    </button>
                </div>
            </div>
        </div>
    );
}