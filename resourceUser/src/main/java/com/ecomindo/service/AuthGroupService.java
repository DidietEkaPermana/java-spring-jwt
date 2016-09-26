package com.ecomindo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecomindo.entity.AuthGroupEntity;
import com.ecomindo.entity.AuthGroupRoleEntity;
import com.ecomindo.entity.AuthUserEntity;
import com.ecomindo.entity.AuthUserGroupEntity;
import com.ecomindo.model.GroupDTO;
import com.ecomindo.model.RoleDTO;
import com.ecomindo.model.UserDTO;
import com.ecomindo.repository.AuthGroupRepository;
import com.ecomindo.repository.AuthGroupRoleRepository;
import com.ecomindo.repository.AuthRoleRepository;

@Service
public class AuthGroupService {
	@Autowired
	AuthGroupRepository authGroupRepository;
	
	@Autowired
	AuthGroupRoleRepository authGroupRoleRepository;
	
	@Autowired
	AuthRoleRepository authRoleRepository;
	
	public Iterable<AuthGroupEntity> findAll() {
		// TODO Auto-generated method stub
		return authGroupRepository.findAll();
	}
	
	public Page<AuthGroupEntity> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return authGroupRepository.findAll(pageable);
	}
	
	public GroupDTO find(Long id) {
		// TODO Auto-generated method stub
		GroupDTO data = new GroupDTO();
		
		AuthGroupEntity datadb = authGroupRepository.findOne(id);
		
		data.setGroupId(id);
		data.setGroupName(datadb.getGroupName());
		
		java.util.List<AuthGroupRoleEntity> datarole = authGroupRoleRepository.findByAuthGroupGroupId(id);
		
		List<RoleDTO> DTOroles = new ArrayList<RoleDTO>();
		
		for(AuthGroupRoleEntity role: datarole){
			RoleDTO DTOrole = new RoleDTO();
			DTOrole.setRoleId(role.getAuthRole().getRoleId());
			DTOrole.setRoleName(role.getAuthRole().getRoleName());
			DTOroles.add(DTOrole);
		}
		
		data.setRole(DTOroles);
		
		return data;
	}

	@Transactional
	public GroupDTO save(GroupDTO data) {
		// TODO Auto-generated method stub
		AuthGroupEntity dataEntity = new AuthGroupEntity();
		
		dataEntity.setGroupId(System.currentTimeMillis());
		dataEntity.setGroupName(data.getGroupName());
		
		dataEntity = authGroupRepository.save(dataEntity);
		
		for(RoleDTO DTOroles : data.getRole()){
			AuthGroupRoleEntity role = new AuthGroupRoleEntity();
			
			role.setGroupRoleId(System.currentTimeMillis());
			role.setAuthGroup(dataEntity);
			role.setAuthRole(authRoleRepository.findOne(DTOroles.getRoleId()));
			
			authGroupRoleRepository.save(role);
		}
		
		data.setGroupId(dataEntity.getGroupId());
		
		return data;
	}

	@Transactional
	public void delete(Long id) {
		// TODO Auto-generated method stub
		
		authGroupRoleRepository.delete(authGroupRoleRepository.findByAuthGroupGroupId(id));
		
		authGroupRepository.delete(id);
	}

	@Transactional
	public void update(GroupDTO data) {
		// TODO Auto-generated method stub
		
		AuthGroupEntity dataEntity = authGroupRepository.findOne(data.getGroupId());
		
		dataEntity.setGroupName(data.getGroupName());
		
		dataEntity = authGroupRepository.save(dataEntity);
		
		authGroupRoleRepository.delete(authGroupRoleRepository.findByAuthGroupGroupId(data.getGroupId()));
		
		for(RoleDTO DTOroles : data.getRole()){
			AuthGroupRoleEntity role = new AuthGroupRoleEntity();
			
			role.setGroupRoleId(System.currentTimeMillis());
			role.setAuthGroup(dataEntity);
			role.setAuthRole(authRoleRepository.findOne(DTOroles.getRoleId()));
			
			authGroupRoleRepository.save(role);
		}
	}

}
