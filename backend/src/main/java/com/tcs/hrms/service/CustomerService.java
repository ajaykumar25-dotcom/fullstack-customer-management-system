package com.tcs.hrms.service;

import java.util.List;

import com.tcs.hrms.dto.CustomerDTO;
import com.tcs.hrms.exception.IBMBankException;

public interface CustomerService {
	
	public Integer addCustomer(CustomerDTO customerDTO) throws IBMBankException;
	public void updateCustomer(Integer customerId, String emailId)throws IBMBankException;
	public List<CustomerDTO> getAllCustomers() throws IBMBankException;
	public CustomerDTO getCustomer(Integer customerId) throws IBMBankException;
	public void deleteCustomer(Integer customerId)throws IBMBankException;
	
}
