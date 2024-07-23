# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install

# Copy the rest of the application code
COPY . /app/

# Expose port 3000 for the React application
EXPOSE 3000

# Run the React application
CMD ["npm", "start"]
