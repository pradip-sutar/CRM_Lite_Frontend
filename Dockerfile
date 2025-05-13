# Use an official Node runtime as a parent image
FROM node:22.3.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies, forcing legacy peer dependency resolution
RUN npm install --legacy-peer-deps

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 to allow external access
EXPOSE 3000

# Command to run the React app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
