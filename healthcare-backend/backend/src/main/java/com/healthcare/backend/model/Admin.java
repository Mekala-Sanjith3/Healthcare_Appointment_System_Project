package com.healthcare.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "admins")
public class Admin extends User {
    private String department;
    private String adminLevel;
    
    @PrePersist
    public void setDefaultRole() {
        setRole(UserRole.ADMIN);
    }
} 