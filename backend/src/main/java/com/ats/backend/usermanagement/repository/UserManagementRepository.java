package com.ats.backend.usermanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ats.backend.usermanagement.entity.UserManagement;

@Repository
public interface UserManagementRepository extends JpaRepository<UserManagement, Long> {

}