package com.ecomindo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="AUTH_GROUP_ROLE")
public class AuthGroupRoleEntity {
	@Id
	//@SequenceGenerator(name="AUTH_USER_USERID_GENERATOR", sequenceName="AUTH_USER_SEQ_ID", allocationSize=1)
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="AUTH_USER_USERID_GENERATOR")
	@Column(name="GROUP_ROLE_ID")
	private Long groupRoleId;
	
	@ManyToOne
	@JoinColumn(name="ROLE_ID")	
	private AuthRoleEntity authRole;
	
	@ManyToOne
	@JoinColumn(name="GROUP_ID")	
	private AuthGroupEntity authGroup;
	
	public AuthGroupRoleEntity() {
	}
	
	public Long getGroupRoleId() {
		return this.groupRoleId;
	}

	public void setGroupRoleId(Long groupRoleId) {
		this.groupRoleId = groupRoleId;
	}
	
	public AuthRoleEntity getAuthRole() {
		return authRole;
	}

	public void setAuthRole(AuthRoleEntity authRole) {
		this.authRole = authRole;
	}

	public AuthGroupEntity getAuthGroup() {
		return authGroup;
	}

	public void setAuthGroup(AuthGroupEntity authGroup) {
		this.authGroup = authGroup;
	}
	
//	public Long getRoleId() {
//		return this.roleId;
//	}
//
//	public void setRoleId(Long roleId) {
//		this.roleId = roleId;
//	}
//	
//	public Long getGroupId() {
//		return this.groupId;
//	}
//
//	public void setGroupId(Long groupId) {
//		this.groupId = groupId;
//	}
	
	
}
