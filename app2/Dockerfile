# Use a base image with Node.js pre-installed
FROM node:20.5.0

# Set the working directory
WORKDIR /app2

# Copy application code to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the application port (should match the port your app listens on)
EXPOSE 3002

# Define the startup command
CMD ["npm", "start"]