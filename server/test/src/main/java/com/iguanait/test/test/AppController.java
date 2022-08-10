package com.iguanait.test.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {

    @GetMapping(value = "/healthz")
    public String healthz() {
        return "Ok";
    }
}