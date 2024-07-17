# Installation du projet
1. Téléchargez ou clonez le dépôt
2. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : `sudo docker-compose up --build`
3. Ouvrez le site depuis la page http://localhost:8080 

# Cypress
1. Depuis un terminal ouvert dans le dossier du projet, lancer la commande : `npm install cypress --save-dev`
2. Une fois Cypress installé, lancer la commande : `npx cypress open`
3. Dans l'iterface Cypress: click sur E2E Testing -> choisir le navigateur + click sur Start -> passer tous les tests dans le dossier `3-test-fonctionnel`

# API
Pour consulter la documentation de l'API ouvrez la page http://localhost:8081/api/doc