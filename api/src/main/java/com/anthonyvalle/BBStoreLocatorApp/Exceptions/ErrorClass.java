package com.anthonyvalle.BBStoreLocatorApp.Exceptions;

import org.springframework.http.HttpStatus;

/**
 * Use as a base exception class
 */

public abstract class ErrorClass extends RuntimeException {

    private long statusCode;
    private HttpStatus httpStatus;


    public ErrorClass(long statusCode, HttpStatus httpStatus, String message) {
        this.statusCode = statusCode;
        this.httpStatus = httpStatus;
    }

    public ErrorClass(String message) {
        super(message);

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


}
