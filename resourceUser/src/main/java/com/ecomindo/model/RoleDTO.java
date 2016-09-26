package com.ecomindo.model;

public class RoleDTO {
	private Long roleId;
	private String roleName;
	
	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	public Long getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Long long1) {
		this.roleId = long1;
	}
}
