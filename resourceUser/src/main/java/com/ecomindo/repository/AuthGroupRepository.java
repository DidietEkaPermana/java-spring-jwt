package com.ecomindo.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.ecomindo.entity.AuthGroupEntity;

public interface AuthGroupRepository extends PagingAndSortingRepository<AuthGroupEntity, Long> {
	
}
