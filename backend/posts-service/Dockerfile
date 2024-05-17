# Use a Node.js base image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the application code to the container
COPY . .


# Command to run the application
CMD ["node", "index.js"]

# # Expose the port the app runs on
# EXPOSE 7000

