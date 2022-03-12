package com.example.demo.controller;

import com.example.demo.config.FeedBack;
import com.example.demo.config.MailConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.ValidationException;
import java.util.Properties;

@RestController
@RequestMapping("/feedback")
public class FeedBackController {

    @Autowired
    private MailConfig mailConfig;

    @PostMapping
    public void sendFeedBack(@RequestBody FeedBack feedBack , BindingResult bindingResult) throws ValidationException {

        if(bindingResult.hasErrors()){
            throw new ValidationException("Feedback is not valid");
        }

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(this.mailConfig.getHost());
        mailSender.setPort(this.mailConfig.getPort());
        mailSender.setUsername(this.mailConfig.getUsername());
        mailSender.setPassword(this.mailConfig.getPassword());

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(feedBack.getEmail());
        mailMessage.setTo("vitor-bh@outlook.com");
        mailMessage.setSubject("New feedback from " + feedBack.getName());
        mailMessage.setText(feedBack.getFeedback());

        Properties props = new Properties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", true);
        props.put("mail.smtp.starttls.enable", true);
        props.put("mail.smtp.connectiontimeout", 10000);

        mailSender.setJavaMailProperties(props);

        mailSender.send(mailMessage);
    }

}
