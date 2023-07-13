# Challenge Stack : Node.js - Vue.js 🚀 <a name="readme-top"></a>
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)

### 🤖 [Blog alimenté par IA](https://alexandrechevalier.notion.site/Blog-aliment-par-IA-7281948b5fc94fdc93eef70c06cc918f)
Blog AI est une application web qui permet de **générer des articles de blog** à partir d’un titre. 

Utilisation :
* Se connecter à l'application (seul les admin peuvent se connecter)
* Saisir un titre dans un formulaire
* L’article sera **généré par l'IA ChatGPT** 
* Les articles générés seront publiables et **consultables sur le blog** après approbation de celui qui aura généré l’article. 
* Il est aussi possible d'exporter les articles en version Json.
* Les articles pourront être modifiés ou supprimés. 

Actuellement les internaute peuvent consulter les articles postés sur le site mais ils ne peuvent pas s'inscrire ou se connecter. Seul les administrateurs peuvent se connecter à l'application, ajouter des articles, les éditer et les supprimer. 

#### Fonctionnalités
Les appels à l’API se font en HTTP sur un serveur Node.js (Express).
La liste des endpoints :
* /ask?text=<votre question>
* xx

Modèle de réponse :
```json
{
    "id": 1,
    "title": "This framework is amazing",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ligula nisi, convallis sed justo eget, hendrerit sodales dui. Praesent odio orci, sagittis at purus in, volutpat semper metus. Duis mauris urna, cursus at metus eu, maximus placerat enim.",
    "author": "John Doe",
    "createdAt": "10/07/2023",
    "isPublished": true
}
```


### Pré-requis 🎨

- Node 12+ pour Quasar CLI avec Webpack, Node 14+ pour Quasar CLI avec Vite.
- Yarn v1 (fortement recommandé), ou NPM.
- Docker


### Installation

Les étapes pour installer le projet...

1. Obtenez une clé API gratuite sur https://example.com

2. Clonez le projet
```sh
git clone https://github.com/kbakazami/blog_ia_4iw.git
```

3. Installation des dépendances
```bash
yarn install
```

4. Installer Quasar CLI, un outil en ligne de commande qui se chargera de booter un projet complet a votre place et de lancer le projet en mode developpement
```bash
yarn global add @quasar/cli
# ou
npm install -g @quasar/cli
```


## Démarrage

1. Lancer le front de l'application
```bash
quasar dev
```

Ensuite vous pouvez montrer ce que vous obtenez au final...


## Fabriqué avec 🛒

[x] [Vuejs](https://vuejs.org/) - Pour toute la partie front de l'application

[x] [Quasar](https://quasar.dev/) - Une surcouche de vuejs pour augmente la réactivité et les performance de l'application vuejs

[x] [Node](https://nodejs.org/) - Permet le développement de la partie Backend de l'application ainsi que l'API

[x] [Express.js](https://expressjs.com/fr/) - Améliore le développement sur Node

[x] [Mongodb](https://www.mongodb.com/fr-fr) - Base de donnée

[x] [Docker](https://www.docker.com/) - Pour lancer mongodb en arrière plan

[x] [Github](https://github.com/) - Versionning

[x] [Trello](https://trello.com/fr) - Suivi du projet et des tâches

[x] [Swagger](https://swagger.io/) - Permet de générer une doc pour l'API


## Architecture 
La partie front du projet se trouve dans le dossier "front". C'est dans ce dossier qu'on trouve les fichier vuejs.

La partie back se trouve dans le dossier "api". C'est là qu'on trouve la connection à l'api de chatGPT
config : swager, api, dbb
controller : logique metier et methode CRUD
middlerwares : securité, rôle, verification
model : model de donnée pour mongodb
route : les couches de logique metier, associer controller à une route
.env


## Procédure en cas de bug


## Journal de bord 📖 
1. Lundi : 
    - Choix des technologies
    - Planification et organisation des taches
    - Lancement structure du projet
    - Intégration du dasboard avec les articles écrit en dur
    - Début des méthodes CRUD
2. Mardi : 
    - Front : Difficulté sur la récupération des données d'un article spécifique pour l'éditer. Possibilité de récupérer un article et de le modifier 
    - Back : On constate que l'api ChatGPT est limité voir même indisponible pour des comptes créés il y a plusieurs mois. Même un nouveau compte n'a pu faire que quelque requête teste qui non pas fonctionnés mais qui ont dépassé les limites acceptées. 
3. Mercredi :
    - XX
4. Jeudi :
    - Sécurisation des routes "/admin/..." 

## Proposition mise en place d’un outil BI 
La "balise Google Analytics" est une bibliothèque JavaScript permettant de mesurer la manière dont les utilisateurs interagissent avec notre site Web. La balise Google Analytics doit être ajoutée en haut de la balise <head> et avant toute autre balise de script ou CSS.

Modèle de balise Google Analytics :
```js
<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
</script>
```
Les données collectées par la balise Google :
* Temps total passé par un utilisateur sur votre site
* Temps passé par un utilisateur sur chaque page et dans quel ordre
* Les liens internes sur lesquels l'utilisateur a cliqué (en fonction de l'URL de la page vue suivante)
* Situation géographique de l'utilisateur
* Navigateur et système d'exploitation utilisés
* Site référent

🔎 Ces données seront très importantes pour évaluer et comprendre l'expérience des différents utilisateurs sur l'application afin de déterminer quelles fonctionnalités sont particulièrement appréciés par les internautes et lequelles devront être ajouté et priorisé dans les futures taches.


## Propositions d’évolution de l’architecture
* Actuellement la connexion à l'application est uniquement possible pour les administrateurs et eux seul peuvent ajouter, éditer ou supprimer des articles. C'est-à-dire que pour un internaute, il n'est pas possible de s'inscrire et de se connecter sur le site. Ils ne peuvent que consulter les articles.
Dans une nouvelle version de l'application les internautes pourront s'inscrire et se connecter sur l'application afin de poster des commentaires pour chaque articles. 

* Dans une future évolution de l'application, il sera possible d'ajouter un système de catégories pour les différents articles. Une nouvelle table "category" pourra être ajouté à la BDD et connecté en "many To many" à la table article. Ainsi les articles pourront être organisés par catégorie. 

* I18n est un plugin d'internationalisation pour Vue.js. Il permet de gérer les taductions de l'application. Il s'agit d'ouvrir le projet à un public plus large dans dans une nouvelle version de l'application. L'installation est très simple :
```bash
npm install vue-i18n@9
# ou
yarn add vue-i18n@9 
```


## Auteurs 🎭

* **Sofia CHAUDHRY** _alias_ [@AifosXI](https://github.com/AifosXI)
* **Wyvin STRUYS** _alias_ [@kbakazami](https://github.com/kbakazami)
* **Rédouane RÉMILI** _alias_ [@FinOrfy](https://github.com/FinOrfy)

<p align="right">(<a href="#readme-top">retour en haut⬆</a>)</p>
