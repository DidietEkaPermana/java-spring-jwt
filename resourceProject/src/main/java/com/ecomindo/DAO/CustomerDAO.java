package com.ecomindo.DAO;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.ecomindo.model.CustomerDTO;

public class CustomerDAO {
	public List getCustomer(String custIds, String token) throws Exception{
		try{
			RestTemplate restTemplate = new RestTemplate();
			
			//CustomerDTO[] data = restTemplate.getForObject("http://localhost:8080/resourceCustomer/customers/ByListId?id=" + custIds, CustomerDTO[].class);
			
			HttpHeaders headers = new HttpHeaders();
			//headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
			headers.set("Authorization", token);

			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<CustomerDTO[]> response = restTemplate.exchange("http://localhost:8080/resourceCustomer/customers/ByListId?id=" + custIds, HttpMethod.GET, entity, CustomerDTO[].class);
			
			CustomerDTO[] data = response.getBody();
			
			return Arrays.asList(data);
		}
		catch(Exception e) {
			throw new Exception(e.getMessage());
		}
	}
}
