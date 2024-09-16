package com.example.CafeManagementSystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "menu_table")
@SequenceGenerator(name = "generator2", sequenceName = "menu_gen2", initialValue = 1)
public class Menu {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "generator2")
	@Column(name = "item_id")
	private int itemId;
	
	@NotNull(message = "Item name must not be null")
	@Size(min = 2, max = 100, message = "Item name must be between 2 and 100 characters")
	private String itemName;

	@NotNull(message = "Item image must not be null")
	private String itemImage;

	@NotNull(message = "Description must not be null")
	@Size(min = 1, max = 500, message = "Description must be between 10 and 500 characters")
	private String description;

	@Positive(message = "Price must be positive")
	private float price;
	
	private Category category;


	
	public Menu() {
		super();
		
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemImage() {
		return itemImage;
	}

	public void setItemImage(String itemImage) {
		this.itemImage = itemImage;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Menu [itemId=" + itemId + ", itemName=" + itemName + ", itemImage=" + itemImage + ", description="
				+ description + ", price=" + price + ", category=" + category + "]";
	}


}
