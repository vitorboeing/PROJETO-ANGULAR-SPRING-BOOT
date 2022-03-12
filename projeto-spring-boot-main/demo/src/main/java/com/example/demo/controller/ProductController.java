package com.example.demo.controller;

import com.example.demo.common.GenericController;
import com.example.demo.domain.Product;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path="product")
public class ProductController extends GenericController<Product , Long , ProductService> {

    public ProductController(ProductService service) {
        super(service);
    }
}

