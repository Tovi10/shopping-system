import { useState } from 'react';

import type { CustomerDetails } from '../types/order.types';

interface OrderFormProps {
    onSubmit: (customer: CustomerDetails) => void;
    isSubmitting: boolean;
    error: string | null;
}

type FormErrors = Partial<
    Record<keyof CustomerDetails, string>
>;

const initialForm: CustomerDetails = {
    firstName: '',
    lastName: '',
    address: '',
    email: '',
};

export default function OrderForm({
    onSubmit,
    isSubmitting,
    error,
}: OrderFormProps) {
    const [form, setForm] =
        useState<CustomerDetails>(initialForm);

    const [errors, setErrors] =
        useState<FormErrors>({});

    const handleChange = (
        field: keyof CustomerDetails,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setErrors((current) => ({
            ...current,
            [field]: undefined,
        }));
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!form.firstName.trim()) {
            newErrors.firstName =
                'יש להזין שם פרטי';
        }

        if (!form.lastName.trim()) {
            newErrors.lastName =
                'יש להזין שם משפחה';
        }

        if (!form.address.trim()) {
            newErrors.address =
                'יש להזין כתובת מלאה';
        }

        if (!form.email.trim()) {
            newErrors.email =
                'יש להזין כתובת אימייל';
        } else if (
            !/^\S+@\S+\.\S+$/.test(form.email)
        ) {
            newErrors.email =
                'כתובת האימייל אינה תקינה';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        onSubmit(form);
    };

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-md-5">
                <div className="mb-4">
                    <h2 className="h4 fw-bold mb-1">
                        פרטי לקוח
                    </h2>

                    <p className="text-secondary mb-0">
                        מלאי את הפרטים הנדרשים להשלמת ההזמנה
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="firstName"
                                className="form-label fw-semibold"
                            >
                                שם פרטי
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                className={`form-control form-control-lg ${
                                    errors.firstName
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.firstName}
                                onChange={(event) =>
                                    handleChange(
                                        'firstName',
                                        event.target.value
                                    )
                                }
                                disabled={isSubmitting}
                            />

                            {errors.firstName && (
                                <div className="invalid-feedback">
                                    {errors.firstName}
                                </div>
                            )}
                        </div>

                        <div className="col-12 col-md-6">
                            <label
                                htmlFor="lastName"
                                className="form-label fw-semibold"
                            >
                                שם משפחה
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                className={`form-control form-control-lg ${
                                    errors.lastName
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.lastName}
                                onChange={(event) =>
                                    handleChange(
                                        'lastName',
                                        event.target.value
                                    )
                                }
                                disabled={isSubmitting}
                            />

                            {errors.lastName && (
                                <div className="invalid-feedback">
                                    {errors.lastName}
                                </div>
                            )}
                        </div>

                        <div className="col-12">
                            <label
                                htmlFor="address"
                                className="form-label fw-semibold"
                            >
                                כתובת מלאה
                            </label>

                            <textarea
                                id="address"
                                rows={3}
                                className={`form-control ${
                                    errors.address
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.address}
                                onChange={(event) =>
                                    handleChange(
                                        'address',
                                        event.target.value
                                    )
                                }
                                disabled={isSubmitting}
                            />

                            {errors.address && (
                                <div className="invalid-feedback">
                                    {errors.address}
                                </div>
                            )}
                        </div>

                        <div className="col-12">
                            <label
                                htmlFor="email"
                                className="form-label fw-semibold"
                            >
                                אימייל
                            </label>

                            <input
                                id="email"
                                type="email"
                                className={`form-control form-control-lg ${
                                    errors.email
                                        ? 'is-invalid'
                                        : ''
                                }`}
                                value={form.email}
                                onChange={(event) =>
                                    handleChange(
                                        'email',
                                        event.target.value
                                    )
                                }
                                disabled={isSubmitting}
                                dir="ltr"
                            />

                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="alert alert-danger mt-4 mb-0">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mt-4 rounded-3 fw-semibold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                />

                                שולח הזמנה...
                            </>
                        ) : (
                            '✓ אישור הזמנה'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}