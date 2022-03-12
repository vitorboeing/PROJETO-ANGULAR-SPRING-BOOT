package com.example.demo.domain;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Entity
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Provider implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name ="id_provider")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @NotNull
    private Long code;

    @Setter
    @NotNull
    private String name;

    @Setter
    private String email;

    @Setter
    private String description;

    @Setter
    private String street;

    @Setter
    private String state;

    @Setter
    private String country;

    @Setter
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @Setter
    @OneToMany(
            mappedBy = "provider",
            cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            orphanRemoval = true
    )

    private List<Contact> contactList;

    public void setContactList(List<Contact> contactList) {
        if(!contactList.isEmpty())
            contactList.forEach(e -> e.setProvider(this));

        this.contactList = contactList;
    }

}

