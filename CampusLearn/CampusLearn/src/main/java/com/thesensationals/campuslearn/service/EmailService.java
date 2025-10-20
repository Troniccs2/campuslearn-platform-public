package com.thesensationals.campuslearn.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    // Injects the frontend URL from application.properties
    @Value("${frontend.url}")
    private String frontendUrl;

    // NO LOMBOK: Manual Constructor Injection is used here
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String userEmail, String token) {
        // Construct the full URL for the frontend
        String resetLink = frontendUrl + "/auth/reset-password?token=" + token + "&email=" + userEmail;

        SimpleMailMessage message = new SimpleMailMessage();
        
        // Sender should match your spring.mail.username property
        message.setTo(userEmail);
        message.setSubject("CampusLearn Password Reset Request");
        
        String emailContent = "Hello,\n\n"
                + "A password reset was requested for your CampusLearn account. Please click the link below to set a new password:\n\n" 
                + resetLink
                + "\n\nIf you did not request a password reset, please ignore this email."
                + "\n\nThis link will expire soon."
                + "\n\nThank you, \nThe CampusLearn Team";
        
        message.setText(emailContent);
        
        // Send the email in a separate thread to prevent HTTP request delays
        new Thread(() -> {
            try {
                mailSender.send(message);
            } catch (Exception e) {
                // Log or handle the failure gracefully
                System.err.println("Failed to send password reset email to " + userEmail + ": " + e.getMessage());
            }
        }).start();
    }
}