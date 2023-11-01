# Utilisez une image Node.js comme base
FROM node:18

# Définissez un argument pour la chaîne de connexion
ARG ATLAS_URI

# Définissez le répertoire de travail dans le conteneur
WORKDIR /server

# Copiez les fichiers du serveur dans le conteneur
COPY . .

# Installez les dépendances du client
RUN npm install

# Exposez le port sur lequel votre application serveur s'exécute (utilisation du port 5050)
EXPOSE 5050

# Commande de démarrage pour exécuter le serveur Node.js
CMD ["node", "server.mjs"]