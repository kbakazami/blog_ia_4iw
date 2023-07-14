# Challenge Stack : Node.js - Vue.js 🚀     <a name="readme-top"></a>
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-git.svg)](https://forthebadge.com)


## 🤖 [Blog alimenté par IA](https://alexandrechevalier.notion.site/Blog-aliment-par-IA-7281948b5fc94fdc93eef70c06cc918f)
Blog AI est une application web qui permet de **générer des articles de blog** à partir d’un titre. 

Utilisation :
* Se connecter à l'application
* Saisir un titre dans un formulaire
* L’article sera **généré par l'IA ChatGPT** 
* Les articles générés seront publiables et **consultables sur le blog** après approbation de celui qui aura généré l’article. 
* Il est aussi possible d'exporter les articles en version Json.
* Les articles pourront être modifiés ou supprimés. 

Actuellement les internaute peuvent consulter les articles postés sur le site. Seul les administrateurs peuvent ajouter des articles, les éditer et les supprimer. 

### Fonctionnalités : 
- Les appels à l’API se font en HTTP sur un serveur Node.js (Express).
Quelque exemple des endpoint :
    * http://localhost:8000/api/auth/signin
    * http://localhost:8000/api/auth/signup
...

- La route /admin est "protégée", on peut y accéder que si l'on est admin (le user est stocké dans le localstorage pour pouvoir accéder à ses données par exemple le rôle pour vérifier ses permissions) et pour le reste des pages ça renvoie un code 404.

- Modèle d'export d'un article en json :
```json
 "articles": [
  {
   "_id": "64b0252646036610f2ad15f5",
   "title": "About the dev community",
   "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis facilisis cursus. Donec nec sagittis odio. Cras dapibus diam ac malesuada sagittis. Donec pulvinar massa lectus, vel varius urna efficitur non. Vestibulum sollicitudin sapien nec risus mattis, vel molestie neque varius. In hendrerit et lacus sagittis sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis tristique quis dolor non convallis. Aenean quis tempus felis.\n\nVestibulum tempor quam commodo neque venenatis, a scelerisque ante tempor. Nulla facilisi. Sed in placerat mi. Praesent mollis a est eu consectetur. Proin et elit fermentum, luctus lorem vitae, faucibus velit. Donec rhoncus est at est posuere, congue commodo elit varius. Phasellus gravida, nunc vitae gravida feugiat, dolor diam aliquet odio, id ullamcorper lectus nisi at leo. Donec laoreet massa sit amet diam tincidunt, at gravida magna laoreet.",
   "author": "sofia",
   "isPublished": true,
   "__v": 0
  },
]
```


## Pré-requis 🎨

- Node 12+ pour Quasar CLI avec Webpack, Node 14+ pour Quasar CLI avec Vite.
- Yarn v1 (fortement recommandé), ou NPM.
- Docker


## Installation

1. Clonez le projet
```sh
git clone https://github.com/kbakazami/blog_ia_4iw.git
```

2. Aller dans le dossier /front
```bash
cd front
```

3. Installation des dépendances
```bash
yarn install
```

4. Installer Quasar CLI, un outil en ligne de commande qui se chargera de booter un projet complet a votre place et de lancer le projet
```bash
yarn global add @quasar/cli
# ou
npm install -g @quasar/cli
```

5. Revenir dans le dossier source
```bash
cd ..
```

6. Pour la connexion à la BDD et compass
```bash
docker compose up -d
```

7. Aller dans le dossier /api
```bash
cd api
```

8. Installer les dépendances npm
```bash
npm i
```
    
9. Ajouter un fichier .env dans le dossier "api" avec les constantes suivantes :
```env
PORT=
URI_DB=
JWT_SECRET=
```

## Démarrage

1. Lancer le front de l'application
```bash
quasar dev
```

2. Lancer docker pour que la connexion avec mongodb soit effective
   
3. Lancer le serveur node
```bash
npm run dev
```

* Admin - List Articles : 

![Admin dashboard](https://cdn.discordapp.com/attachments/1127879001633984704/1129148277795860570/image.png)

* Front - Si on est admin

![Admin front](https://cdn.discordapp.com/attachments/1127879001633984704/1129148680990109746/image.png)

* Front - Si on est user et/ou pas connecté

![User front](https://cdn.discordapp.com/attachments/1127879001633984704/1129153553722773614/image.png)

## Fabriqué avec 🛒

✔ [Vuejs](https://vuejs.org/) - Pour toute la partie front de l'application

✔ [Quasar](https://quasar.dev/) - Une surcouche de vuejs pour augmente la réactivité et les performance de l'application vuejs

✔ [Node](https://nodejs.org/) - Permet le développement de la partie Backend de l'application ainsi que l'API

✔ [Express.js](https://expressjs.com/fr/) - Améliore le développement sur Node

✔ [Mongodb](https://www.mongodb.com/fr-fr) - Base de donnée

✔ [Docker](https://www.docker.com/) - Pour lancer mongodb en arrière plan

✔ [Github](https://github.com/) - Versionning

✔ [Trello](https://trello.com/fr) - Suivi du projet et des tâches

✔ [Swagger](https://swagger.io/) - Permet de générer une doc pour l'API


## Architecture 
La partie front du projet se trouve dans le dossier "front". C'est dans ce dossier qu'on trouve les fichier vuejs.
* Les entités (user/auth/articles) + les requêtes à l'api sont dans des stores pinia
* Les forms ont vocation à être réutilisés. Ils sont donc dans /components
* Les vues sont "fragmentées" : les vues de l'admin sont dans pages/Admin/fichier.vue et le front dans pages/fichier.vue. Les components sont placés de la même manière.

La partie back se trouve dans le dossier "api". C'est là qu'on trouve les routes API
* /config : swager, api, dbb
* /controllers : logique metier et methode CRUD
* /middlerwares : securité, rôle, verification
* /models : models de donnée pour mongodb
* /routes : les couches de logique metier, associer controller à une route


## Procédure en cas de bug
En cas de bug identifier et reproduire le bug, isoler la cause, créer des tests puis vérifier les dépendances. 
Effectuer des tests de régression : Avant de mettre en place une solution potentielle, s'assurer de tester l'application dans son ensemble pour éviter de provoquer d'autres bugs ou de casser des fonctionnalités existantes. Implémenter et tester des correctifs puis documenter les étapes de résolution.


## Proposition mise en place d’un outil BI 
La "balise Google Analytics" est une bibliothèque JavaScript permettant de mesurer la manière dont les utilisateurs interagissent avec notre site Web. La balise Google Analytics doit être ajoutée en haut de la balise ```html<head>``` et avant toute autre balise de script ou CSS.

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

🔎 Ces données seront très importantes pour évaluer et comprendre l'expérience des différents utilisateurs sur l'application afin de déterminer quelles fonctionnalités sont particulièrement appréciés par les internautes et lequelles devront être ajouté en priorité dans les futures taches.


## Propositions d’évolution de l’architecture
* Actuellement seul les administrateurs peuvent ajouter, éditer ou supprimer des articles. C'est-à-dire que les utilisateurs ne peuvent que consulter les articles. Dans une nouvelle version de l'application les internautes pourront poster des commentaires pour chaque articles.

* Dans une future évolution de l'application, il sera possible d'ajouter un système de catégories pour les différents articles. Une nouvelle table "category" pourra être ajouté à la BDD. Ainsi les articles pourront être organisés par catégorie. 

* Faire l'update de l'utilisateur : modifier ses informations et aussi permettre d'ajouter le rôle admin par exemple.

* I18n est un plugin d'internationalisation pour Vue.js intégré par Quasar directement lorsque l'on créé un nouveau projet sous Quasar (si on choisit l'option). Il permet de gérer les taductions de l'application. Il s'agit d'ouvrir le projet à un public plus large dans une nouvelle version de l'application. L'installation est très simple si on ne l'a pas pris lors de la création :
```bash
npm install vue-i18n@9
# ou
yarn add vue-i18n@9 
```
Il est actuellement disponible sur le projet.

## Auteurs 🎭

* **Sofia CHAUDHRY** _alias_ [@AifosXI](https://github.com/AifosXI)
* **Wyvin STRUYS** _alias_ [@kbakazami](https://github.com/kbakazami)
* **Rédouane RÉMILI** _alias_ [@FinOrfy](https://github.com/FinOrfy)

<p align="right">(<a href="#readme-top">retour en haut ⬆</a>)</p>
