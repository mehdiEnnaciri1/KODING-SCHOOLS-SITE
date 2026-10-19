export const lessonSources = {
  video: "https://www.youtube.com/embed/zZsFsP6izLs?rel=0",
  videoPage: "https://www.youtube.com/watch?v=zZsFsP6izLs",
  slides: "https://docs.google.com/presentation/d/e/2PACX-1vQa5LesJomO-kqu9bHEJyFeHs-RDJD597LYbhEiwPiqVhjiGjfJwU9Dc__CrVTejw/embed?start=false&loop=false&delayms=3000&slide=id.p2",
  script: "https://drive.google.com/file/d/1p2PwCY6IQ3ZsYMQ6ZIq2BYtZxnd3PlkC/preview",
  activity: "https://kodingschools.com/wp-content/blockly/maze/text/C2L3/5/index.php?langue=fr",
  workbook: "https://drive.google.com/file/d/1zeZc9PmCwbcMB-n4km518XVDMxZPMp0D/preview",
} as const;

export const lessonResources = [
  { name: "Préparer", moment: "Avant la classe", support: "Vidéo & script", title: "La vidéo de préparation.", description: "Revoir les notions, les exemples et le déroulé du cours avant de retrouver les élèves.", image: "video-preparation.png", width: 1114, height: 558, alt: "Extrait de la vidéo de préparation du cours Introduction aux algorithmes et programmes", action: "Voir la vidéo", detail: "22 min 26", source: lessonSources.video, fallback: lessonSources.videoPage, caption: "Vidéo enseignant · Introduction Algorithmes & programmes" },
  { name: "Animer", moment: "Avec toute la classe", support: "Slides à projeter", title: "Les supports pour lancer la discussion.", description: "« Qu’est-ce qu’on peut programmer ? » Une question du cours pour faire participer la classe.", image: "slides-premiere.png", width: 1380, height: 775, alt: "Première diapositive réelle : Introduction aux algorithmes et programmes", action: "Parcourir les slides", detail: "46 diapositives", source: lessonSources.slides, fallback: lessonSources.slides, caption: "Diapositive 1 · Introduction Algorithmes & programmes" },
  { name: "Faire pratiquer", moment: "À eux de jouer", support: "Pratique & projets", title: "Construire, essayer, corriger.", description: "Des activités ciblées pour s’entraîner, et surtout des projets pour créer et mobiliser les acquis.", image: "blockly-sequence.png", width: 1580, height: 626, alt: "Activité Blockly réelle : un labyrinthe pour Kobot et les blocs Avancer et Tourner", action: "Essayer l’activité", detail: "Labyrinthe : séquence", source: lessonSources.activity, fallback: lessonSources.activity, caption: "Exemple d’activité ciblée · Blockly : labyrinthe séquentiel" },
  { name: "Consolider", moment: "Garder une trace", support: "Cahier de l’élève", title: "Le raisonnement se poursuit sur papier.", description: "Un cahier papier, imprimable, pour récapituler l’essentiel des cours.", image: "cahier-premiere-page.png", width: 500, height: 707, alt: "Première page du cahier imprimable : l’essentiel à retenir du cours Algorithme séquentiel", action: "Feuilleter le cahier", detail: "20 pages", source: lessonSources.workbook, fallback: lessonSources.workbook, caption: "Première page · Cahier Algorithme séquentiel" },
] as const;
