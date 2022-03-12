package com.example.demo.common;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;

@NoRepositoryBean
public interface GenericRepository<E, ID extends Serializable> extends JpaRepository<E, ID> {
}
