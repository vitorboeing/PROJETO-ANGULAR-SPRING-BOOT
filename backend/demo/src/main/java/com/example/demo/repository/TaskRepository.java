package com.example.demo.repository;

import com.example.demo.common.GenericRepository;
import com.example.demo.domain.Task;
import com.example.demo.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends GenericRepository<Task, Long> {

    List<Task> findAllByUser(User user);


}
