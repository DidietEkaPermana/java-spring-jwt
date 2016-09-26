package com.ecomindo.model;

import java.util.List;

public class GroupDTO {
	private Long groupId;
	private String groupName;
	
	private List<RoleDTO> roles;
	
	public GroupDTO(){
		
	}
	
	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	public Long getGroupId() {
		return this.groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}
	
	public List<RoleDTO> getRole() {
		return this.roles;
	}

	public void setRole(List<RoleDTO> roles) {
		this.roles = roles;
	}

}
