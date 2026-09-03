import mongoose, {
    Document,
    Schema,
} from 'mongoose';

import type {
    OrderCustomer,
    OrderItem,
} from '../types/order.types.js';

export interface OrderDocument
    extends Document {
    customer: OrderCustomer;
    items: OrderItem[];
    total: number;
    createdAt: Date;
}

const orderItemSchema =
    new Schema<OrderItem>(
        {
            productId: {
                type: Number,
                required: true,
            },

            name: {
                type: String,
                required: true,
                trim: true,
            },

            price: {
                type: Number,
                required: true,
                min: 0,
            },

            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
        {
            _id: false,
        }
    );

const orderSchema =
    new Schema<OrderDocument>(
        {
            customer: {
                firstName: {
                    type: String,
                    required: true,
                    trim: true,
                },

                lastName: {
                    type: String,
                    required: true,
                    trim: true,
                },

                address: {
                    type: String,
                    required: true,
                    trim: true,
                },

                email: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },

            items: {
                type: [orderItemSchema],
                required: true,

                validate: {
                    validator: (
                        items: OrderItem[]
                    ) => items.length > 0,

                    message:
                        'Order must contain at least one item',
                },
            },

            total: {
                type: Number,
                required: true,
                min: 0,
            },
        },

        {
            timestamps: true,
        }
    );

export const Order =
    mongoose.model<OrderDocument>(
        'Order',
        orderSchema
    );