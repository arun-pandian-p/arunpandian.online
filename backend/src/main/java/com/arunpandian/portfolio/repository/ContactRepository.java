package com.arunpandian.portfolio.repository;

import com.arunpandian.portfolio.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {

    @Query("SELECT COUNT(c) FROM ContactMessage c WHERE c.ipAddress = :ipAddress AND c.createdAt >= :since")
    long countRecentByIp(@Param("ipAddress") String ipAddress, @Param("since") OffsetDateTime since);
}

