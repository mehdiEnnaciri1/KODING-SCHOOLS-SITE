# Koding Schools — accueil V2

Projet source autonome de la maquette V2. L’accueil est accessible à `/refonte-v2` et la racine `/` y redirige.

## Lancer le projet

Prérequis : Node.js 20 ou plus récent et npm.

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000/refonte-v2`. Pour vérifier une version de production : `npm run check`, puis `npm run build` et `npm run start`.

## Contenu

- Accueil V2, animations du logo et de l’avatar, carrousel des partenaires.
- Pages V2 liées : programme, parents et licences, partenariats, qui sommes-nous.
- Images, polices, logos, extraits de séance et curriculum CSV utilisés par ces pages.
- Code React/Next.js et styles CSS nécessaires. La V1 n’est pas une route de ce projet, même si certains composants partagés conservent son code.

## Intégrations à reprendre avant mise en ligne

Cette archive est un projet Next.js, pas un modèle importable dans Elementor. Les liens de connexion, d’activation, d’achat de licences et de contact pointent vers le site Koding Schools existant. Les transactions et comptes restent gérés par WordPress/WooCommerce ; ils ne sont pas reproduits dans ce projet. Vérifier les URL et les autorisations d’utilisation des logos et médias avant déploiement.
