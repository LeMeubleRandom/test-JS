//////////////////////// Code fourni (ne pas modifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille =
  Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) +
  taille_minimum;

// Déclarer le tableau pour stocker les notes
let students = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

let students_name = [
  "Antoine",
  "Jeremy",
  "Enzo",
  "Kenzo",
  "Maxime",
  "Johan",
  "Pierre",
  "Gabriel",
  "Thomas",
  "Nathan",
  "Nathanael",
  "Marion",
  "Maeva",
  "Marine",
  "Achille",
  "Alexis",
]; //Liste de prénoms qui vont être distribué aléatoirement

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
  // générer un objet student avec un nom et un bulletin de note aléatoire
  let student_name =
    students_name[Math.floor(Math.random() * students_name.length)];
  let randnoteFrançais = Math.floor(Math.random() * (note_maximum + 1));
  let randnoteMaths = Math.floor(Math.random() * (note_maximum + 1));
  let randnoteHistoire = Math.floor(Math.random() * (note_maximum + 1));
  // Ajouter l'élève généré au tableau
  students.push({
    name: student_name,
    noteFrançais: randnoteFrançais,
    noteMaths: randnoteMaths,
    noteHistoire: randnoteHistoire,
    moy: 0,
  });
}

///////////////////////////////////////////////////////////////////////////////

console.log("Partie 1 :");

console.log(students);

for (let i = 0; i < students.length; i++) {
  let average_rate = Math.floor(
    (students[i].noteFrançais +
      students[i].noteMaths +
      students[i].noteHistoire) /
      3
  ); //calcul la moyenne des élèves
  students[i].moy = average_rate; //ajoute la moyenne à l'élève associé
  console.log(students[i].name, students[i].moy);
}

console.log(students);

let doppelganger = [];
for (let i = 0; i < students.length; i++) {
  doppelganger.push(students[i]);
} //créer une copie du tableau avant les changements

console.log("Partie 2 :");

let student_count = 0;

students.forEach((element) => {
  student_count++;
}); //compte le nombre d'élèves

console.log("nombre d'élève :", student_count);

let min = students[0].moy;
let max = students[0].moy;

for (let i = 0; i < students.length; i++) {
  if (min > students[i].moy) min = students[i].moy;
} //calcul la plus petite moyenne
for (let i = 0; i < students.length; i++) {
  if (max < students[i].moy) max = students[i].moy;
} //calcul la plus grande moyenne

console.log("plus petite moyenne :", min);
console.log("plus grande moyenne :", max);

console.log("Partie 3 :");

let min_emplacement = 0;

for (let i = 0; i < students.length; i++) {
  if (min === students[i].moy) {
    min_emplacement = i;
  } //récupère l'emplacement de l'élève qui a la plus petite moyenne
}

console.log(
  "élève :",
  students[min_emplacement].name,
  "moyenne :",
  students[min_emplacement].moy,
  "indice :",
  min_emplacement
);

console.log("Partie 4 :");

let swap = students[min_emplacement];
students[min_emplacement] = students[0];
students[0] = swap;
//échange l'élève à la plus petite moyenne avec l'élève à l'emplacement 0

console.log(students);

console.log("Partie 5 :");

let counter_check = 0;
let counter_swap = 0; //initialise les compteurs

//Tri automatiquement les chiffres du tableau dans l'ordre croissant
students.forEach((note, index) => {
  for (let i = index; i < students.length; i++) {
    counter_check++;
    if (students[index].moy > students[i].moy) {
      swap = students[index];
      students[index] = students[i];
      students[i] = swap;
      counter_swap++;
      //échange les élèves
      console.log(students);
    }
  }
});

students.forEach((student, index) => {
  console.log(students[index]);
}); //affiche les élèves de manière plus jolie

console.log("Partie 6 :");

console.log("Avant le tri");
doppelganger.forEach((student, index) => {
  console.log(doppelganger[index]);
}); //affiche la copie du tableau avant le tri

console.log("Après le tri :");
students.forEach((student, index) => {
  console.log(students[index]);
}); //affiche le tableau après le tri

console.log("Nombre de vérifications :", counter_check);
console.log("Nombre d'échanges :", counter_swap);
//affiche les compteurs de vérification et d'échange

console.log("Bonus :");

//tri les élèves en fonction de leur moyenne de Français
students.forEach((note, index) => {
  for (let i = index; i < students.length; i++) {
    counter_check++;
    if (students[index].noteFrançais > students[i].noteFrançais) {
      swap = students[index];
      students[index] = students[i];
      students[i] = swap;
      counter_swap++;
    }
  }
});

students.forEach((student, index) => {
  console.log(students[index]);
}); //affiche les élèves après toutes les modifications
