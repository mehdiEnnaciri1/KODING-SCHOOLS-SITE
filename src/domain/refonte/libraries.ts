export interface Library { name: string; city: "Casablanca" | "Marrakech" | "En ligne"; address: string; url: string; }
// Public directory on kodingschools.com/fr/#Librariesfr, observed 2026-10-01.
export const libraries: readonly Library[] = [
  {name:"Librairie Alirtikae",city:"Casablanca",address:"2, Hay Al Inara",url:"https://maps.app.goo.gl/V5Z71KFytCMaqvnX8"},
  {name:"Librairie Papeterie Khalsi",city:"Casablanca",address:"60, rue Moussa Bnou Noussair, quartier Gauthier",url:"https://maps.app.goo.gl/qwzrFo6qgYZaxGhd7"},
  {name:"Bookdelivery",city:"En ligne",address:"Commander sur bookdelivery.ma",url:"https://bookdelivery.ma/"},
  {name:"ABCD Izdihar",city:"Marrakech",address:"340, lotissement Izdihar Extension",url:"https://maps.app.goo.gl/m6H7cn4VLCiw5BRQ8"},
  {name:"Librairie Chatr",city:"Marrakech",address:"19–21, avenue Mohammed V",url:"https://maps.app.goo.gl/5Ts2eFaWrZkyNbEL8"},
  {name:"Librairie La Plume Tita",city:"Marrakech",address:"Lot Atlas, n° 97, Issil",url:"https://maps.app.goo.gl/JQtiESWCZNbYPKMD7"},
  {name:"Saada Menara",city:"Marrakech",address:"Aïn Mezouar, lot Saada Menara n° 5, immeuble 158",url:"https://maps.app.goo.gl/FoEiT1Wwi55mZmiA6?g_st=aw"},
  {name:"Alabadila Assanoubar",city:"Marrakech",address:"340, Izdihar Extension",url:"https://maps.app.goo.gl/PJo9rrSJ1uXCJupAA"},
  {name:"Librairie Papeterie Faissal",city:"Marrakech",address:"108, cité Mohammadi, unité 4, Daoudiate",url:"https://maps.app.goo.gl/yDK6a4qWzqQaETC6A"},
  {name:"Izdihar",city:"Marrakech",address:"N° 155, lot Al Izdihar, immeuble Kadissia",url:"https://maps.app.goo.gl/2fYF8EddpnyMW6xm9"},
  {name:"Ben Saoud",city:"Marrakech",address:"Rue Mekka, immeuble 35, résidence Majorelle, magasin n° 2, avenue Y, rue Moulay Abdellah",url:"https://maps.app.goo.gl/U7YTRNxoM8qWenPY7?g_st=aw"},
  {name:"Librairie du Lycée – Chatr",city:"Marrakech",address:"N° 3, résidence Guéliz, route de Targa",url:"https://maps.app.goo.gl/8W7fWkciWCYi1j8k7"},
  {name:"Librairie Guéliz",city:"Marrakech",address:"N° 2, rue Sourya, Guéliz",url:"https://maps.app.goo.gl/E217xZtjjJhdWLZS7?g_st=aw"},
  {name:"Librairie Papeterie Jnane",city:"Marrakech",address:"Izdihar",url:"https://maps.app.goo.gl/WrvpssW7gSjSbMm3A"},
  {name:"El Bachir Marrakech",city:"Marrakech",address:"203, rue Mohamed El Beqal, Guéliz",url:"https://maps.app.goo.gl/PecqcibMiocRw6SX6"},
  {name:"Marrakech Books",city:"Marrakech",address:"N° 7A, immeuble 86, Izdihar Extension",url:"https://maps.app.goo.gl/WN76vdAdvRpuPiDW6"},
];
