package com.healthcare.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "patients")
public class Patient extends User {
    
    @Column(nullable = false)
    private String dateOfBirth;
    
    @Column(nullable = false)
    private String gender;
    
    private String bloodGroup;
    
    @Column(columnDefinition = "TEXT")
    private String medicalHistory;
    
    @PrePersist
    public void prePersist() {
        setRole(UserRole.PATIENT);
    }
    
    // Override toString to exclude password
    @Override
    public String toString() {
        return "Patient{" +
                "id=" + getId() +
                ", email='" + getEmail() + '\'' +
                ", fullName='" + getFullName() + '\'' +
                '}';
    }
} 