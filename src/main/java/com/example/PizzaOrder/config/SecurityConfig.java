package com.example.PizzaOrder.config;

import com.example.PizzaOrder.security.AuthTokenFilter;
import com.example.PizzaOrder.security.AuthTokenService;
import com.example.PizzaOrder.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, AuthTokenService tokenService,
                                            UserRepository userRepository) throws Exception {
        AuthTokenFilter tokenFilter = new AuthTokenFilter(tokenService, userRepository);
        return http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .httpBasic(basic -> basic.disable())
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(errors -> errors
                        .authenticationEntryPoint((request, response, exception) -> response.sendError(401))
                        .accessDeniedHandler((request, response, exception) -> response.sendError(403)))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users/register", "/users/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/pizzas", "/pizzas/**", "/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users/delivery").hasRole("ADMIN")
                        .requestMatchers("/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/orders").hasRole("CUSTOMER")
                        .requestMatchers(HttpMethod.GET, "/orders/user/**").hasAnyRole("CUSTOMER", "ADMIN")
                        .requestMatchers("/orders/**").hasAnyRole("ADMIN", "DELIVERY")
                        .requestMatchers("/order-items/**").hasAnyRole("ADMIN", "CUSTOMER")
                        .requestMatchers("/payments/**").hasAnyRole("ADMIN", "DELIVERY")
                        .requestMatchers("/pizzas/**").hasRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
