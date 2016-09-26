package com.ecomindo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecomindo.entity.AuthRoleEntity;
import com.ecomindo.model.RoleDTO;
import com.ecomindo.model.dataTableDTO;
import com.ecomindo.service.AuthRoleService;

@RestController
@RequestMapping("/Role")
public class AuthRoleAPI {
	@Autowired
	AuthRoleService authRoleService;
	
//	@GetMapping
//    public ResponseEntity getRole(
//            Pageable pageable)  {
//            //... do what needs to be done
//		
//		Page<AuthRoleEntity> data = authRoleService.findAll(pageable);
//		
//		return new ResponseEntity(data, HttpStatus.OK);
//    }
	
	@GetMapping
    public ResponseEntity getRole(int draw)  {
            //... do what needs to be done
		
		List data = (List)authRoleService.findAll();
		
		dataTableDTO dataObj = new dataTableDTO(draw, data.size(), data.size(), data, null);
		
		return new ResponseEntity(dataObj, HttpStatus.OK);
    }
	
	@PostMapping
    public ResponseEntity postRole(
    		@RequestBody RoleDTO data)  {
            //... do what needs to be done
		
		data = authRoleService.save(data);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity deleteRole(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		authRoleService.delete(id);
		
		return new ResponseEntity(id, HttpStatus.OK);
    }
	
	@PutMapping("/{id}")
    public ResponseEntity putRole(
    		@PathVariable Long id,
    		@RequestBody RoleDTO data)  {
            //... do what needs to be done
		
		data.setRoleId(id);
		authRoleService.update(data);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
}
