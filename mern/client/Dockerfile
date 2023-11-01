# Utilisez une image Node.js comme base
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /client

# Copiez les fichiers du client dans le conteneur
COPY . .

# Installez les dépendances du client
RUN npm install

# Exposez le port sur lequel votre application client s'exécute (ajustez-le en fonction de votre application)
EXPOSE 3000

# Commande de démarrage pour exécuter l'application client
CMD ["npm", "start"]
