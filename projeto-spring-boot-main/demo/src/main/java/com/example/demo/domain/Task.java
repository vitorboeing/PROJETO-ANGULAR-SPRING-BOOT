package com.example.demo.domain;

import com.example.demo.domain.enums.Priority;
import com.example.demo.domain.enums.Situation;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;

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
    @Enumerated(EnumType.STRING)
    private Situation situation = Situation.TODO;

    @Setter
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.NONE;

    @Setter
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate inicialDate = LocalDate.now();

    @Setter
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate endDate;

}
