package com.tcs.hrms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.tcs.hrms.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by username
    Optional<User> findByUsername(String username);

    // Optional: check if username already exists
    boolean existsByUsername(String username);
}
