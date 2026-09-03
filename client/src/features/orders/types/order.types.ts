export interface CustomerDetails {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
}

export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export interface CreateOrderRequest {
    customer: CustomerDetails;
    items: OrderItem[];
}

export interface CreateOrderResponse {
    id: string;
    message: string;
}