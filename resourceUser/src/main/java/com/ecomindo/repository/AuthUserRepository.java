package com.ecomindo.repository;

//import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
//import org.springframework.data.repository.query.Param;

import com.ecomindo.entity.AuthUserEntity;

public interface AuthUserRepository extends PagingAndSortingRepository<AuthUserEntity, Long> {
	
	//List<authUserEntity> findByCriteria(@Param("firstName") String firstName, @Param("login") String login, @Param("status") String status);
}
