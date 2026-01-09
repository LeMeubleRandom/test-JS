console.log("Partie 1 :");

function genererEleves() {
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
    let average_rate = Math.floor(
      (randnoteFrançais + randnoteMaths + randnoteHistoire) / 3
    ); //calcul la moyenne des élèves
    // Ajouter l'élève généré au tableau
    students.push({
      name: student_name,
      noteFrançais: randnoteFrançais,
      noteMaths: randnoteMaths,
      noteHistoire: randnoteHistoire,
      moy: average_rate,
    });
  }
  return students;
}

console.log("Partie 2 :");

function afficherEleves(tab) {
  tab.forEach((student) => {
    console.log(student.name, student.moy);
  });
}

console.log("Partie 3 :");

function trouverMoyenneMin(tab, indexDepart) {
  let min = 20;
  let index = indexDepart;
  for (let i = indexDepart; i < tab.length; i++) {
    if (min > tab[i].moy) {
      min = tab[i].moy;
      index = i;
    }
  }
  return index;
}

function trouverMoyenneMax(tab, indexDepart) {
  let max = 20;
  let index = indexDepart;
  for (let i = indexDepart; i < tab.length; i++) {
    if (max < tab[i].moy) {
      max = tab[i].moy;
      index = i;
    }
  }
  return index;
}

function student_count(tab) {
  let student_count = 0;

  tab.forEach((element) => {
    student_count++;
  });
  return student_count;
}

console.log("Partie 4 :");

function afficherDonnees(tab) {
  afficherEleves(tab);
  console.log(
    "nombre d'élèves :",
    student_count(tab),
    "\nmoyenne la plus basse :",
    tab[trouverMoyenneMin(tab, 0)].moy,
    "\nmoyenne la plus haute :",
    tab[trouverMoyenneMax(tab, 0)].moy
  );
}

console.log("Partie 5 :");

function swap(tab, indexA, indexB) {
  let swap = tab[indexA];
  tab[indexA] = tab[indexB];
  tab[indexB] = swap;
}

console.log("Partie 6 :");

function triParSelection(tab) {
  tab.forEach((eleve, index) => {
    for (let i = index; i < tab.length; i++) {
      if (eleve.moy > eleve.moy) {
        swap(tab, index, i);
      }
    }
  });
  afficherDonnees(tab);
}

console.log("Partie 7 :");

triParSelection(genererEleves());
