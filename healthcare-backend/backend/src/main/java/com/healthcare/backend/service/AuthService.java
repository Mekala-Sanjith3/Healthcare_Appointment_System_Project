package com.healthcare.backend.service;

import com.healthcare.backend.dto.AuthRequest;
import com.healthcare.backend.dto.AuthResponse;
import com.healthcare.backend.model.Admin;
import com.healthcare.backend.model.Doctor;
import com.healthcare.backend.model.Patient;
import com.healthcare.backend.repository.AdminRepository;
import com.healthcare.backend.repository.DoctorRepository;
import com.healthcare.backend.repository.PatientRepository;
import com.healthcare.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthResponse registerPatient(Patient patient) {
        log.info("Registering new patient with email: {}", patient.getEmail());
        
        if (patientRepository.existsByEmail(patient.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Print the original password for debugging
        log.debug("Original password length: {}", patient.getPassword().length());
        
        // Encode password
        String encodedPassword = passwordEncoder.encode(patient.getPassword());
        patient.setPassword(encodedPassword);
        
        // Print encoded password for debugging
        log.debug("Encoded password length: {}", encodedPassword.length());
        
        Patient savedPatient = patientRepository.save(patient);
        
        // Create a DTO without sensitive information
        Patient patientDto = new Patient();
        BeanUtils.copyProperties(savedPatient, patientDto);
        patientDto.setPassword(null); // Don't send password back to client
        
        String token = jwtUtil.generateToken(
            new org.springframework.security.core.userdetails.User(
                savedPatient.getEmail(),
                savedPatient.getPassword(),
                new ArrayList<>()
            )
        );
        
        log.info("Patient registered successfully: {}", patient.getEmail());
        return new AuthResponse(token, "PATIENT", patientDto);
    }

    public AuthResponse registerDoctor(Doctor doctor) {
        if (doctorRepository.existsByEmail(doctor.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        doctor.setPassword(passwordEncoder.encode(doctor.getPassword()));
        Doctor savedDoctor = doctorRepository.save(doctor);
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                savedDoctor.getEmail(),
                savedDoctor.getPassword(),
                new ArrayList<>()));

        return new AuthResponse(token, "DOCTOR", savedDoctor);
    }

    public AuthResponse registerAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Admin savedAdmin = adminRepository.save(admin);
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                savedAdmin.getEmail(),
                savedAdmin.getPassword(),
                new ArrayList<>()));

        return new AuthResponse(token, "ADMIN", savedAdmin);
    }

    public AuthResponse loginPatient(AuthRequest request) {
        log.info("Attempting login for patient: {}", request.getEmail());
        
        Patient patient = patientRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Patient not found"));
        
        // Print passwords for debugging
        log.debug("Provided password length: {}", request.getPassword().length());
        log.debug("Stored password length: {}", patient.getPassword().length());
        
        if (!passwordEncoder.matches(request.getPassword(), patient.getPassword())) {
            log.error("Password match failed for user: {}", request.getEmail());
            throw new RuntimeException("Invalid password");
        }
        
        // Create a DTO without sensitive information
        Patient patientDto = new Patient();
        BeanUtils.copyProperties(patient, patientDto);
        patientDto.setPassword(null); // Don't send password back to client
        
        String token = jwtUtil.generateToken(
            new org.springframework.security.core.userdetails.User(
                patient.getEmail(),
                patient.getPassword(),
                new ArrayList<>()
            )
        );
        
        log.info("Patient logged in successfully: {}", request.getEmail());
        return new AuthResponse(token, "PATIENT", patientDto);
    }

    public AuthResponse loginDoctor(AuthRequest request) {
        authenticate(request.getEmail(), request.getPassword());
        Doctor doctor = doctorRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                doctor.getEmail(),
                doctor.getPassword(),
                new ArrayList<>()));

        return new AuthResponse(token, "DOCTOR", doctor);
    }

    public AuthResponse loginAdmin(AuthRequest request) {
        authenticate(request.getEmail(), request.getPassword());
        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        String token = jwtUtil.generateToken(new org.springframework.security.core.userdetails.User(
                admin.getEmail(),
                admin.getPassword(),
                new ArrayList<>()));

        return new AuthResponse(token, "ADMIN", admin);
    }

    private void authenticate(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
    }
} 