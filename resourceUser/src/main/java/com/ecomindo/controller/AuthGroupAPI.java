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

import com.ecomindo.entity.AuthGroupEntity;
import com.ecomindo.model.GroupDTO;
import com.ecomindo.model.dataTableDTO;
import com.ecomindo.service.AuthGroupService;

@RestController
@RequestMapping("/Group")
public class AuthGroupAPI {
	@Autowired
	AuthGroupService authGroupService;
	
//	@GetMapping
//    public ResponseEntity getRole(
//            Pageable pageable)  {
//            //... do what needs to be done
//		
//		Page<AuthGroupEntity> data = authGroupService.findAll(pageable);
//		
//		return new ResponseEntity(data, HttpStatus.OK);
//    }
	
	@GetMapping
    public ResponseEntity getRole(int draw)  {
            //... do what needs to be done
		
		List data = (List)authGroupService.findAll();
		
		dataTableDTO dataObj = new dataTableDTO(draw, data.size(), data.size(), data, null);
		
		return new ResponseEntity(dataObj, HttpStatus.OK);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity getRole(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		GroupDTO data = authGroupService.find(id);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@PostMapping
    public ResponseEntity postCustomer(
    		@RequestBody GroupDTO data)  {
            //... do what needs to be done
		
		data = authGroupService.save(data);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity deleteCustomer(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		authGroupService.delete(id);
		
		return new ResponseEntity(id, HttpStatus.OK);
    }
	
	@PutMapping("/{id}")
    public ResponseEntity putCustomer(
    		@PathVariable Long id,
    		@RequestBody GroupDTO data)  {
            //... do what needs to be done
		
		data.setGroupId(id);
		authGroupService.update(data);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
}
