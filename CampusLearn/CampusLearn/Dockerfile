# Stage 1: Build the JAR file
FROM maven:3.9.5-amazoncorretto-21 AS build
WORKDIR /app
# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src
# Build the project, skipping tests for faster build
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight runtime image
FROM amazoncorretto:21-alpine
WORKDIR /app
# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
# Expose the default Spring Boot port
EXPOSE 8080
# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]