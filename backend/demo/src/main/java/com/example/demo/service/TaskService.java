package com.example.demo.service;

import com.example.demo.common.GenericService;
import com.example.demo.domain.Task;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService extends GenericService<Task, Long, TaskRepository> {

    private final UserRepository userRepository;

    public TaskService(TaskRepository repository, UserRepository userRepository) {
        super(repository);
        this.userRepository = userRepository;
    }

    public List<Task> findAllByUser() {
        var user = userRepository.findByEmail( (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).orElse(null);
        return repository.findAllByUser(user);
    }
}
