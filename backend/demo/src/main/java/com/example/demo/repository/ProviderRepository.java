package com.example.demo.repository;

import com.example.demo.common.GenericRepository;
import com.example.demo.domain.Provider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderRepository extends GenericRepository<Provider, Long> {

    List<Provider> findAllByCode (final Long providerCode);

}
