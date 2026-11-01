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

ENTRYPOINT ["java", "-Xms128m", "-Xmx384m", "-XX:+UseG1GC", "-jar", "app.jar"]
