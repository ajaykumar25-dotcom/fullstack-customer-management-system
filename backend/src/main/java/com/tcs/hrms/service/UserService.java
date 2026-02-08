package com.tcs.hrms.service;

import com.tcs.hrms.dto.UserDTO;
import com.tcs.hrms.exception.IBMBankException;

public interface UserService {

    String registerUser(UserDTO userDTO) throws IBMBankException;

    String loginUser(UserDTO userDTO) throws IBMBankException;
}
