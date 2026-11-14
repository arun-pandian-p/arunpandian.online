package com.arunpandian.portfolio.controller;

import com.arunpandian.portfolio.repository.ContactRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ContactRepository contactRepository;

    @BeforeEach
    void setUp() {
        contactRepository.deleteAll();
    }

    @Test
    void shouldSuccessfullySubmitValidContactForm() throws Exception {
        String payload = """
            {
                "name": "Jane Doe",
                "email": "jane.doe@example.com",
                "subject": "Software Engineer Opportunity",
                "message": "Hello Arun, we were impressed by your Full Stack portfolio and would like to discuss an opportunity."
            }
            """;

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.id").isNumber());

        assertEquals(1, contactRepository.count());
    }

    @Test
    void shouldFailValidationWhenEmailIsInvalid() throws Exception {
        String payload = """
            {
                "name": "Jane",
                "email": "not-an-email",
                "subject": "Inquiry",
                "message": "This is a short message for test."
            }
            """;

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.email").exists());

        assertEquals(0, contactRepository.count());
    }

    @Test
    void shouldReturnProjectsList() throws Exception {
        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].slug").exists());
    }

    @Test
    void shouldReturnSingleProject() throws Exception {
        mockMvc.perform(get("/api/projects/zappy"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug").value("zappy"))
                .andExpect(jsonPath("$.title").value("Zappy — Restaurant SaaS Platform"));
    }
}

