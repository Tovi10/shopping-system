import type {
    Request,
    Response,
} from 'express';

import {
    createOrder,
} from '../services/ordersService.js';

import type {
    CreateOrderRequest,
} from '../types/order.types.js';

export async function postOrder(
    req: Request,
    res: Response
) {
    try {
        const data =
            req.body as CreateOrderRequest;

        if (!data.customer) {
            return res.status(400).json({
                message:
                    'Customer details are required',
            });
        }

        if (
            !Array.isArray(data.items) ||
            data.items.length === 0
        ) {
            return res.status(400).json({
                message:
                    'Order must contain at least one item',
            });
        }

        const order =
            await createOrder(data);

        return res.status(201).json({
            id: order._id,
            message:
                'Order created successfully',
        });
    } catch (error) {
        console.error(
            'Failed to create order:',
            error
        );

        return res.status(500).json({
            message:
                'Failed to create order',
        });
    }
}