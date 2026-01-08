//////////////////////// Code fourni (ne pas modifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // Générer une note aléatoire entre 0 et note_maximum (inclus)
  let note = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter la note générée au tableau
  notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

let post_notes = [];
for (let i = 0; i < notes.length; i++) {
  post_notes.push(notes[i]);
} // crée une copie du tableau d'origine

console.log("Partie 1 : Affichage des paramètres");
console.log("taille :", notes.length);

let min = notes[0];

for (let i = 0; i < notes.length; i++) {
  if (min > notes[i]) min = notes[i];
} //vérifie quel chiffre du tableau est le plus petit

console.log("max :", min);

let max = notes[0];

for (let i = 0; i < notes.length; i++) {
  if (max < notes[i]) max = notes[i];
} //vérifie quel chiffre du tableau est le plus grand

console.log("max :", max);

console.log("tab :", notes);

console.log("Partie 2 :");

let min_emplacement = 0;

for (let i = 0; i < notes.length; i++) {
  if (min === notes[i]) {
    console.log("min :", notes[i], "indice :", i);
    min_emplacement = i;
  }
} //vérifie quel est l'emplacement du chiffre le plus petit

console.log("Partie 3 :");

let swap = 0;
/*swap = min;
notes[min_emplacement] = notes[0];
notes[0] = swap;
*/
//echange de place le premier chiffre et le plus petit chiffre dans le tableau

console.log(notes);

console.log("Partie 4 :");

min = notes[0];
let counter_check = 0;
let counter_swap = 0;

//Tri automatiquement les chiffres du tableau dans l'ordre croissant
notes.forEach((note, index) => {
  for (let i = index; i < notes.length; i++) {
    counter_check++;
    if (notes[index] > notes[i]) {
      swap = notes[index];
      notes[index] = notes[i];
      notes[i] = swap;
      counter_swap++;
      console.log(notes);
    }
  }
});

console.log("Partie 5 :");

console.log("avant :", post_notes);
console.log("après :", notes);
//affiche les tableaux avant et après le tri

console.log("Bonus :");

console.log("Nombre de vérifications :", counter_check);
console.log("Nombre d'échanges :", counter_swap);
//affiche le nomnbre de vérification et d'échange lors du tri croissant

counter_check = 0;
counter_swap = 0;

//Tri automatiquement les chiffres du tableau dans l'ordre décroissant
post_notes.forEach((note, index) => {
  for (let i = index; i < post_notes.length; i++) {
    counter_check++;
    if (post_notes[index] < post_notes[i]) {
      swap = post_notes[index];
      post_notes[index] = post_notes[i];
      post_notes[i] = swap;
      counter_swap++;
      console.log(post_notes);
    }
  }
});

console.log("change l'ordre de croissant à décroissant");
console.log("Décroissant :", post_notes);
console.log("Nombre de vérifications :", counter_check);
console.log("Nombre d'échanges :", counter_swap);
//affiche le nomnbre de vérification et d'échange lors du tri décroissant
