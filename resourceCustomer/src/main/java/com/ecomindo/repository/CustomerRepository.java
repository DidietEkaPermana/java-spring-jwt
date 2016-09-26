package com.ecomindo.repository;

import org.springframework.data.repository.CrudRepository;

import com.ecomindo.entity.CustomerEntity;

public interface CustomerRepository extends CrudRepository<CustomerEntity, Long> {

}
