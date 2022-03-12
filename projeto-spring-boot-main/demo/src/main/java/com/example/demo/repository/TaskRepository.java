package com.example.demo.repository;

import com.example.demo.common.GenericRepository;
import com.example.demo.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends GenericRepository<Task, Long> {
}
