package com.example.demo.reports;

import com.example.demo.domain.Provider;
import com.example.demo.service.ProviderService;
import lombok.Setter;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.web.context.annotation.RequestScope;

import javax.annotation.ManagedBean;
import java.util.ArrayList;
import java.util.HashMap;


@ManagedBean
@RequestScope
public class ProviderReport {

    private final ProviderService providerService;

    @Setter
    private Long providerId;

    public ProviderReport(ProviderService providerService) {
        this.providerService = providerService;
    }

    public byte[] printReport() throws JRException {
        final var providerList = new ArrayList<Provider>();

        if (providerId != null)
            providerList.add(providerService.findById(providerId).orElse(null));
        else
            providerList.addAll(providerService.findAll());

        final var jasperReport = JasperCompileManager.compileReport(this.getClass().getResourceAsStream("/reports/provider.jrxml"));
        final var parametros = new HashMap<String, Object>();
        final var jasperPrint = JasperFillManager.fillReport(jasperReport, parametros, new JRBeanCollectionDataSource(providerList));
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

}
