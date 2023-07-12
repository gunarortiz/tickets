# Use the official Node.js image as the base image
FROM sitespeedio/node:ubuntu-20.04-nodejs-16.13.1

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libcurl4-openssl-dev \
    && apt-get clean \
    && apt-get purge -y \
    && rm -rf /var/lib/apt/lists*

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install -g nodemon ts-node ts-node-dev typescript
RUN npm install 

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which the application will run
EXPOSE 3000

# Start the application
CMD npm start