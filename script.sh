#!/bin/bash
#Ir a la carpeta del proyecto
cd /home/ubuntu/Veterinaria/

# Detener los servicios Docker existentes
/usr/bin/docker-compose down 

# Actualizar el repositorio git
git pull origin test 

# Detener los servicios Docker nuevamente (por si acaso)
/usr/bin/docker-compose down

# Construir y levantar los servicios Docker
cd /home/ubuntu/Veterinaria/ && /usr/bin/docker-compose up -d --build

#Eliminar imagenes no usadas de docker:
#/usr/bin/docker image prune -a -f
