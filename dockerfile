# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
