# Use the official Node.js image as the base image
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite application
RUN npm run build

# Expose the port your application will run on (change 3000 if your app runs on a different port)
EXPOSE 3080

# Set the command to start the application
CMD ["npm", "run", "preview"]