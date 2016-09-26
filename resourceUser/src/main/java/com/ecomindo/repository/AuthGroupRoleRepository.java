package com.ecomindo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ecomindo.entity.AuthGroupRoleEntity;

public interface AuthGroupRoleRepository extends CrudRepository<AuthGroupRoleEntity, Long> {
	List<AuthGroupRoleEntity> findByAuthGroupGroupId(@Param("groupId") Long groupId);
}
