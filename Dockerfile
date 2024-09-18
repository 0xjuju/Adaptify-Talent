# Stage 1: Build the React frontend
FROM node:22 as build

WORKDIR /app

# Copy package.json and package-lock.json (if available) to the root
COPY package*.json ./

# Install dependencies for both backend and frontend
RUN npm install

# Copy the frontend's package.json and package-lock.json to the frontend directory
COPY frontend/package*.json ./frontend/

# Install the frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Copy the entire frontend directory to the container
COPY frontend/ /app/frontend/

# Build the frontend
RUN npm run build

# Stage 2: Setup the Node.js backend and serve the frontend
FROM node:22

WORKDIR /app

# Copy the backend package.json and package-lock.json to the root directory
COPY package*.json ./
RUN npm install

# Copy the entire project except the node_modules
COPY . .

# Copy the built React frontend files from the previous stage
COPY --from=build /app/frontend/build ./frontend/build

# Expose port 3000 for Node.js and React frontend
EXPOSE 3000

# Command to run your Node.js backend
CMD ["node", "index.ts"]
