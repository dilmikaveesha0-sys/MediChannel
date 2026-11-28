
package com.medichannel.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test/public")
    public String publicTest() {
        return "Public API is working!";
    }

    @GetMapping("/api/test/protected")
    public String protectedTest(Authentication authentication) {

        return "JWT Authentication Successful! "
                + "User ID: " + authentication.getName()
                + ", Role: " + authentication.getAuthorities();
    }
}
