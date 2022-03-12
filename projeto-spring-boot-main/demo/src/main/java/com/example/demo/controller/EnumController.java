package com.example.demo.controller;

import com.example.demo.domain.enums.Priority;
import com.example.demo.domain.enums.Situation;
import io.swagger.models.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.EnumSet;
import java.util.LinkedHashMap;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.toMap;
import static org.apache.commons.lang3.StringUtils.*;

@RestController
@RequestMapping(path = "enum")
public class EnumController {


    @GetMapping(path = "situation")
    public ResponseEntity<?> findAllSituation(@RequestParam(required = false) final String description) {
        return ResponseEntity.ok(
                EnumSet.allOf(Situation.class)
                        .stream()
                        .filter(e -> isBlank(description) || containsIgnoreCase(stripAccents(e.getDescription()), stripAccents(description)))
                        .sorted(comparing(Situation::getDescription))
                        .collect(toMap(Situation::getDescription, Situation::name, (o1, o2) -> o1, LinkedHashMap::new))
        );
    }

    @GetMapping(path = "priority")
    public ResponseEntity<?> findAllPriority(@RequestParam(required = false) final String description) {
        return ResponseEntity.ok(
                EnumSet.allOf(Priority.class)
                        .stream()
                        .filter(e -> isBlank(description) || containsIgnoreCase(stripAccents(e.getDescription()), stripAccents(description)))
                        .sorted(comparing(Priority::getDescription))
                        .collect(toMap(Priority::getDescription, Priority::name, (o1, o2) -> o1, LinkedHashMap::new))
        );
    }

}
