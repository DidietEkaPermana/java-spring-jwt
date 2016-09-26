package com.ecomindo.model;

public class ProjectDTO {

	private long id;

	private long customerId;
	
	private String customerName;

	private String name;
	
	private int type;

	public ProjectDTO(long id, long customerId, String customerName, String name, int type) {
		this.id = id;
		this.customerId = customerId;
		this.customerName = customerName;
		this.name = name;
		this.type = type;
	}

	public ProjectDTO() {
		
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public long getCustomerId() {
		return this.customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return this.customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public int getType() {
		return this.type;
	}

	public void setType(int type) {
		this.type = type;
	}
}
