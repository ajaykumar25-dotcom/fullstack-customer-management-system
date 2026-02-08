package com.tcs.hrms.controller;

import com.tcs.hrms.dto.UserDTO;
import com.tcs.hrms.exception.IBMBankException;
import com.tcs.hrms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")  // Allow React frontend to access backend
public class UserController {

    @Autowired
    private UserService userService;

    // ---------------- Register API ----------------
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        try {
            String message = userService.registerUser(userDTO);
            return ResponseEntity.ok(Collections.singletonMap("message", message));
        } catch (IBMBankException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("errorMessage", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("errorMessage", "Something went wrong during registration."));
        }
    }

    // ---------------- Login API ----------------
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO) {
        try {
            String message = userService.loginUser(userDTO);
            return ResponseEntity.ok(Collections.singletonMap("message", message));
        } catch (IBMBankException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("errorMessage", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("errorMessage", "Something went wrong during login."));
        }
    }
}
