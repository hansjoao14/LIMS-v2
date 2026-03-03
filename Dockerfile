# Etapa 1: Build Angular
FROM node:20.19.1-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . ./
RUN npm run build

# Etapa 2: Servidor Node + Angular compilado
FROM node:20.19.1-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY --from=build /app/dist/LIMS/browser ./dist/LIMS/browser
COPY server.js ./

EXPOSE 5200
CMD ["node", "server.js"]
