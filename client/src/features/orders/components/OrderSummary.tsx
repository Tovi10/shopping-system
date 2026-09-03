import type { CartItem } from '../../cart/types/cart.types';

interface OrderSummaryProps {
    items: CartItem[];
}

export default function OrderSummary({
    items,
}: OrderSummaryProps) {
    const total = items.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-4">
                    סיכום ההזמנה
                </h2>

                <div className="d-flex flex-column gap-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex justify-content-between align-items-center border-bottom pb-3"
                        >
                            <div>
                                <div className="fw-semibold">
                                    {item.name}
                                </div>

                                <div className="text-secondary small">
                                    כמות: {item.quantity}
                                </div>
                            </div>

                            <div className="fw-bold">
                                ₪{(
                                    item.price *
                                    item.quantity
                                ).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className="fw-bold fs-5">
                        סה״כ
                    </span>

                    <span className="fw-bold fs-3 text-primary">
                        ₪{total.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}