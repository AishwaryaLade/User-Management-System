package com.ats.backend.usermanagement.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ats.backend.usermanagement.entity.UserManagement;
import com.ats.backend.usermanagement.service.UserManagementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserManagementController {

    private final UserManagementService userService;

    // Constructor injection
    public UserManagementController(UserManagementService userService) {
        this.userService = userService;
    }

    // 1. Add User
    @PostMapping
    public ResponseEntity<UserManagement> addUser(
            @Valid @RequestBody UserManagement user) {

        UserManagement savedUser = userService.addUser(user);

        return ResponseEntity.ok(savedUser);
    }

    // 2. Get All Users
    @GetMapping
    public ResponseEntity<List<UserManagement>> getAllUsers() {

        List<UserManagement> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    // 3. Get User By ID
    @GetMapping("/{id}")
    public ResponseEntity<UserManagement> getUserById(
            @PathVariable Long id) {

        UserManagement user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }

    // 4. Update User
    @PutMapping("/{id}")
    public ResponseEntity<UserManagement> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserManagement user) {

        UserManagement updatedUser =
                userService.updateUser(id, user);

        return ResponseEntity.ok(updatedUser);
    }

    // 5. Delete User
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok("User deleted successfully");
    }
}