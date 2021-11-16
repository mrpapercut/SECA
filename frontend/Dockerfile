FROM node:16.8.0-alpine3.14

WORKDIR /app

# Copy required project files
COPY ./ ./

# Set permissions for node user
RUN chown -R node:node /app

# Switch to node user
USER node

RUN npm install
