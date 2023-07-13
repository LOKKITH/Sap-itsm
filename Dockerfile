# Base image
FROM node:14

# Set working directory in the container
WORKDIR /tmp/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install @mui/material @emotion/react @emotion/styled 
RUN npm install react-router-dom 
RUN npm install react-google-login
RUN npm install gapi-script

# Copy the entire codebase to the container
COPY . /tmp/app/

# Navigate into the my-app folder
WORKDIR /tmp/app/my-app

# Build the React app
RUN npm run build

# Install nano text editor
RUN apt-get update && apt-get install -y nano

# Expose the port your React app is running on (default is 3000)
EXPOSE 3000

# Define the command to start your app
CMD [ "npm", "start" ]