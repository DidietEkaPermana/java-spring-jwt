package com.ecomindo.entity;

import javax.persistence.*;

@Entity
@Table(name = "AUTH_GROUP")
public class AuthGroupEntity {
	@Id
	//@SequenceGenerator(name="AUTH_GROUP_GROUPID_GENERATOR", sequenceName="AUTH_GROUP_SEQ_ID", allocationSize=1)
	//@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="AUTH_GROUP_GROUPID_GENERATOR")
	@Column(name="GROUP_ID")
	private Long groupId;

	@Column(name="GROUP_NAME")
	private String groupName;

	/*@Column(name="CREATED_BY")
	private String createdBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	private String description;

	@Column(name="LAST_UPDATED_BY")
	private String lastUpdatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="LAST_UPDATED_DATE")
	private Date lastUpdatedDate;

	private String status;*/

	public AuthGroupEntity() {
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

	/*public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLastUpdatedBy() {
		return this.lastUpdatedBy;
	}

	public void setLastUpdatedBy(String lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}

	public Date getLastUpdatedDate() {
		return this.lastUpdatedDate;
	}

	public void setLastUpdatedDate(Date lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "AuthGroup [groupId=" + groupId + ", groupName=" + groupName + ", createdBy=" + createdBy
				+ ", createdDate=" + createdDate + ", description=" + description + ", lastUpdatedBy=" + lastUpdatedBy
				+ ", lastUpdatedDate=" + lastUpdatedDate + ", status=" + status + "]";
	}
*/
}
