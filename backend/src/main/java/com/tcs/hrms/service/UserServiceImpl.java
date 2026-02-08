package com.tcs.hrms.service;

import com.tcs.hrms.dto.UserDTO;
import com.tcs.hrms.entity.User;
import com.tcs.hrms.exception.IBMBankException;
import com.tcs.hrms.repository.UserRepository;
import com.tcs.hrms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public String registerUser(UserDTO userDTO) throws IBMBankException {
        // Check if username already exists
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new IBMBankException("Username already exists!");
        }

        // Encrypt password before saving
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        User user = new User(userDTO.getUsername(), encodedPassword);

        userRepository.save(user);
        return "User registered successfully!";
    }

    @Override
    public String loginUser(UserDTO userDTO) throws IBMBankException {
        Optional<User> userOptional = userRepository.findByUsername(userDTO.getUsername());

        if (!userOptional.isPresent()) {
            throw new IBMBankException("Invalid username or password!");
        }

        User user = userOptional.get();

        // Match raw password with encoded password
        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
            throw new IBMBankException("Invalid username or password!");
        }

        return "Login successful!";
    }
}
