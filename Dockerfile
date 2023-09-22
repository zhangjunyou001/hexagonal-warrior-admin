# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vue.js app for production
#RUN npm run build

# Expose port 9528
EXPOSE 9528

# Define the command to run the application
CMD [ "npm", "run", "dev" ]
