package com.tcs.hrms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tcs.hrms.dto.CustomerDTO;
import com.tcs.hrms.entity.Customer;
import com.tcs.hrms.exception.IBMBankException;
import com.tcs.hrms.repository.CustomerRepository;

@Service(value = "customerServiceImpl")
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Override
	public Integer addCustomer(CustomerDTO customerDTO) throws IBMBankException {
		
		Customer customerEntity = new Customer();
		customerEntity.setDateOfBirth(customerDTO.getDateOfBirth());
		customerEntity.setEmailId(customerDTO.getEmailId());
		customerEntity.setName(customerDTO.getName());
		customerEntity.setCustomerId(customerDTO.getCustomerId());
		Customer customerEntity2 = customerRepository.save(customerEntity);
		return customerEntity2.getCustomerId();
	}

	@Override
	public void updateCustomer(Integer customerId, String emailId) throws IBMBankException {
		Optional<Customer> customer = customerRepository.findById(customerId);
		Customer c = customer.orElseThrow(() -> new IBMBankException("Service.CUSTOMER_NOT_FOUND"));
		c.setEmailId(emailId);
		customerRepository.save(c);
	}
	
	@Override
	public List<CustomerDTO> getAllCustomers() throws IBMBankException {
		Iterable<Customer> customers = customerRepository.findAll();
		List<CustomerDTO> customerDTOs = new ArrayList<>();
		customers.forEach(customer -> {
			CustomerDTO cust = new CustomerDTO();
			cust.setCustomerId(customer.getCustomerId());
			cust.setDateOfBirth(customer.getDateOfBirth());
			cust.setEmailId(customer.getEmailId());
			cust.setName(customer.getName());
			customerDTOs.add(cust);
		});
		
		if (customerDTOs.isEmpty())
			throw new IBMBankException("Service.CUSTOMERS_NOT_FOUND");
		return customerDTOs;
	}
	
	@Override
	public CustomerDTO getCustomer(Integer customerId) throws IBMBankException {
		Optional<Customer> optional = customerRepository.findById(customerId);
		Customer customer = optional.orElseThrow(() -> new IBMBankException("Service.CUSTOMER_NOT_FOUND"));
		CustomerDTO customer2 = new CustomerDTO();
		customer2.setCustomerId(customer.getCustomerId());
		customer2.setDateOfBirth(customer.getDateOfBirth());
		customer2.setEmailId(customer.getEmailId());
		customer2.setName(customer.getName());
		return customer2;
	}
	
	@Override
	public void deleteCustomer(Integer customerId) throws IBMBankException {
		Optional<Customer> customer = customerRepository.findById(customerId);
		customer.orElseThrow(() -> new IBMBankException("Service.CUSTOMER_NOT_FOUND"));
		customerRepository.deleteById(customerId);
	}
	
}
