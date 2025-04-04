package com.healthcare.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "doctors")
public class Doctor extends User {
    private String specialization;
    private String licenseNumber;
    private String experience;
    private String education;
    private boolean isAvailable;
    
    @PrePersist
    public void setDefaultRole() {
        setRole(UserRole.DOCTOR);
    }
} 