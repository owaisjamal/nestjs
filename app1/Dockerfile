# Use a base image with Node.js pre-installed
FROM node:20.5.0

# Set the working directory
WORKDIR /app1

# Copy application code to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 3001

# Define the startup command
CMD ["npm", "start"]