package com.arunpandian.portfolio.dto;

import java.time.OffsetDateTime;

public class ContactResponse {

    private boolean success;
    private String message;
    private Long id;
    private OffsetDateTime timestamp;

    public ContactResponse() {
    }

    public ContactResponse(boolean success, String message, Long id, OffsetDateTime timestamp) {
        this.success = success;
        this.message = message;
        this.id = id;
        this.timestamp = timestamp;
    }

    public static ContactResponse success(String message, Long id) {
        return new ContactResponse(true, message, id, OffsetDateTime.now());
    }

    public static ContactResponse error(String message) {
        return new ContactResponse(false, message, null, OffsetDateTime.now());
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OffsetDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(OffsetDateTime timestamp) {
        this.timestamp = timestamp;
    }
}

