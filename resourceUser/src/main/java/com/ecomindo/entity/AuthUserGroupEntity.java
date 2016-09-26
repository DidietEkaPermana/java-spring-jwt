package com.ecomindo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="AUTH_USER_GROUP")
public class AuthUserGroupEntity {
	
	@Id
	//@SequenceGenerator(name="AUTH_USER_USERID_GENERATOR", sequenceName="AUTH_USER_SEQ_ID", allocationSize=1)
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="AUTH_USER_USERID_GENERATOR")
	@Column(name="USER_GROUP_ID")
	private Long userGroupId;
	
	@ManyToOne
	@JoinColumn(name="USER_ID")	
	private AuthUserEntity authUser;
	
	@ManyToOne
	@JoinColumn(name="GROUP_ID")	
	private AuthGroupEntity authGroup;
	
	public AuthUserGroupEntity() {
	}
	
	public Long getUserGroupId() {
		return this.userGroupId;
	}

	public void setUserGroupId(Long userGroupId) {
		this.userGroupId = userGroupId;
	}
	
	public AuthUserEntity getAuthUser() {
		return authUser;
	}

	public void setAuthUser(AuthUserEntity authUser) {
		this.authUser = authUser;
	}

	public AuthGroupEntity getAuthGroup() {
		return authGroup;
	}

	public void setAuthGroup(AuthGroupEntity authGroup) {
		this.authGroup = authGroup;
	}
}
