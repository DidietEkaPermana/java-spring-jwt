package com.ecomindo.entity;

import javax.persistence.*;

@Entity
@Table(name="AUTH_ROLE")
public class AuthRoleEntity {

	@Id
	//@SequenceGenerator(name="AUTH_ROLE_ROLEID_GENERATOR", sequenceName="AUTH_ROLE_SEQ_ID", allocationSize=1)
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="AUTH_ROLE_ROLEID_GENERATOR")
	@Column(name="ROLE_ID")
	private Long roleId;

	@Column(name="ROLE_NAME")
	private String roleName;

	public AuthRoleEntity() {
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	public Long getRoleId() {
		return this.roleId;
	}

	public void setRoleId(long l) {
		this.roleId = l;
	}
}
