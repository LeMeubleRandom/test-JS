//Partie 1

const class_name = "pandi"; //Configuration des variables de la classe d'élève
let student_number = 20;
let class_start = true;

console.log(class_name, student_number, class_start);

//Partie 2

let student1 = {
  //objet constituant le nom d'un élève, sa note de maths et de français
  name: "Enzo",
  math_rate: 12,
  french_rate: 13,
};

console.log(student1.name); //affiche enzo dans la console

//Partie 3
let students = [
  //tableau associatif représentant la classe avec différents élèves
  {
    name: "Enzo",
    math_rate: 12,
    french_rate: 13,
  },
  {
    name: "kenzo",
    math_rate: 15,
    french_rate: 9,
  },
  {
    name: "jeremy",
    math_rate: 10,
    french_rate: 10,
  },
];

for (i = 0; i < students.length; i++) {
  console.log(students[i].name); //affiche les noms de tous les élèves
}

//Partie 4

for (i = 0; i < students.length; i++) {
  let average_rate = (students[i].math_rate + students[i].french_rate) / 2;
  console.log(students[i].name, average_rate);
  //affiche les noms des élèves et leurs moyennes
}

//Partie 5

//boucle qui affiche si les élèves sont admis ou refusés en fonction de sa moyenne
for (i = 0; i < students.length; i++) {
  let average_rate = (students[i].math_rate + students[i].french_rate) / 2;
  if (average_rate >= 10) {
    console.log(students[i].name, "admis");
  } else {
    console.log(students[i].name, "refusé");
  }
}

//Partie 6

//donne une mention aux élèves en fonction de leurs moyennes
for (i = 0; i < students.length; i++) {
  let average_rate = (students[i].math_rate + students[i].french_rate) / 2;
  if (average_rate >= 16) {
    console.log(students[i].name, "très bien");
  } else if (average_rate >= 14) {
    console.log(students[i].name, "bien");
  } else if (average_rate >= 12) {
    console.log(students[i].name, "assez bien");
  } else if (average_rate >= 10) {
    console.log(students[i].name, "passable");
  } else {
    console.log(students[i].name, "insuffisant");
  }
}

//Partie 7

students_admis = 0;
i = 0;

while (i < students.length) {
  //boucle qui compte le nombre d'élève admis (moy > 10)
  let average_rate = (students[i].math_rate + students[i].french_rate) / 2;
  if (average_rate >= 10) {
    students_admis++;
  }
  i++;
}

console.log(students_admis);

//Partie Bonus

students.push({ name: "Antoine", math_rate: 20, french_rate: 7 });
// ajoute un élève au tableau de la classe

class_average_rate = 0;
success_check = 0;

for (i = 0; i < students.length; i++) {
  //calcul la moyenne de la classe
  let average_rate = (students[i].math_rate + students[i].french_rate) / 2;
  if (average_rate >= 10) success_check++;
  class_average_rate += average_rate;
}

console.log(class_average_rate / i);

//affiche un message si tous les élèves de la classe sont admis
if (success_check === students.length) {
  console.log("Tous les élèves sont admis!");
}
