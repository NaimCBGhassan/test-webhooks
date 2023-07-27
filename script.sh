#!/bin/bash
# Detener los servicios Docker existentes
cd /home/ubuntu/Veterinaria/ && /usr/bin/docker-compose down 
#<<< "TU_CONTRASEÑA_DE_SUDO"
# Configuración de usuario y contraseña de Git
export GIT_USERNAME="jpsq"
export GIT_PASSWORD="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"
# Configurar el nombre de usuario de Git globalmente
/usr/bin/git config --global user.name "$GIT_USERNAME"
# Configurar la contraseña de Git globalmente
/usr/bin/git config --global credential.helper "store --file ~/.git-credentials"
echo -e "https://$GIT_USERNAME:$GIT_PASSWORD@github.com" > ~/.git-credentials
# Actualizar el repositorio git
cd /home/ubuntu/Veterinaria/ && /usr/bin/git pull origin test 
# Detener los servicios Docker nuevamente (por si acaso)
cd /home/ubuntu/Veterinaria/ && /usr/bin/docker-compose down
#<<< "TU_CONTRASEÑA_DE_SUDO"
# Construir y levantar los servicios Docker
cd /home/ubuntu/Veterinaria/ && /usr/bin/docker-compose up -d --build
#<<< "TU_CONTRASEÑA_DE_SUDO" 