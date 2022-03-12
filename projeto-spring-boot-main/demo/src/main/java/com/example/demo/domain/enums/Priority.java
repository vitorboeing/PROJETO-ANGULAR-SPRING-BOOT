package com.example.demo.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Priority {

    NONE("None"),
    LOW("Low"),
    HIGH("High");

    private final String description;

}
