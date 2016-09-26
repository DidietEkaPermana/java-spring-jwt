package com.ecomindo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.ecomindo.entity.CustomerEntity;
import com.ecomindo.model.CustomerDTO;
import com.ecomindo.model.dataTableDTO;
import com.ecomindo.repository.CustomerRepository;

@RestController
@RequestMapping("/customers")
public class CustomerController {
	@Autowired
	private CustomerRepository customerRepository;
	
	@GetMapping
    public ResponseEntity getCustomer(int draw)  {
            //... do what needs to be done
		
		List<CustomerDTO> listData = new ArrayList<CustomerDTO>();
		
		for(CustomerEntity entity : customerRepository.findAll()){
			listData.add(new CustomerDTO(entity.getId(), entity.getFirstName(), entity.getLastName(), entity.getEmail(), entity.getMobile()));
		}
		
		dataTableDTO data = new dataTableDTO(draw, listData.size(), listData.size(), listData, null);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity getCustomer(@PathVariable("id") Long id) throws Exception {

		CustomerEntity customer = customerRepository.findOne(id);
		
		if (customer == null) {
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		}
		
		CustomerDTO data = new CustomerDTO(customer.getId(), customer.getFirstName(), customer.getLastName(), customer.getEmail(), customer.getMobile());

		return new ResponseEntity(data, HttpStatus.OK);
	}
	
	@GetMapping("/ByListId")
	public ResponseEntity getCustomersByListId(String id) throws Exception {

		List<CustomerDTO> listData = new ArrayList<CustomerDTO>();
		List<Long> lId = new ArrayList<Long>(); 
		for(String sId: id.split(",")){
			lId.add(Long.parseLong(sId));
		}
		
		for(CustomerEntity entity : customerRepository.findAll(lId)){
			listData.add(new CustomerDTO(entity.getId(), entity.getFirstName(), entity.getLastName(), entity.getEmail(), entity.getMobile()));
		}
		
		
		return new ResponseEntity(listData, HttpStatus.OK);
	}
	
	@PostMapping
    public ResponseEntity postCustomer(
    		@RequestBody CustomerDTO data)  {
            //... do what needs to be done
		
		CustomerEntity custEntity = new CustomerEntity();
		
		custEntity.setId(System.currentTimeMillis());
		custEntity.setEmail(data.getEmail());
		custEntity.setFirstName(data.getFirstName());
		custEntity.setLastName(data.getLastName());
		custEntity.setMobile(data.getMobile());
		
		customerRepository.save(custEntity);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity deleteCustomer(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		customerRepository.delete(id);
		
		return new ResponseEntity(id, HttpStatus.OK);
    }
	
	@PutMapping("/{id}")
    public ResponseEntity putCustomer(
    		@PathVariable Long id,
    		@RequestBody CustomerDTO data)  {
            //... do what needs to be done
		
		CustomerEntity custEntity = customerRepository.findOne(id);
		
		if (null == custEntity) {
			return new ResponseEntity("No Customer found for ID " + id, HttpStatus.NOT_FOUND);
		}
		
		custEntity.setEmail(data.getEmail());
		custEntity.setFirstName(data.getFirstName());
		custEntity.setLastName(data.getLastName());
		custEntity.setMobile(data.getMobile());
		
		customerRepository.save(custEntity);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
}
