package com.ecomindo.repository;

import org.springframework.data.repository.CrudRepository;

import com.ecomindo.entity.ProjectEntity;

public interface ProjectRepository extends CrudRepository<ProjectEntity, Long> {

}
