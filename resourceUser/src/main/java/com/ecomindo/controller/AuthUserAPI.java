package com.ecomindo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecomindo.entity.AuthUserEntity;
import com.ecomindo.model.UserDTO;
import com.ecomindo.model.dataTableDTO;
import com.ecomindo.service.AuthUserService;

@RestController
@RequestMapping("/User")
//@PreAuthorize("hasAuthority('Admin')")
public class AuthUserAPI {
	@Autowired
	AuthUserService authUserService;
	
//	@GetMapping
//    public ResponseEntity getUser(
//            Pageable pageable)  {
//            //... do what needs to be done
//		
//		Page<AuthUserEntity> data = authUserService.findAll(pageable);
//		
//		return new ResponseEntity(data, HttpStatus.OK);
//    }
	
	@GetMapping
	//@PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity getUser(int draw)  {
            //... do what needs to be done
		
		List data = (List) authUserService.findAll();
		
		dataTableDTO dataObj = new dataTableDTO(draw, data.size(), data.size(), data, null);
		
		return new ResponseEntity(dataObj, HttpStatus.OK);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity getUser(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		UserDTO data = authUserService.find(id);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@PostMapping
    public ResponseEntity postCustomer(
    		@RequestBody UserDTO data)  {
            //... do what needs to be done
		
		data = authUserService.save(data);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity deleteCustomer(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		authUserService.delete(id);
		
		return new ResponseEntity(id, HttpStatus.OK);
    }
	
	@PutMapping("/{id}")
    public ResponseEntity putCustomer(
    		@PathVariable Long id,
    		@RequestBody UserDTO data)  {
            //... do what needs to be done
		
		data.setUserId(id);
		authUserService.update(data);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
}
