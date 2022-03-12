package com.example.demo.common;

import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.io.Serializable;
import java.util.List;

public abstract class GenericController <E, ID extends Serializable, S extends GenericService<E, ID, ?>> {

    @Getter
    private final S service;

    public GenericController(S service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<E>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<E> findById(@PathVariable ID id) throws EntityNotFoundException {
        return ResponseEntity.ok(service.findById(id)
                .orElseThrow(EntityNotFoundException::new));
    }

    @PostMapping
    public ResponseEntity<E> save(@RequestBody E body) {
        return ResponseEntity.ok(service.save(body));
    }

    @PutMapping
    public ResponseEntity<E> update(@RequestBody E body , @PathVariable ID id) {
        return ResponseEntity.ok(service.save(body));
    }
    @DeleteMapping(path = "{id}")
    public void delete(@PathVariable ID id) {
        service.deleteById(id);
    }

}
