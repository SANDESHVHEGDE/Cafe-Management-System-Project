package com.example.CafeManagementSystem.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "Order_item_table")
@SequenceGenerator(name = "generator3", sequenceName = "order_item_gen3", initialValue = 200)
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator3")
	private int orderItemId;
	
	@Min(value = 1, message = "Quantity must be at least 1")
	private int quantity;
	
	@Positive(message = "Price must be positive")
	private double price;
	
	@Positive(message = "Total price must be positive")
	private double totalPrice;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "customer_id")
	@NotNull(message = "Customer must not be null")
	private Customer customer;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "item_id")
	@NotNull(message = "Menu item must not be null")
	private Menu menu;

	public OrderItem() {
		super();
	}

	public int getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(int orderItemId) {
		this.orderItemId = orderItemId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Override
	public String toString() {
		return "OrderItem [orderItemId=" + orderItemId + ", quantity=" + quantity + ", price=" + price + ", totalPrice="
				+ totalPrice + ", customer=" + customer + ", menu=" + menu + "]";
	}
	
}
