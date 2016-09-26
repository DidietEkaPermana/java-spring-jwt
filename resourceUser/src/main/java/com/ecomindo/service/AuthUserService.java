package com.ecomindo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecomindo.entity.AuthUserEntity;
import com.ecomindo.entity.AuthUserGroupEntity;
import com.ecomindo.model.GroupDTO;
import com.ecomindo.model.UserDTO;
import com.ecomindo.repository.AuthGroupRepository;
import com.ecomindo.repository.AuthUserGroupRepository;
import com.ecomindo.repository.AuthUserRepository;

@Service
public class AuthUserService {
	@Autowired
	private AuthUserRepository authUserRepository;
	
	@Autowired
	private AuthUserGroupRepository authUserGroupRepository;
	
	@Autowired
	private AuthGroupRepository authGroupRepository;

	public List<UserDTO> findAll() {
		// TODO Auto-generated method stub
		
		List<UserDTO> lData = new ArrayList<UserDTO>();
		
		for(AuthUserEntity lUser : authUserRepository.findAll()){
			
			UserDTO data = new UserDTO();
			
			data.setUserId(lUser.getUserId());
			data.setName(lUser.getName());
			data.setEmail(lUser.getEmail());
			data.setPassword(lUser.getPassword());
			
			List<AuthUserGroupEntity> datagroup = authUserGroupRepository.findByAuthUserUserId(lUser.getUserId());
			
			List<GroupDTO> DTOgroups = new ArrayList<GroupDTO>();
			
			for(AuthUserGroupEntity group: datagroup){
				GroupDTO DTOgroup = new GroupDTO();
				DTOgroup.setGroupId(group.getAuthGroup().getGroupId());
				DTOgroup.setGroupName(group.getAuthGroup().getGroupName());
				DTOgroups.add(DTOgroup);
			}
			
			data.setGroup(DTOgroups);
			
			lData.add(data);
		}
		
		return lData;
	}
	
	public Page<AuthUserEntity> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return authUserRepository.findAll(pageable);
	}
	
	public UserDTO find(Long id) {
		// TODO Auto-generated method stub
		
		UserDTO data = new UserDTO();
		
		AuthUserEntity datadb = authUserRepository.findOne(id);
		
		data.setUserId(id);
		data.setName(datadb.getName());
		data.setEmail(datadb.getEmail());
		data.setPassword(datadb.getPassword());
		
		java.util.List<AuthUserGroupEntity> datagroup = authUserGroupRepository.findByAuthUserUserId(id);
		
		List<GroupDTO> DTOgroups = new ArrayList<GroupDTO>();
		
		for(AuthUserGroupEntity group: datagroup){
			GroupDTO DTOgroup = new GroupDTO();
			DTOgroup.setGroupId(group.getAuthGroup().getGroupId());
			DTOgroup.setGroupName(group.getAuthGroup().getGroupName());
			DTOgroups.add(DTOgroup);
		}
		
		data.setGroup(DTOgroups);
		
		return data;
	}

	@Transactional
	public UserDTO save(UserDTO data) {
		// TODO Auto-generated method stub
		AuthUserEntity dataEntity = new AuthUserEntity();
		
		dataEntity.setUserId(System.currentTimeMillis());
		dataEntity.setName(data.getName());
		dataEntity.setEmail(data.getEmail());
		dataEntity.setPassword(data.getPassword());
		
		dataEntity = authUserRepository.save(dataEntity);
		
		for(GroupDTO DTOgroups : data.getGroup()){
			AuthUserGroupEntity group = new AuthUserGroupEntity();
			
			group.setUserGroupId(System.currentTimeMillis());
			group.setAuthUser(dataEntity);
			group.setAuthGroup(authGroupRepository.findOne(DTOgroups.getGroupId()));
			
			authUserGroupRepository.save(group);
		}
		
		
		data.setUserId(dataEntity.getUserId());
		
		return data;
	}

	@Transactional
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
		authUserGroupRepository.delete(authUserGroupRepository.findByAuthUserUserId(id));
		
		authUserRepository.delete(id);
	}

	@Transactional
	public void update(UserDTO data) {
		// TODO Auto-generated method stub
		
		AuthUserEntity dataEntity = authUserRepository.findOne(data.getUserId());
		
		dataEntity.setName(data.getName());
		dataEntity.setEmail(data.getEmail());
		dataEntity.setPassword(data.getPassword());
		
		dataEntity = authUserRepository.save(dataEntity);
		
		authUserGroupRepository.delete(authUserGroupRepository.findByAuthUserUserId(data.getUserId()));
		
		for(GroupDTO DTOgroups : data.getGroup()){
			AuthUserGroupEntity group = new AuthUserGroupEntity();
			
			group.setUserGroupId(System.currentTimeMillis());
			group.setAuthUser(dataEntity);
			group.setAuthGroup(authGroupRepository.findOne(DTOgroups.getGroupId()));
			
			authUserGroupRepository.save(group);
		}
	}	
}
