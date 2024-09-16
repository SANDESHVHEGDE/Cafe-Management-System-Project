import { Customer } from "./customer.model";

export interface Order{

    orderId: number;
    totalPrice: number;
    orderStatus: string;
    paymentStatus: string;
    orderDate: string;
    customer: Customer;
}