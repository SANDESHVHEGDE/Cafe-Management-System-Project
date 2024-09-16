package com.example.CafeManagementSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CafeManagementSystem.entity.Order;
import com.example.CafeManagementSystem.entity.OrderItem;
import com.example.CafeManagementSystem.entity.TransactionDetails;
import com.example.CafeManagementSystem.service.OrderServiceImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderServiceImpl orderServiceImpl;

	public OrderController(OrderServiceImpl orderServiceImpl) {
		super();
		this.orderServiceImpl = orderServiceImpl;
	}

	
	@PostMapping("/order/{customerId}")
	public ResponseEntity<Order> insertRecord(@PathVariable int customerId, @RequestBody Order order) {

		return new ResponseEntity<Order>( orderServiceImpl.insertRecord(order, customerId), HttpStatus.CREATED);
	}

	@GetMapping("/order")
	public List<Order> getAllRecord() {

		return orderServiceImpl.getAllRecord();
	}

	@GetMapping("/{orderId}")
	public Order getRecordById(@PathVariable int orderId) {

		return orderServiceImpl.getRecordById(orderId);
	}

	@PutMapping("/{orderId}")
	public Order updateRecordById(@PathVariable int orderId,@RequestBody Order order) {

		return orderServiceImpl.updateRecordById(orderId, order);
	}

	@DeleteMapping("/deleting/{orderId}")
	public String deleteRecordById(@PathVariable int orderId) {
		
		orderServiceImpl.deleteRecordById(orderId);
		return "Successfully deleted with id "+orderId;
	}
	
	@GetMapping("/customer/{customerId}")
	public List<Order> getOrderByCustomerId(@PathVariable int customerId) {

		return orderServiceImpl.getOrderByCustomerId(customerId);
	}
	
	
	@PostMapping("/{itemId}/{customerId}")
	public OrderItem addItem(@RequestBody OrderItem orderItem,@PathVariable int itemId,@PathVariable int customerId) {
		return orderServiceImpl.addItem(orderItem, itemId, customerId);
	}
	
	@GetMapping({"/createTransaction/{amount}"})
    public TransactionDetails createTransaction(@PathVariable(name = "amount") Double amount) {
        return orderServiceImpl.createTransaction(amount); //orderDetailService.createTransaction(amount);
    }
	
}
