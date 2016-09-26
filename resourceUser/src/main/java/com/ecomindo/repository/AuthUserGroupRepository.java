package com.ecomindo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.ecomindo.entity.AuthUserGroupEntity;

public interface AuthUserGroupRepository extends CrudRepository<AuthUserGroupEntity, Long> {
	List<AuthUserGroupEntity> findByAuthUserUserId(@Param("userId") Long userId);
}
