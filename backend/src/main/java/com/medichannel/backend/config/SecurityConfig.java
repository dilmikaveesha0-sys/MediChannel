package com.medichannel.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/health",
                    "/api/database-test",
                    "/api/users",
                    "/api/patients",
                    "/api/doctors",
                    "/api/specialisations",
                    "/api/appointments",
                    "/api/rooms",
                    "/api/sessions",
                    "/api/consultations",
                    "/api/notifications",
                    "/api/feedback",
                    "/api/notices",
                    "/api/audit-logs"
                ).permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}