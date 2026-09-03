export interface OrderCustomer {
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
  customer: OrderCustomer;
  items: OrderItem[];
}