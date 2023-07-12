# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to run the application
CMD [ "npm", "start" ]