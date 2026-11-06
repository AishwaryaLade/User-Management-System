package com.ats.backend.usermanagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ats.backend.usermanagement.entity.UserManagement;
import com.ats.backend.usermanagement.repository.UserManagementRepository;

@Service
public class UserManagementService {

    private final UserManagementRepository userRepository;

    // Constructor injection
    public UserManagementService(UserManagementRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 1. Add new user
    public UserManagement addUser(UserManagement user) {
        return userRepository.save(user);
    }

    // 2. Get all users
    public List<UserManagement> getAllUsers() {
        return userRepository.findAll();
    }

    // 3. Get user by ID
    public UserManagement getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 4. Update user
    public UserManagement updateUser(Long id, UserManagement updatedUser) {

        UserManagement existingUser = getUserById(id);

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());

        return userRepository.save(existingUser);
    }

    // 5. Delete user
    public void deleteUser(Long id) {

        UserManagement existingUser = getUserById(id);

        userRepository.delete(existingUser);
    }
}