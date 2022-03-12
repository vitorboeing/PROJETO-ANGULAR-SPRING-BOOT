package com.example.demo.controller;

import com.example.demo.common.GenericController;
import com.example.demo.domain.Task;
import com.example.demo.service.TaskService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "task")
public class TaskController extends GenericController<Task , Long , TaskService> {

    public TaskController(TaskService service) {
        super(service);
    }
}
