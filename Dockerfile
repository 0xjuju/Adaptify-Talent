FROM node:22 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend
RUN npm install

COPY frontend/ /app/frontend/

RUN npm run build

# Setup the Node.js backend and serve the frontend
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy the built React frontend files from the previous stage to the dist folder
COPY --from=build /app/frontend/build ./dist/frontend/build

EXPOSE 3000

CMD ["node", "dist/index.js"]
