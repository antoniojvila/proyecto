# Usar la imagen oficial de Node.js como base
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar bash, npm, y otras dependencias necesarias
RUN apk add --no-cache bash

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install --force

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación Angular
RUN npm run build -- --configuration production --base-href=/browser/

# Usar la imagen oficial de Nginx para servir la aplicación
FROM nginx:stable-alpine

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos compilados de la aplicación Angular al directorio de Nginx
COPY --from=build /app/dist/signlingo /usr/share/nginx/html/browser

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
