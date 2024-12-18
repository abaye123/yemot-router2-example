# docker build -t appName_v1.0.0 .
# docker run -p 7232:7232 appName_v1.0.0

# Use official Node.js runtime as base image
FROM node:20

# Set working directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port the app runs on
EXPOSE 14698

# Command to run the app
CMD [ "node", "src/index.js" ]