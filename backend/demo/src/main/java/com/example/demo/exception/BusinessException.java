package com.example.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class BusinessException extends RuntimeException {

    @Setter
    @Getter
    private String message;

}
