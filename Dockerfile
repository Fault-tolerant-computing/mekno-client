# Use an official Node.js runtime as the base image
FROM node:18.18.2

# Establecer el directorio de trabajo en la imagen
WORKDIR /app

# Copiar los archivos de la aplicación al directorio de trabajo en la imagen
COPY package.json ./
COPY . .

# Instalar las dependencias de la aplicación
RUN npm install

# Exponer el puerto en el que la aplicación se ejecutará dentro del contenedor
EXPOSE 3000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
