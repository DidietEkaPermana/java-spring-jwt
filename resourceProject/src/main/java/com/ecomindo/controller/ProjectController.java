package com.ecomindo.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecomindo.DAO.CustomerDAO;
import com.ecomindo.entity.ProjectEntity;
import com.ecomindo.model.CustomerDTO;
import com.ecomindo.model.ProjectDTO;
import com.ecomindo.model.dataTableDTO;
import com.ecomindo.repository.ProjectRepository;

@RestController
@RequestMapping("/projects")
public class ProjectController {
	@Autowired
	private ProjectRepository projectRepository;
	
	@GetMapping
    public ResponseEntity getProject(HttpServletRequest request, int draw) throws Exception  {
            //... do what needs to be done
		
		List objProj = (List) projectRepository.findAll();
		
		List<String> slist = new ArrayList();
		for(ProjectEntity d : (List<ProjectEntity>)objProj){
			slist.add(String.valueOf(d.getCustomerId()));
		}
		String listCustId = StringUtils.collectionToCommaDelimitedString(slist);
		
		List<CustomerDTO> objCust = (new CustomerDAO()).getCustomer(listCustId, request.getHeader("Authorization"));
		
		List<ProjectDTO> objProjDTO = new ArrayList();
		
		for(ProjectEntity d : (List<ProjectEntity>)objProj){
			String name = "";
			for(CustomerDTO c : objCust){
				if(c.getId() == d.getCustomerId()){
					name = c.getFirstName() + " " + c.getLastName();
				}
			}
			
			objProjDTO.add(new ProjectDTO(d.getId(), d.getCustomerId(), name, d.getName(), d.getType()));
		}
		
		dataTableDTO data = new dataTableDTO(draw, objProjDTO.size(), objProjDTO.size(), objProjDTO, null);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity getProject(@PathVariable("id") Long id) throws Exception {

		ProjectEntity project = projectRepository.findOne(id);
		
		if (project == null) {
			return new ResponseEntity("No Project found for ID " + id, HttpStatus.NOT_FOUND);
		}
		
		ProjectDTO data = new ProjectDTO(project.getId(), project.getCustomerId(), null, project.getName(), project.getType());

		return new ResponseEntity(data, HttpStatus.OK);
	}
	
	@PostMapping
    public ResponseEntity postProject(
    		@RequestBody ProjectDTO data)  {
            //... do what needs to be done
		
		ProjectEntity projEntity = new ProjectEntity();
		
		projEntity.setId(System.currentTimeMillis());
		projEntity.setCustomerId(data.getCustomerId());
		projEntity.setName(data.getName());
		projEntity.setType(data.getType());
		
		projectRepository.save(projEntity);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
	
	@DeleteMapping("/{id}")
    public ResponseEntity deleteProject(
    		@PathVariable Long id)  {
            //... do what needs to be done
		
		projectRepository.delete(id);
		
		return new ResponseEntity(id, HttpStatus.OK);
    }
	
	@PutMapping("/{id}")
    public ResponseEntity putProject(
    		@PathVariable Long id,
    		@RequestBody ProjectDTO data)  {
            //... do what needs to be done
		
		ProjectEntity projEntity = projectRepository.findOne(id);
		
		if (null == projEntity) {
			return new ResponseEntity("No Project found for ID " + id, HttpStatus.NOT_FOUND);
		}
		
		projEntity.setName(data.getName());
		projEntity.setCustomerId(data.getCustomerId());
		projEntity.setType(data.getType());
		
		projectRepository.save(projEntity);
		
		return new ResponseEntity(data, HttpStatus.OK);
    }
}
