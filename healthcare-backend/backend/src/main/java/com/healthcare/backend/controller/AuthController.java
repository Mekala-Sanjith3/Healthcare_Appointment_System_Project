package com.healthcare.backend.controller;

import com.healthcare.backend.dto.AuthRequest;
import com.healthcare.backend.dto.AuthResponse;
import com.healthcare.backend.model.Admin;
import com.healthcare.backend.model.Doctor;
import com.healthcare.backend.model.Patient;
import com.healthcare.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/patient/register")
    public ResponseEntity<?> registerPatient(@RequestBody Patient patient) {
        try {
            log.info("Received registration request for: {}", patient.getEmail());
            AuthResponse response = authService.registerPatient(patient);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/doctor/register")
    public ResponseEntity<AuthResponse> registerDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(authService.registerDoctor(doctor));
    }

    @PostMapping("/admin/register")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody Admin admin) {
        return ResponseEntity.ok(authService.registerAdmin(admin));
    }

    @PostMapping("/patient/login")
    public ResponseEntity<?> loginPatient(@RequestBody AuthRequest request) {
        try {
            log.info("Received login request for: {}", request.getEmail());
            AuthResponse response = authService.loginPatient(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/doctor/login")
    public ResponseEntity<AuthResponse> loginDoctor(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginDoctor(request));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<AuthResponse> loginAdmin(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginAdmin(request));
    }
} 