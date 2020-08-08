package com.anthonyvalle.BBStoreLocatorApp.Exceptions;

import org.springframework.http.HttpStatus;

public class ErrorClass {

    private long statusCode;
    private HttpStatus httpStatus;
    private String message;

    public ErrorClass(long statusCode, HttpStatus httpStatus, String message) {
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public ErrorClass() {
    }

    public long getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(long statusCode) {
        this.statusCode = statusCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
