// Sélection éditoriale du prototype. L’intégration WordPress fournira ces mêmes
// champs depuis les articles, indépendamment de leur modèle de présentation.
export type BlogPreview = {
  id: string;
  category: string;
  title: string;
  image: string;
  href: string;
};

export const featuredArticle: BlogPreview = {
  id: "citoyennete",
  category: "Citoyenneté digitale",
  title: "Comment former nos enfants à une citoyenneté digitale ?",
  image: "/refonte/blog/citoyennete.jpg",
  href: "https://kodingschools.com/fr/comment-former-nos-enfants-a-une-citoyennete-digitale-%f0%9f%9a%80/",
};

export const relatedArticles: readonly BlogPreview[] = [
  {
    id: "programmation",
    category: "Apprendre à programmer",
    title: "Pourquoi enseigner la programmation dès le plus jeune âge ?",
    image: "/refonte/blog/programmation.jpg",
    href: "https://kodingschools.com/fr/pourquoi-enseigner-la-programmation-des-le-plus-jeune-age-%f0%9f%9a%80/",
  },
  {
    id: "aia",
    category: "IA & pédagogie",
    title: "AIA : l’IA contextuelle pédagogique qui transforme l’éducation",
    image: "/refonte/aia-teacher.png",
    href: "https://kodingschools.com/fr/aia-lia-contextuelle-pedagogique-qui-transforme-leducation/",
  },
];

export const blogUrl = "https://kodingschools.com/fr/blog/";
