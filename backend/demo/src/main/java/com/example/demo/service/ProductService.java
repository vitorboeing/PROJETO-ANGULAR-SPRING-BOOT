package com.example.demo.service;

import com.example.demo.common.GenericService;
import com.example.demo.domain.Product;
import com.example.demo.domain.Provider;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProviderRepository;
import com.example.demo.service.execptions.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService extends GenericService<Product , Long , ProductRepository> {

    public ProductService(ProductRepository repository) {
        super(repository);
    }
}

