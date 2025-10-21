# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .
# Install dependencies
RUN npm install
COPY . .
# Build for production (Creates the final static files)
RUN npm run build

# Stage 2: Serve the static files using a lightweight server (Nginx)
FROM nginx:alpine
# Remove the default Nginx index file
RUN rm -rf /usr/share/nginx/html/*
# Copy the built files from the build stage 
# *** NOTE: If your 'npm run build' outputs to a folder named 'dist', CHANGE 'build' below! ***
COPY --from=build /app/build /usr/share/nginx/html
# Nginx default port is 80
EXPOSE 80
# The Nginx server starts automatically