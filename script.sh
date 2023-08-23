#!/bin/bash

cd /home/ubuntu/Veterinaria/

# Actualizar el repositorio git
git pull origin test 

#Ir a la carpeta del Cliente
cd /home/ubuntu/Veterinaria/Client
#Instalo las dependencias
npm i
npm run build

#Ir a la carpeta del Cliente
cd /home/ubuntu/Veterinaria/Server
#Instalo las dependencias
npm i
npm run build
