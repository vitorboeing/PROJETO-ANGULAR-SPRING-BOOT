package com.example.demo.controller;

import com.example.demo.common.GenericController;
import com.example.demo.domain.Provider;
import com.example.demo.service.ProviderService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "provider")
public class ProviderController extends GenericController<Provider , Long , ProviderService> {

    public ProviderController(ProviderService service) {
        super(service);
    }
}

