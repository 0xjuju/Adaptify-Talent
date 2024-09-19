FROM node:22 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY frontend/package*.json ./frontend/

WORKDIR /app/frontend
RUN npm install

COPY frontend/ /app/frontend/

RUN npm run build

FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g typescript

RUN tsc

COPY --from=build /app/frontend/build ./frontend/build

EXPOSE 3000

CMD ["node", "dist/index.js"]
