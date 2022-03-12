package com.example.demo.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Situation {

    TODO("ToDo"),
    DOING("Doing"),
    DONE("Done");

    private final String description;

}
