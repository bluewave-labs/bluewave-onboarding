# Use the latest Node.js LTS version as the base image
FROM node:latest

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application using nodemon
CMD ["npx", "nodemon", "index.js"]
