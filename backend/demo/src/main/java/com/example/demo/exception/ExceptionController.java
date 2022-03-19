package com.example.demo.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(value = {BusinessException.class})
    private ResponseEntity<Object> handleBusinessException(BusinessException exception){
        return new ResponseEntity<>(exception , HttpStatus.BAD_REQUEST);
    }

}
