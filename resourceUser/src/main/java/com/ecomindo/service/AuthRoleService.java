package com.ecomindo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ecomindo.entity.AuthGroupEntity;
import com.ecomindo.entity.AuthRoleEntity;
import com.ecomindo.model.GroupDTO;
import com.ecomindo.model.RoleDTO;
import com.ecomindo.repository.AuthRoleRepository;

@Service
public class AuthRoleService {
	@Autowired
	AuthRoleRepository authRoleRepository;
	
	public Iterable<AuthRoleEntity> findAll() {
		// TODO Auto-generated method stub
		return authRoleRepository.findAll();
	}
	
	public Page<AuthRoleEntity> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return authRoleRepository.findAll(pageable);
	}

	public RoleDTO save(RoleDTO data) {
		// TODO Auto-generated method stub
		AuthRoleEntity dataEntity = new AuthRoleEntity();
		
		dataEntity.setRoleId(System.currentTimeMillis());
		dataEntity.setRoleName(data.getRoleName());
		
		dataEntity = authRoleRepository.save(dataEntity);
		
		data.setRoleId(dataEntity.getRoleId());
		
		return data;
	}

	public void delete(Long id) {
		// TODO Auto-generated method stub
		authRoleRepository.delete(id);
	}

	public void update(RoleDTO data) {
		// TODO Auto-generated method stub
		
		AuthRoleEntity dataEntity = authRoleRepository.findOne(data.getRoleId());
		
		dataEntity.setRoleName(data.getRoleName());
		
		dataEntity = authRoleRepository.save(dataEntity);
	}

}
