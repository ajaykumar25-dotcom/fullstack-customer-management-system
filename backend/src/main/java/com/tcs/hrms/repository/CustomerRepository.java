package com.tcs.hrms.repository;

import org.springframework.data.repository.CrudRepository;

import com.tcs.hrms.entity.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {
	
}
