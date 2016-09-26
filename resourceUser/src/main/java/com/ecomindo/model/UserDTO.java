package com.ecomindo.model;

import java.util.List;

public class UserDTO {
	private Long userId;
	private String email;
	private String name;
	private String password; 
	
	private List<GroupDTO> groups;
	
	public UserDTO() {
	}
	
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<GroupDTO> getGroup() {
		return this.groups;
	}

	public void setGroup(List<GroupDTO> groups) {
		this.groups = groups;
	}
	
	/*private String login;
	private Date accountActiveDate;
	private Date accountExpiredDate;
	private Date accountInactiveDate;
	private String attribute1;
	private String attribute2;
	private String attribute3;
	private String attribute4;
	private String attribute5;
	private Date birthDate;
	private String birthPlace;
	private String createdBy;
	private Date createdDate;
	private String description;
	private BigDecimal failedLoginInARow;
	private String fax;
	private String firstName;
	private String hint;
	private String ipAddress;
	private String isLdapUser;
	private String lastName;
	private String lastUpdatedBy;
	private Date lastUpdatedDate;
	private String ldapUserId;
	private String mobile;
	private BigDecimal mustChangePassword;
	private Date nextChangePassword;
	private String phone;
	private String position;
	private Date registrationDate;
	private String status;

	public String getLogin() {
		return this.login;
	}
	
	public void setLogin(String login) {
		this.login = login;
	}

	public Date getAccountActiveDate() {
		return this.accountActiveDate;
	}

	public void setAccountActiveDate(Date accountActiveDate) {
		this.accountActiveDate = accountActiveDate;
	}

	public Date getAccountExpiredDate() {
		return this.accountExpiredDate;
	}

	public void setAccountExpiredDate(Date accountExpiredDate) {
		this.accountExpiredDate = accountExpiredDate;
	}

	public Date getAccountInactiveDate() {
		return this.accountInactiveDate;
	}

	public void setAccountInactiveDate(Date accountInactiveDate) {
		this.accountInactiveDate = accountInactiveDate;
	}

	public String getAttribute1() {
		return this.attribute1;
	}

	public void setAttribute1(String attribute1) {
		this.attribute1 = attribute1;
	}

	public String getAttribute2() {
		return this.attribute2;
	}

	public void setAttribute2(String attribute2) {
		this.attribute2 = attribute2;
	}

	public String getAttribute3() {
		return this.attribute3;
	}

	public void setAttribute3(String attribute3) {
		this.attribute3 = attribute3;
	}

	public String getAttribute4() {
		return this.attribute4;
	}

	public void setAttribute4(String attribute4) {
		this.attribute4 = attribute4;
	}

	public String getAttribute5() {
		return this.attribute5;
	}

	public void setAttribute5(String attribute5) {
		this.attribute5 = attribute5;
	}

	public Date getBirthDate() {
		return this.birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getBirthPlace() {
		return this.birthPlace;
	}

	public void setBirthPlace(String birthPlace) {
		this.birthPlace = birthPlace;
	}

	public String getCreatedBy() {
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

	public BigDecimal getFailedLoginInARow() {
		return this.failedLoginInARow;
	}

	public void setFailedLoginInARow(BigDecimal failedLoginInARow) {
		this.failedLoginInARow = failedLoginInARow;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String fax) {
		this.fax = fax;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getHint() {
		return this.hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public String getIpAddress() {
		return this.ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getIsLdapUser() {
		return this.isLdapUser;
	}

	public void setIsLdapUser(String isLdapUser) {
		this.isLdapUser = isLdapUser;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public String getLdapUserId() {
		return this.ldapUserId;
	}

	public void setLdapUserId(String ldapUserId) {
		this.ldapUserId = ldapUserId;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public BigDecimal getMustChangePassword() {
		return this.mustChangePassword;
	}

	public void setMustChangePassword(BigDecimal mustChangePassword) {
		this.mustChangePassword = mustChangePassword;
	}

	public Date getNextChangePassword() {
		return this.nextChangePassword;
	}

	public void setNextChangePassword(Date nextChangePassword) {
		this.nextChangePassword = nextChangePassword;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Date getRegistrationDate() {
		return this.registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}

	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
*/
}
