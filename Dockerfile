# Etapa 1: Build Angular
FROM node:20.19.1-alpine AS build
WORKDIR /app

COPY package*.json ./
# Instalamos TODO para compilar
RUN npm ci --legacy-peer-deps
COPY . ./
RUN npm run build

# Etapa 2: Servidor Node + Angular compilado
FROM node:20.19.1-alpine
WORKDIR /app

# Importante: Copiamos package.json para reinstalar dependencias de producción
COPY package*.json ./

# Si 'node-fetch' falla, asegúrate de que esté en dependencies. 
# Si no quieres editar el package.json, puedes forzarlo aquí:
RUN npm ci --omit=dev --legacy-peer-deps || npm install node-fetch

# Copiamos los archivos generados de Angular
COPY --from=build /app/dist/LIMS/browser ./dist/LIMS/browser
# Copiamos el servidor
COPY server.js ./

# Asegúrate de que server.js use el puerto 5200 o la variable de entorno PORT
ENV PORT=5200
EXPOSE 5200

CMD ["node", "server.js"]