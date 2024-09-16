package com.example.CafeManagementSystem.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "generator5", sequenceName = "payment_gen5", initialValue = 500)
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator5")
	private int paymentId;
	
	@Column(name="total_price")
	private double totalPrice;
	
	@Column(name="order_id",unique=true)
	private int orderId;
	
	@Column(name = "paid_date")
	private LocalDate paidDate;
	
	@Column(name = "paid_amount", nullable = false)
	private double paidAmount;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "customer_id")
	@JsonIgnore
	private Customer customer;

	public Payment() {
		super();
	}

	public Payment(int paymentId, double totalPrice, int orderId, LocalDate paidDate, double paidAmount,
			Customer customer) {
		super();
		this.paymentId = paymentId;
		this.totalPrice = totalPrice;
		this.orderId = orderId;
		this.paidDate = paidDate;
		this.paidAmount = paidAmount;
		this.customer = customer;
	}

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public LocalDate getPaidDate() {
		return paidDate;
	}

	public void setPaidDate(LocalDate paidDate) {
		this.paidDate = paidDate;
	}

	public double getPaidAmount() {
		return paidAmount;
	}

	public void setPaidAmount(double paidAmount) {
		this.paidAmount = paidAmount;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Payment [paymentId=" + paymentId + ", totalPrice=" + totalPrice + ", orderId=" + orderId + ", paidDate="
				+ paidDate + ", paidAmount=" + paidAmount + ", customer=" + customer + "]";
	}
	
	
	
}
