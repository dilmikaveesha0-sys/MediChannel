package com.medichannel.backend.config;

import com.medichannel.backend.service.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        System.out.println("JWT FILTER: " + request.getRequestURI());
System.out.println("AUTH HEADER PRESENT: " + (header != null));

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {
                Long userId = jwtService.extractUserId(token);
                String role = jwtService.extractRole(token);

                var authentication =
                        new UsernamePasswordAuthenticationToken(
                                userId.toString(),
                                null,
                                List.of(
                                        new SimpleGrantedAuthority("ROLE_" + role)
                                )
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

            } catch (JwtException | IllegalArgumentException e) {
    e.printStackTrace();
    SecurityContextHolder.clearContext();
}
        }

        filterChain.doFilter(request, response);
    }
}