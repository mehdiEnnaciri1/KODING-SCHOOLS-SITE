export const domains = [
  { code: "01", icon: "code", name: "Algorithmie & programmation", verb: "Passer de l’idée au programme.", description: "Construire une séquence, résoudre un problème et créer ses propres projets. Des premiers blocs visuels aux langages de programmation.", examples: ["Blockly & Scratch", "Python", "Web & applications"] },
  { code: "02", icon: "chip", name: "Technologie", verb: "Comprendre ce qui se passe derrière l’écran.", description: "Explorer les ordinateurs, les réseaux, Internet et le fonctionnement de l’intelligence artificielle, avec des exemples à la portée de chaque âge.", examples: ["Électronique virtuelle", "Robotique virtuelle", "Intelligence artificielle"] },
  { code: "03", icon: "shield", name: "Citoyenneté digitale", verb: "Faire des choix éclairés dans le monde numérique.", description: "Protéger sa vie privée, questionner les sources et comprendre les biais. Développer un regard critique sur les outils numériques et l’IA.", examples: ["Cyberharcèlement", "Sécurité", "Fake news"] },
  { code: "04", icon: "pen", name: "Bureautique & médias", verb: "Donner forme à ses idées.", description: "Créer des documents, des présentations et des contenus multimédias. Explorer les outils de création, y compris ceux qui s’appuient sur l’IA.", examples: ["Podcast IA", "Design", "Présentations", "Traitement de texte"] },
  { code: "05", icon: "chart", name: "Information & data", verb: "Lire, organiser et faire parler les données.", description: "Classer l’information, représenter des données et apprendre à les analyser. Une progression des premières collections à la data science.", examples: ["Tableurs", "Bases de données", "Data science"] },
] as const;

export const stages = [
  { name: "Primaire", levels: "1AP → 6AP", title: "Les premières bases du numérique.", description: "Les élèves découvrent les outils numériques et apprennent à construire leur raisonnement, avec des activités visuelles et des projets adaptés à leur âge.", examples: ["Programmer avec des blocs", "Créer des médias", "Adopter de bons réflexes numériques"], rhythm: "Environ 1 h par semaine" },
  { name: "Collège", levels: "1AC → 3AC", title: "Des projets plus autonomes.", description: "Les projets se complexifient : programmation, données, création et esprit critique. Les élèves relient les concepts et mobilisent leurs acquis.", examples: ["Développer avec Python", "Créer des applications", "Analyser les enjeux de l’IA"], rhythm: "Environ 1 h 30 par semaine" },
  { name: "Lycée", levels: "Tronc commun", title: "Relier les savoirs à des projets.", description: "La première année du lycée poursuit le parcours avec la programmation, les bases de données, la création d’interfaces et la data science.", examples: ["Structurer des données", "Concevoir des interfaces", "Approfondir la programmation"], rhythm: "Un rythme à organiser avec l’école" },
] as const;

export const questions = [
  { q: "Comment les enseignants sont-ils accompagnés ?", a: "Une formation de démonstration et des guides facilitent la prise en main. Pour préparer chaque séance, les enseignants disposent d’une vidéo, d’un script et de slides, ainsi que de l’assistant pédagogique AIA." },
  { q: "Et si nos élèves n’ont jamais fait d’informatique ?", a: "Un positionnement initial permet de choisir le bon point de départ. Des programmes transitoires regroupent au début les niveaux qui ont des acquis proches, puis se différencient progressivement pour rejoindre le programme cible." },
  { q: "Quel équipement faut-il prévoir ?", a: "Des ordinateurs pour les activités pratiques, un vidéoprojecteur et une connexion Internet en classe. Un ordinateur à la maison n’est pas un prérequis. Le cahier de l’élève peut être imprimé par l’école." },
  { q: "Quel rythme prévoir dans l’emploi du temps ?", a: "Nous préconisons une séance par semaine : environ 1 heure au primaire et 1 h 30 au collège. L’enseignant conserve la liberté d’adapter le déroulé et de proposer des exercices en devoirs si nécessaire." },
  { q: "Comment fonctionnent les licences élèves ?", a: "La licence couvre une année scolaire : 119 DH pour le programme en français et 149 DH en anglais. Selon l’organisation de l’école, l’activation se fait par l’établissement, avec un code de licence ou par paiement depuis le compte élève. Il faut renouveler l’activation pour l’année scolaire suivante." },
  { q: "Le programme est-il disponible en français et en anglais ?", a: "Oui. Les dix niveaux du programme sont disponibles en français et en anglais. L’école choisit la langue d’enseignement du programme." },
] as const;

export const curriculumModules = [
  {
    "label": "Programmation",
    "title": "De Blockly aux langages de programmation.",
    "description": "Les élèves commencent par des blocs visuels, puis abordent le web, Python et les applications. L’électronique et la robotique virtuelles donnent un contexte concret aux boucles, conditions et variables.",
    "examples": [
      {
        "level": "4AP",
        "title": "Programmer en électronique virtuelle",
        "sourceCell": "F5"
      },
      {
        "level": "3AP",
        "title": "Guider un robot virtuel avec des boucles",
        "sourceCell": "E5"
      },
      {
        "level": "6AP",
        "title": "Créer une page web en HTML et CSS",
        "sourceCell": "H5"
      },
      {
        "level": "3AC",
        "title": "Développer une application mobile avec l’IA",
        "sourceCell": "K5"
      }
    ],
    "progression": [
      {
        "level": "1AP",
        "title": "Algorithmes séquentiels &Répétitions avec Scratch JR",
        "sourceCell": "C5"
      },
      {
        "level": "2AP",
        "title": "Repetitions & Événements (Blockly et Scratch)",
        "sourceCell": "D5"
      },
      {
        "level": "3AP",
        "title": "Autres boucles et imbrications(Blockly, Scratch et robotique)",
        "sourceCell": "E5"
      },
      {
        "level": "4AP",
        "title": "Conditions (Blockly, robotique et électronique)",
        "sourceCell": "F5"
      },
      {
        "level": "5AP",
        "title": "Variables et Fonctions(robotique et électronique)",
        "sourceCell": "G5"
      },
      {
        "level": "6AP",
        "title": "1- Web(HTML/CSS) 2-Introduction aux flowcharts et à Python",
        "sourceCell": "H5"
      },
      {
        "level": "1AC",
        "title": "1- Python avancé avec IA 2- JavaScript",
        "sourceCell": "I5"
      },
      {
        "level": "2AC",
        "title": "1- SQL 2- Application mobile",
        "sourceCell": "J5"
      },
      {
        "level": "3AC",
        "title": "1- Application mobile avec IA 2- Programmation orientée objet 1",
        "sourceCell": "K5"
      },
      {
        "level": "Tronc commun",
        "title": "1-PHP 2-Programmation orientée objet 2",
        "sourceCell": "L5"
      }
    ]
  },
  {
    "label": "Technologie",
    "title": "Du binaire à l’intelligence artificielle.",
    "description": "Comment l’ordinateur représente-t-il une information ? Comment fonctionne l’IA ? Le programme relie les concepts aux ordinateurs, aux réseaux et aux technologies que les élèves utilisent.",
    "examples": [
      {
        "level": "3AP",
        "title": "Découvrir l’intelligence artificielle",
        "sourceCell": "E6"
      },
      {
        "level": "1AC",
        "title": "Approfondir le fonctionnement de l’IA",
        "sourceCell": "I6"
      },
      {
        "level": "2AC",
        "title": "Comprendre le codage de l’information",
        "sourceCell": "J6"
      },
      {
        "level": "3AC",
        "title": "S’initier à la cryptographie",
        "sourceCell": "K6"
      }
    ],
    "progression": [
      {
        "level": "1AP",
        "title": "La technologie autour de nous",
        "sourceCell": "C6"
      },
      {
        "level": "2AP",
        "title": "Ordinateurs",
        "sourceCell": "D6"
      },
      {
        "level": "3AP",
        "title": "Intelligence Artificielle",
        "sourceCell": "E6"
      },
      {
        "level": "4AP",
        "title": "Réseaux",
        "sourceCell": "F6"
      },
      {
        "level": "5AP",
        "title": "Internet",
        "sourceCell": "G6"
      },
      {
        "level": "6AP",
        "title": "Histoire de l'informatique & réseaux avancés",
        "sourceCell": "H6"
      },
      {
        "level": "1AC",
        "title": "Intelligence Artificielle avancé",
        "sourceCell": "I6"
      },
      {
        "level": "2AC",
        "title": "Introduction aux bases du codage informatique",
        "sourceCell": "J6"
      },
      {
        "level": "3AC",
        "title": "Cryptographie",
        "sourceCell": "K6"
      },
      {
        "level": "Tronc commun",
        "title": "Systèmes d’exploitation",
        "sourceCell": "L6"
      }
    ]
  },
  {
    "label": "Citoyenneté",
    "title": "Grandir avec un regard critique.",
    "description": "Protéger ses comptes, repérer une information douteuse, réagir au cyberharcèlement. Les situations étudiées évoluent avec l’âge et les usages des élèves.",
    "examples": [
      {
        "level": "3AP",
        "title": "Sécuriser ses mots de passe",
        "sourceCell": "E7"
      },
      {
        "level": "6AP",
        "title": "Reconnaître le phishing et vérifier une information",
        "sourceCell": "H7"
      },
      {
        "level": "1AC",
        "title": "Prévenir le cyberharcèlement et repérer les biais de l’IA",
        "sourceCell": "I7"
      },
      {
        "level": "2AC",
        "title": "Comprendre l’éthique de l’IA et le big data",
        "sourceCell": "J7"
      }
    ],
    "progression": [
      {
        "level": "1AP",
        "title": "Technologie & émotions / L'équilibre des médias / Les feux de circulation sur internet",
        "sourceCell": "C7"
      },
      {
        "level": "2AP",
        "title": "Donnons du crédit (citer les sources) / Communauté en ligne / Pistes numériques / La méchanceté en ligne",
        "sourceCell": "D7"
      },
      {
        "level": "3AP",
        "title": "La recherche sur Internet / Protéger votre mot de passe / Mon Empreinte numérique / Le pouvoir des mots(Pratiquer la gentillesse)",
        "sourceCell": "E7"
      },
      {
        "level": "4AP",
        "title": "Mes choix de médias / Informations privées vs personnelles / Soyez un super citoyen numérique / Droits et responsabilités d'un créateur",
        "sourceCell": "F7"
      },
      {
        "level": "5AP",
        "title": "Trouver l'équilibre dans un monde numérique / Eviter le clickbait / Nos pistes en ligne (stéréotypes de genre) / Les actualités en ligne",
        "sourceCell": "G7"
      },
      {
        "level": "6AP",
        "title": "Habitudes technologiques positives / Se protéger du phishing / Chatter en ligne en toute sécurité / Trouver des actualités crédibles",
        "sourceCell": "H7"
      },
      {
        "level": "1AC",
        "title": "Qui es-tu en ligne ? / Ma vie sur les réseaux sociaux / Agir contre la cyberintimidation / Comprendre les biais de l'IA",
        "sourceCell": "I7"
      },
      {
        "level": "2AC",
        "title": "L’éthique de l’IA / la Big data et nous / Discussion et signaux d’alarme / Les médias numériques et votre cerveau",
        "sourceCell": "J7"
      },
      {
        "level": "3AC",
        "title": "Comprendre le Business Model pour les Entreprises / Les droits d'utilisation équitable en tant que créateur / Protéger sa réputation en ligne",
        "sourceCell": "K7"
      },
      {
        "level": "Tronc commun",
        "title": "Réseaux sociaux et émotions / Évaluation des risques liés aux nouvelles technologies / Lutter contre les discours haineux en ligne / Remettre en question le biais de confirmation",
        "sourceCell": "L7"
      }
    ]
  },
  {
    "label": "Médias",
    "title": "Créer des contenus dont on est fier.",
    "description": "La création accompagne tout le parcours : images, textes, présentations, audio, vidéo et design. L’IA devient un outil que les élèves apprennent à utiliser et à questionner.",
    "examples": [
      {
        "level": "3AP",
        "title": "Publier et créer des designs avec l’IA",
        "sourceCell": "E8"
      },
      {
        "level": "4AP",
        "title": "Rédiger et mettre en page un document",
        "sourceCell": "F8"
      },
      {
        "level": "5AP",
        "title": "Concevoir une présentation avec l’IA",
        "sourceCell": "G8"
      },
      {
        "level": "1AC",
        "title": "Produire un podcast avec l’IA",
        "sourceCell": "I8"
      }
    ],
    "progression": [
      {
        "level": "1AP",
        "title": "Musique digitale",
        "sourceCell": "C8"
      },
      {
        "level": "2AP",
        "title": "Peinture digitale",
        "sourceCell": "D8"
      },
      {
        "level": "3AP",
        "title": "Publication et design avec IA",
        "sourceCell": "E8"
      },
      {
        "level": "4AP",
        "title": "Traitement de texte avec IA",
        "sourceCell": "F8"
      },
      {
        "level": "5AP",
        "title": "Compétences en présentation avec IA",
        "sourceCell": "G8"
      },
      {
        "level": "6AP",
        "title": "Création Page Web avec IA",
        "sourceCell": "H8"
      },
      {
        "level": "1AC",
        "title": "Production audio avec IA",
        "sourceCell": "I8"
      },
      {
        "level": "2AC",
        "title": "Production vidéo avec IA",
        "sourceCell": "J8"
      },
      {
        "level": "3AC",
        "title": "Modélisation 3D avec IA",
        "sourceCell": "K8"
      },
      {
        "level": "Tronc commun",
        "title": "UX/UI Design et prototypage (Figma)",
        "sourceCell": "L8"
      }
    ]
  },
  {
    "label": "Data",
    "title": "Comprendre ce que racontent les données.",
    "description": "Classer, visualiser, calculer, puis analyser et modéliser : les élèves construisent progressivement les bases nécessaires pour travailler avec les données.",
    "examples": [
      {
        "level": "3AP",
        "title": "Collecter et représenter des données",
        "sourceCell": "E9"
      },
      {
        "level": "5AP",
        "title": "Découvrir le tableur",
        "sourceCell": "G9"
      },
      {
        "level": "2AC",
        "title": "Analyser avec les tableaux croisés dynamiques",
        "sourceCell": "J9"
      },
      {
        "level": "3AC",
        "title": "S’initier à la data science",
        "sourceCell": "K9"
      }
    ],
    "progression": [
      {
        "level": "1AP",
        "title": "Donnée et Groupes & Représentation de l'information",
        "sourceCell": "C9"
      },
      {
        "level": "2AP",
        "title": "Arbres et Branches",
        "sourceCell": "D9"
      },
      {
        "level": "3AP",
        "title": "Collecter et visualiser les données",
        "sourceCell": "E9"
      },
      {
        "level": "4AP",
        "title": "Bases de données",
        "sourceCell": "F9"
      },
      {
        "level": "5AP",
        "title": "Introduction aux feuilles de calcul",
        "sourceCell": "G9"
      },
      {
        "level": "6AP",
        "title": "Excel : Les Fonctions de Base",
        "sourceCell": "H9"
      },
      {
        "level": "1AC",
        "title": "Excel avancé(Les autres fonctions)",
        "sourceCell": "I9"
      },
      {
        "level": "2AC",
        "title": "Excel avancé - Tableau croisé dynamique",
        "sourceCell": "J9"
      },
      {
        "level": "3AC",
        "title": "Data science",
        "sourceCell": "K9"
      },
      {
        "level": "Tronc commun",
        "title": "Modélisation (MCD/MER)",
        "sourceCell": "L9"
      }
    ]
  }
] as const;
