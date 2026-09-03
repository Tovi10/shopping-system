import { Order } from '../models/Order.js';

import type {
    CreateOrderRequest,
} from '../types/order.types.js';

export async function createOrder(
    data: CreateOrderRequest
) {
    const total = data.items.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const order = await Order.create({
        customer: data.customer,
        items: data.items,
        total,
    });

    return order;
}