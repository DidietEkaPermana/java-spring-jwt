package com.ecomindo.model;

public class dataTableDTO {
	private int draw;
	private int recordsTotal;
	private int recordsFiltered;
	private Object data;
	private String error;
	
	public dataTableDTO(int draw, int recordsTotal, int recordsFiltered, Object data, String error) {
		this.draw = draw;
		this.recordsTotal = recordsTotal;
		this.recordsFiltered = recordsFiltered;
		this.data = data;
		this.error = error;
	}

	public dataTableDTO() {
	}
	
	public int getDraw(){
		return this.draw;
	}
	public void setDraw(int draw){
		this.draw = draw;
	}
	public int getRecordsTotal(){
		return this.recordsTotal;
	}
	public void setRecordsTotal(int recordsTotal){
		this.recordsTotal = recordsTotal;
	}
	public int getRecordsFiltered(){
		return this.recordsFiltered;
	}
	public void setRecordsFiltered(int recordsFiltered){
		this.recordsFiltered = recordsFiltered;
	}
	public Object getData(){
		return this.data;
	}
	public void setData(Object data){
		this.data = data;
	}
	public String getError(){
		return this.error;
	}
	public void setError(String error){
		this.error = error;
	}
}
