import { Component, OnInit } from '@angular/core';
import { CafeService } from '../../cafe.service';
import { Item } from '../../model/Item.model';
import { Cart } from '../../model/cart.model';
import { Order } from '../../model/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  customerId: any = '';
  cartItems: Cart[] = [];

  constructor(private cafeservice: CafeService) {
    this.cafeservice.isUserLoginPresent();
    this.customerId = this.cafeservice.getUserAuthorization();
  }

  ngOnInit(): void {
    this.loadCartItems();
    
  }



  loadCartItems() {
    this.cafeservice.getCartItems(this.customerId).subscribe(
      (items: any[]) => {
        // Map 'menu' to 'item'
        this.cartItems = items.map(item => ({
          ...item,
          item: item.menu // Assign 'menu' to 'item'
        }));
        console.log('Cart items loaded:', this.cartItems);
      },
      (err: any) => {
        console.log('Error loading cart items:', err);
      }
    );
  }

  incrementQuantity(cartItem: Cart) {
    const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1, totalPrice: cartItem.price * (cartItem.quantity + 1) };
    this.cafeservice.addToCart(cartItem, cartItem.item.itemId, this.customerId).subscribe(
      (response: any) => {
        console.log('Item quantity increased:', response);
        this.loadCartItems();
      },
      (err: any) => {
        console.log('Error increasing quantity:', err);
      }
    );
  }

  decrementQuantity(cartItem: Cart) {

      this.cafeservice.deleteCartItem(cartItem.orderItemId).subscribe(
        (response: any) => {
          console.log('Item removed from cart:', response);
          this.loadCartItems();
        },
        (err: any) => {
          console.log('Error removing item from cart:', err);
        }
      );
    }
  

    deleteCart(cartItem: Cart) {
      this.cafeservice.deleteCartById(cartItem.orderItemId).subscribe(
        (response: any) => {
          // console.log(cartItem.orderItemId+' Item removed from cart:', response);
          this.loadCartItems(); // Refresh the cart items after deletion
        },
        (err: any) => {
          console.log('Error removing item from cart:', err);
        }
      );
    }
 

    insertOrder() {
      const order: Order = {
        orderId: 0, // This will be set by the backend
        orderStatus: 'Pending', // You can set this based on your business logic
        paymentStatus: 'Unpaid', // Same for payment status
        orderDate: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        customer: {
          customerId: this.customerId,
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          phoneNo: 0,
          gender: '',
          district: '',
          state: '',
          zipCode: 0,
          emailId: '',
          password: '',
          role: ''
        } // Add the customer object
        ,
        totalPrice: 0
      };
  
      this.cafeservice.insertOrder(this.customerId, order).subscribe(
        (response: any) => {
          alert("Order placed successfully");
          console.log('Order placed successfully:', response);
          // Optionally, redirect the user or clear the cart
          this.loadCartItems(); // Reload cart items to reflect the empty cart after order
        },
        (err: any) => {
          console.log('Error placing order:', err);
        }
      );
    }

}
