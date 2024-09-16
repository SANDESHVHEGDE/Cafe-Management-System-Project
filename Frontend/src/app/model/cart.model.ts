import { Item } from "./Item.model";
import { Customer } from "./customer.model";

export interface Cart{
    orderItemId: number;
    quantity: number;
    price: number;
    totalPrice: number;
    customer: Customer;
    item: Item;
}
