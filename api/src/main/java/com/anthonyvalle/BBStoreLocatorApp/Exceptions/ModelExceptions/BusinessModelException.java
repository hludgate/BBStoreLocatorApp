package com.anthonyvalle.BBStoreLocatorApp.Exceptions.ModelExceptions;

import com.anthonyvalle.BBStoreLocatorApp.Exceptions.ErrorClass;
import org.springframework.http.HttpStatus;

public class BusinessModelException extends ErrorClass {

    public BusinessModelException(String message) {
        super(message);
    }

    public BusinessModelException(long statusCode, HttpStatus httpStatus, String message) {
        super(statusCode, httpStatus, message);
    }
}
