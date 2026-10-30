package com.example.PizzaOrder.security;

import com.example.PizzaOrder.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class AuthTokenFilter extends OncePerRequestFilter {
    private final AuthTokenService tokenService;
    private final UserRepository userRepository;

    public AuthTokenFilter(AuthTokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            tokenService.verify(header.substring(7)).flatMap(tokenPrincipal -> userRepository.findById(tokenPrincipal.id())
                    .filter(user -> !"INACTIVE".equals(user.getStatus()))
                    .filter(user -> tokenPrincipal.role().equals(user.getRole()))
                    .map(user -> new AppUserPrincipal(user.getId(), user.getEmail(), user.getRole()))).ifPresent(principal -> {
                var authentication = new UsernamePasswordAuthenticationToken(
                        principal, null, List.of(new SimpleGrantedAuthority("ROLE_" + principal.role()))
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            });
        }
        chain.doFilter(request, response);
    }
}
