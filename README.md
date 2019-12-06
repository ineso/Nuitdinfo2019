# Nuitdinfo2019

# DOCKERISATION:
Ce présent travail est réalisé dans le cadre du défi: Dockerisation par les membres de Alpha Team.

Les étapes de création d'un dockerfile :

# stage 1
FROM node:alpine as builder     ** nous avons utilisé une image node:alpine et la renommer builder
WORKDIR '/app'                  ** le workdirectory qu'on va utilisé est /app 
COPY ./package.json ./          ** on utilisera le fichier package.json qui contient les dépendances du projets
RUN npm install                 ** On esseyera de télécharger tous les fichiers de npm
COPY . .                        ** On fait une copie de tous reste 
 
# stage 2 
version: '3'                    ** version de notre docker-compose

services:                       ** on va définir nos services correspondants
  server:                       ** notre premier service est celui qui represente notre partie serveur
    build:
      dockerfile: Dockerfile    ** définir le dockerfile
      context: .                ** le dockerfile existe dans l'arboresence
    volumes:                    ** on essayera la de définir nos volumes
      - /app/nodes_modules
      - ./:/app                  ** faire une copie de toute l'arborésance sous /app
  mysql-development:             ** définir notre service de notre base de donnée
    image: mysql:8.0.17          ** l'image qu'on va utilisé est la suivante qui est prise de dockerhub
    environment:
      MYSQL_ROOT_PASSWORD: root  **le mot de passe de la base de donnée est root
      MYSQL_DATABASE: web_db     ** le nom est le suivant marqué
    ports:
      - "3308:3306"              ** un mapage de port




## Etape 3:
Il faut configurer le travis pour prendre les pushs correspondantes à chaque commit


## Etape 4:  
Il faut ajouter les variable d'environement à travis CI qui sont le nom secret et le mot de passe de votre docker hub
  - echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
## Etape 5 :

Il faut taper cette commande "docker push inestouzi/nuitdinfo2019" sur le docker afin de télécharger l'image à partir du docker hub.

## Etape 6:
Il faut ajouter le code correspond pour mettre le travail sur le serveur heroku



Et voilà le projet devient exécutable et prêt à être utilisé.# Dockerisation
