# Multi-stage Docker build for Java 21 Spring Boot
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace/app

# Cache Maven wrapper and dependencies
COPY pom.xml .
COPY src src

# Run clean package without tests for fast production container builds
RUN apk add --no-cache maven && mvn clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

COPY --from=builder /workspace/app/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/api/health || exit 1

ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]

