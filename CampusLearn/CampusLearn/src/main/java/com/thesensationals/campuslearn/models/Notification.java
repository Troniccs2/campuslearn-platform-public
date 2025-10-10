package com.thesensationals.campuslearn.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notification_id;

    private Long recipient_id; // FK to User
    private String channel; // 'email', 'sms', 'whatsapp'
    private String message;
    private Boolean delivered = false;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime sent_at = LocalDateTime.now();

    // Getters
    public Long getNotification_id() {
        return notification_id;
    }

    public Long getRecipient_id() {
        return recipient_id;
    }

    public String getChannel() {
        return channel;
    }

    public String getMessage() {
        return message;
    }

    public Boolean getDelivered() {
        return delivered;
    }

    public LocalDateTime getSent_at() {
        return sent_at;
    }

    // Setters
    public void setNotification_id(Long notification_id) {
        this.notification_id = notification_id;
    }

    public void setRecipient_id(Long recipient_id) {
        this.recipient_id = recipient_id;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setDelivered(Boolean delivered) {
        this.delivered = delivered;
    }

    public void setSent_at(LocalDateTime sent_at) {
        this.sent_at = sent_at;
    }
}
