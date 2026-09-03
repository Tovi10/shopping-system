import type { RootState } from '../../../app/store';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../app/hooks';

import {
    removeFromCart,
    updateQuantity,
} from '../cartSlice';

interface CartSummaryProps {
    onContinue: () => void;
}

export default function CartSummary({
    onContinue,
}: CartSummaryProps) {
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector(
        (state: RootState) => state.cart.items
    );

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body text-center py-5">
                    <div className="display-5 mb-3">
                        🛒
                    </div>

                    <h4 className="fw-bold">
                        העגלה ריקה
                    </h4>

                    <p className="text-secondary mb-0">
                        הוסיפי מוצרים כדי להמשיך להזמנה
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="h4 fw-bold mb-1">
                            🛒 עגלת הקניות
                        </h3>

                        <div className="text-secondary small">
                            {cartItems.length} מוצרים שונים
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column gap-3">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="border rounded-4 p-3"
                        >
                            <div className="row align-items-center g-3">
                                <div className="col">
                                    <h5 className="fw-bold mb-1">
                                        {item.name}
                                    </h5>

                                    <div className="text-secondary small">
                                        ₪{item.price.toLocaleString()} ליחידה
                                    </div>
                                </div>

                                <div className="col-auto">
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        productId: item.id,
                                                        quantity: item.quantity - 1,
                                                    })
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <span
                                            className="fw-bold"
                                            style={{
                                                minWidth: '24px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() =>
                                                dispatch(
                                                    updateQuantity({
                                                        productId: item.id,
                                                        quantity: item.quantity + 1,
                                                    })
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="col-auto text-end">
                                    <div className="fw-bold text-primary">
                                        ₪{(
                                            item.price * item.quantity
                                        ).toLocaleString()}
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-link btn-sm text-danger p-0"
                                        onClick={() =>
                                            dispatch(
                                                removeFromCart(item.id)
                                            )
                                        }
                                    >
                                        הסר
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold">
                        סה״כ לתשלום
                    </span>

                    <span className="fs-3 fw-bold text-primary">
                        ₪{total.toLocaleString()}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn btn-primary btn-lg w-100 mt-4 rounded-3"
                    onClick={onContinue}
                >
                    המשך להזמנה ←
                </button>
            </div>
        </div>
    );
}