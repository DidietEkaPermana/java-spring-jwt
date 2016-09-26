package com.ecomindo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.ecomindo.entity.AuthRoleEntity;

public interface AuthRoleRepository extends PagingAndSortingRepository<AuthRoleEntity, Long> {

}
