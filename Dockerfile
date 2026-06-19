FROM nginx:alpine

# Copiar todos los archivos del proyecto al directorio de nginx
COPY . /usr/share/nginx/html

# Configuración personalizada de nginx para Cloud Run (puerto 8080)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
