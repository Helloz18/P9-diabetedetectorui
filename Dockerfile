FROM node:latest as node
    # défini le dossier de l'application de l'image (working directory)
WORKDIR /app
    # copy tout le contenu du dossier où se trouve le fichier Dockerfile vers l'image docker (dans le /app folder)
COPY . .
    # installe les dépendances
RUN npm install
    # build le projet et créer le dist folder
RUN npm run build --prod

#run the application : on part de l'image nginx optimisée pour run l'application
FROM nginx:alpine
    # copy le contenu du build dans le dossier spécifique utilisé par nginx
COPY --from=node /app/dist/diabetedetectorui /usr/share/nginx/html
# par défaut, nginx est sur le port 80. En lançant cette commande ci-dessous, on ouvre l'appli sur le port 5002
# docker run --rm -d  -p 5002:80/tcp angulartestdocker:latest