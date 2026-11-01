package com.arunpandian.portfolio.service;

import com.arunpandian.portfolio.dto.ContactRequest;
import com.arunpandian.portfolio.dto.ContactResponse;
import com.arunpandian.portfolio.entity.ContactMessage;
import com.arunpandian.portfolio.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private static final int MAX_MESSAGES_PER_WINDOW = 5;
    private static final int WINDOW_MINUTES = 10;

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public ContactResponse submitContactForm(ContactRequest request, String clientIp) {
        // Honeypot check: If the hidden company field has a value, it is an automated spam bot
        if (request.getCompany() != null && !request.getCompany().trim().isEmpty()) {
            log.warn("Honeypot triggered from IP: {}", clientIp);
            // Return dummy success so spam bot doesn't retry
            return ContactResponse.success("Message received successfully.", 0L);
        }

        // Rate limiting check per IP address
        if (clientIp != null && !clientIp.isBlank()) {
            OffsetDateTime windowStart = OffsetDateTime.now().minusMinutes(WINDOW_MINUTES);
            long recentCount = contactRepository.countRecentByIp(clientIp, windowStart);
            if (recentCount >= MAX_MESSAGES_PER_WINDOW) {
                log.warn("Rate limit exceeded for IP: {}. Submissions in last {} min: {}", clientIp, WINDOW_MINUTES, recentCount);
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS,
                        "Too many contact inquiries from this IP address. Please try again after 10 minutes.");
            }
        }

        ContactMessage message = new ContactMessage(
                request.getName(),
                request.getEmail(),
                request.getSubject(),
                request.getMessage(),
                clientIp
        );

        ContactMessage saved = contactRepository.save(message);
        log.info("Saved contact message #{} from {}", saved.getId(), saved.getEmail());

        return ContactResponse.success("Thank you for reaching out! Your message has been sent successfully.", saved.getId());
    }
}

