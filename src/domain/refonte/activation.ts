export type ProgrammeLanguage = "fr" | "en";

// Canonical WordPress routes: WooCommerce retains the cart, payment,
// licence generation, coupons and school-year subscription lifecycle.
export const activationRoutes = {
  fr: {
    label: "Français",
    annualPrice: 119,
    access: "https://kodingschools.com/fr/access",
    purchase: "https://kodingschools.com/fr/manuel-fr/",
  },
  en: {
    label: "Anglais",
    annualPrice: 149,
    access: "https://kodingschools.com/en/access",
    purchase: "https://kodingschools.com/fr/manuel-en/",
  },
} as const;

// Entrée quotidienne commune aux élèves, enseignants et administrateurs.
export const LOGIN_URL = "https://kodingschools.com/fr/access";
