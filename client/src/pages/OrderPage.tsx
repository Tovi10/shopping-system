import { useState } from 'react';

import {
    useCreateOrderMutation,
} from '../features/orders/api/ordersApi';

import type {
    CustomerDetails,
} from '../features/orders/types/order.types';

import OrderForm from '../features/orders/components/OrderForm';
import OrderSummary from '../features/orders/components/OrderSummary';
import OrderSuccess from '../features/orders/components/OrderSuccess';

import {
    clearCart,
} from '../features/cart/cartSlice';

import {
    useAppDispatch,
    useAppSelector,
} from '../app/hooks';

interface OrderPageProps {
    onBack: () => void;
}

export default function OrderPage({
    onBack,
}: OrderPageProps) {
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector(
        (state) => state.cart.items
    );

    const [
        createOrder,
        {
            isLoading: isSubmitting,
        },
    ] = useCreateOrderMutation();

    const [orderId, setOrderId] =
        useState<string | null>(null);

    const [submitError, setSubmitError] =
        useState<string | null>(null);

   const handleSubmit = async (
    customer: CustomerDetails
) => {
    setSubmitError(null);

    try {
        const result =
            await createOrder({
                customer,
                items: cartItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            }).unwrap();

        setOrderId(result.id);

        dispatch(clearCart());
    } catch (error) {
        console.error(
            'Failed to create order:',
            error
        );

        setSubmitError(
            'אירעה שגיאה בשליחת ההזמנה. נסי שוב.'
        );
    }
};

    if (orderId) {
        return (
            <OrderSuccess
                orderId={orderId}
                onContinue={onBack}
            />
        );
    }

    if (cartItems.length === 0) {
        return (
            <div
                className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-4"
                dir="rtl"
            >
                <div className="text-center">
                    <div className="display-4 mb-3">
                        🛒
                    </div>

                    <h2 className="fw-bold">
                        העגלה ריקה
                    </h2>

                    <p className="text-secondary">
                        אין מוצרים להזמנה
                    </p>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onBack}
                    >
                        חזרה לקטלוג
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-vh-100 bg-light"
            dir="rtl"
        >
            <header className="bg-white border-bottom shadow-sm">
                <div className="container py-3">
                    <div className="d-flex align-items-center gap-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onBack}
                            disabled={isSubmitting}
                        >
                            → חזרה
                        </button>

                        <div>
                            <h1 className="h4 fw-bold text-primary mb-0">
                                השלמת הזמנה
                            </h1>

                            <div className="text-secondary small">
                                עוד רגע וזה שלך
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container py-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-lg-7">
                        <OrderForm
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            error={submitError}
                        />
                    </div>

                    <div className="col-12 col-lg-5">
                        <OrderSummary
                            items={cartItems}
                        />

                        <div className="alert alert-primary border-0 rounded-4 mt-3">
                            <div className="fw-semibold mb-1">
                                🔒 ההזמנה כמעט מוכנה
                            </div>

                            <div className="small">
                                בדקי שהפרטים שהזנת נכונים לפני אישור ההזמנה.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}