package com.example.demo.domain;

import com.example.demo.domain.enums.Priority;
import com.example.demo.domain.enums.Situation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Task {

    @Id
    @Column(name = "id_task")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @NotNull
    private String name;

    @Setter
    @NotNull
    @Enumerated(EnumType.STRING)
    private Situation situation = Situation.TODO;

    @Setter
    @Enumerated(EnumType.STRING)
    @NotNull
    private Priority priority = Priority.NONE;

    @Setter
    @NotNull
    private Date inicialDate;

    @Setter
    @NotNull
    private Date endDate;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "id_user")
    private User user;

}
