package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.exception.BusinessException;
import com.example.demo.models.LoginCredentials;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtTokenUtil;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import javax.xml.bind.ValidationException;
import java.net.http.HttpRequest;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping(path = "auth")
public class AuthController {

    private final UserRepository userRepo;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepo, JwtTokenUtil jwtTokenUtil, AuthenticationManager authManager, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("register")
    public ResponseEntity<Map<String, Object>> registerHandler(@RequestBody User user) {

        if(userRepo.findByEmail(user.getEmail()).isPresent())
            throw new BusinessException("Email is alrealy in used");

        var encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);
        user = userRepo.save(user);
        var token = jwtTokenUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }

    @PostMapping("login")
    public Map<String, Object> loginHandler(@RequestBody LoginCredentials body){
        try {
            var authInputToken = new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());
            authManager.authenticate(authInputToken);
            var token = jwtTokenUtil.generateToken(body.getEmail());
            return Collections.singletonMap("token", token);
        }catch (AuthenticationException authExc){
            throw new BusinessException("Invalid Login Credentials");
        }
    }


}