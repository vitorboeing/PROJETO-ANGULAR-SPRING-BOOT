package com.example.demo.service;


import com.example.demo.common.GenericService;
import com.example.demo.domain.Provider;
import com.example.demo.repository.ProviderRepository;
import com.example.demo.service.execptions.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProviderService extends GenericService<Provider , Long , ProviderRepository> {

    public ProviderService(ProviderRepository repository) {
        super(repository);
    }

    public List<Provider> findAllByCode(final Long providerCode){
        return repository.findAllByCode(providerCode);
    }
}

