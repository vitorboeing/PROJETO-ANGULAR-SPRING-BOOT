package com.example.demo.domain;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Product implements Serializable {

    @Id
    @Column(name = "id_product")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @NotNull
    private String code;

    @Setter
    @NotNull
    private String name;

    @OneToMany(
            mappedBy = "product"
    )
    private List<Provider> providerList = new ArrayList<>();

    public void setName(String name){
        this.name = name.trim();
    }

}
