package com.example.demo.service;

import com.example.demo.common.GenericService;
import com.example.demo.domain.Task;
import com.example.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService extends GenericService<Task ,Long , TaskRepository > {

    public TaskService(TaskRepository repository) {
        super(repository);
    }
}
