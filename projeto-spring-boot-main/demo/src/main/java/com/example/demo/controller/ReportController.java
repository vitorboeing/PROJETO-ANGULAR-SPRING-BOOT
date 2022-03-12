package com.example.demo.controller;

import com.example.demo.reports.ProviderReport;
import net.sf.jasperreports.engine.JRException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping(path = "report")
public class ReportController {

    private final ProviderReport providerReport;

    public ReportController(ProviderReport providerReport) {
        this.providerReport = providerReport;
    }

    @GetMapping(path = "provider")
    public ResponseEntity<byte[]> provider(@RequestParam(required = false) final Long providerId) throws JRException, IOException {
        providerReport.setProviderId(providerId);
        return ResponseEntity.ok(providerReport.printReport());
    }

}
