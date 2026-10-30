package com.example.PizzaOrder.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

@Service
public class AuthTokenService {
    private static final long TOKEN_LIFETIME_SECONDS = 12 * 60 * 60;
    private final byte[] secret;

    public AuthTokenService(@Value("${app.auth.secret:}") String configuredSecret) {
        if (configuredSecret != null && !configuredSecret.isBlank() && configuredSecret.length() < 32) {
            throw new IllegalStateException("APP_AUTH_SECRET must contain at least 32 characters");
        }
        if (configuredSecret == null || configuredSecret.isBlank()) {
            byte[] generated = new byte[32];
            new SecureRandom().nextBytes(generated);
            this.secret = generated;
        } else {
            this.secret = configuredSecret.getBytes(StandardCharsets.UTF_8);
        }
    }

    public String issue(AppUserPrincipal principal) {
        long expiresAt = System.currentTimeMillis() / 1000 + TOKEN_LIFETIME_SECONDS;
        String payload = principal.id() + "|" + principal.role() + "|" + expiresAt;
        String encodedPayload = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        return encodedPayload + "." + Base64.getUrlEncoder().withoutPadding().encodeToString(sign(encodedPayload));
    }

    public Optional<AppUserPrincipal> verify(String token) {
        try {
            String[] parts = token.split("\\.", -1);
            if (parts.length != 2) return Optional.empty();
            byte[] suppliedSignature = Base64.getUrlDecoder().decode(parts[1]);
            if (!MessageDigest.isEqual(sign(parts[0]), suppliedSignature)) return Optional.empty();

            String[] claims = new String(Base64.getUrlDecoder().decode(parts[0]), StandardCharsets.UTF_8).split("\\|", -1);
            if (claims.length != 3) return Optional.empty();
            long id = Long.parseLong(claims[0]);
            long expiresAt = Long.parseLong(claims[2]);
            if (id <= 0 || expiresAt <= System.currentTimeMillis() / 1000) return Optional.empty();
            if (!claims[1].equals("ADMIN") && !claims[1].equals("CUSTOMER") && !claims[1].equals("DELIVERY")) {
                return Optional.empty();
            }
            return Optional.of(new AppUserPrincipal(id, "", claims[1]));
        } catch (Exception ignored) {
            return Optional.empty();
        }
    }

    private byte[] sign(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret, "HmacSHA256"));
            return mac.doFinal(value.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            throw new IllegalStateException("Could not sign authentication token", e);
        }
    }
}
