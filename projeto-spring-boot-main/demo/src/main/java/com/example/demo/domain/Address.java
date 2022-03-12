package com.example.demo.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Embeddable
public class Address {

    @Setter
    private String street;

    @Setter
    private String country;

}


