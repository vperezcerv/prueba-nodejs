# Utiliza una imagen de Node.js
FROM node:14

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de la aplicación (asegúrate de tener un package.json)
COPY package.json .
COPY package-lock.json .

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Instala el paquete de OpenTelemetry para Node.js
RUN npm install --save @opentelemetry/api @opentelemetry/node @opentelemetry/tracing

# Exponer el puerto en el que la aplicación está escuchando
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]
