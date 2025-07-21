// Auteur : Amoesi Kewan
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Ce programme simule l'algorithme de tri par sélection sur un tableau de nombres
// Les valeurs sont affichées sous forme de rectangles avec des couleurs spécifiques
// selon leur état, et l'exécution peut être contrôlée via des boutons.
//##################################################################
// Première partie : la machine virtuelle et l'algorithme
// Définition des lignes de l'algorithme
var algo = [
    "1: Pour i de 1 à n-1 faire",
    "2:   mini = i",
    "3:   Pour j de i+1 à n faire",
    "4:     Si t[j] < t[mini] alors",
    "5:       mini = j",
    "6:     Fin si",
    "7:   Fin pour",
    "8:   Si mini ≠ i alors",
    "9:     Échanger t[i] et t[mini]",
    "10:  Fin si",
    "11: Fin pour"
];
// Variables de la machine virtuelle
var machine_ligneCourante = 0;
var machine_t = [];
var machine_i = NaN;
var machine_j = NaN;
var machine_n = NaN;
var machine_mini = NaN;
// Variables pour suivre quelles variables sont consultées/modifiées
var variablesModifiees = [];
var variablesConsultees = [];
// Fonction pour générer des nombres aléatoires entre min et max
function random_integer_values(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Initialisation de la machine virtuelle
function initialiserMachineVirtuelle(tailleTableau) {
    machine_t = [];
    for (var i = 0; i < tailleTableau; i++) {
        machine_t[i] = random_integer_values(10, 100);
    }
    machine_i = NaN;
    machine_j = NaN;
    machine_n = tailleTableau;
    machine_mini = NaN;
    machine_ligneCourante = 1;
    resetVariablesAcces();
}
// Réinitialiser les traces d'accès aux variables
function resetVariablesAcces() {
    variablesModifiees = [];
    variablesConsultees = [];
}
// Fonction pour échanger deux éléments du tableau
function echanger(i, j) {
    var temp = machine_t[i];
    machine_t[i] = machine_t[j];
    machine_t[j] = temp;
}
// Fonction qui exécute un pas de l'algorithme
function faireUnPas() {
    resetVariablesAcces();
    if (machine_ligneCourante == 1) {
        // Ligne 1: Pour i de 1 à n-1 faire
        if (isNaN(machine_i)) {
            machine_i = 0;
            variablesModifiees.push("i");
        }
        else if (machine_i < machine_n - 1) {
            machine_i++;
            variablesModifiees.push("i");
            machine_ligneCourante = 2;
        }
        else {
            machine_ligneCourante = 11;
        }
    }
    else if (machine_ligneCourante == 2) {
        // Ligne 2: mini = i
        machine_mini = machine_i;
        variablesModifiees.push("mini");
        variablesConsultees.push("i");
        machine_ligneCourante = 3;
    }
    else if (machine_ligneCourante == 3) {
        // Ligne 3: Pour j de i+1 à n faire
        if (isNaN(machine_j)) {
            machine_j = machine_i + 1;
            variablesModifiees.push("j");
            variablesConsultees.push("i");
        }
        else if (machine_j < machine_n) {
            machine_j++;
            variablesModifiees.push("j");
        }
        else {
            machine_ligneCourante = 7;
            return;
        }
        machine_ligneCourante = 4;
    }
    else if (machine_ligneCourante == 4) {
        // Ligne 4: Si t[j] < t[mini] alors
        variablesConsultees.push("t", "j", "mini");
        if (machine_t[machine_j] < machine_t[machine_mini]) {
            machine_ligneCourante = 5;
        }
        else {
            machine_ligneCourante = 6;
        }
    }
    else if (machine_ligneCourante == 5) {
        // Ligne 5: mini = j
        machine_mini = machine_j;
        variablesModifiees.push("mini");
        variablesConsultees.push("j");
        machine_ligneCourante = 6;
    }
    else if (machine_ligneCourante == 6) {
        // Ligne 6: Fin si
        machine_ligneCourante = 3;
    }
    else if (machine_ligneCourante == 7) {
        // Ligne 7: Fin pour
        machine_j = NaN;
        variablesModifiees.push("j");
        machine_ligneCourante = 8;
    }
    else if (machine_ligneCourante == 8) {
        // Ligne 8: Si mini ≠ i alors
        variablesConsultees.push("mini", "i");
        if (machine_mini !== machine_i) {
            machine_ligneCourante = 9;
        }
        else {
            machine_ligneCourante = 10;
        }
    }
    else if (machine_ligneCourante == 9) {
        // Ligne 9: Échanger t[i] et t[mini]
        echanger(machine_i, machine_mini);
        variablesConsultees.push("t", "i", "mini");
        variablesModifiees.push("t");
        machine_ligneCourante = 10;
    }
    else if (machine_ligneCourante == 10) {
        // Ligne 10: Fin si
        machine_ligneCourante = 1;
    }
}
//##################################################################
// Deuxième partie : la visualisation
// Récupération du canevas et du contexte
var canevasSimulation = document.getElementById("simulation");
var contexte = canevasSimulation.getContext("2d");
contexte.font = "15px serif";
// Fonction pour afficher l'algorithme
function afficherAlgorithme() {
    var algoX = 500, algoY = 50;
    var algoDY = 30;
    contexte.textAlign = "left";
    for (var i = 0; i < algo.length; i++) {
        // Mise en évidence de la ligne courante
        if (machine_ligneCourante == i + 1) {
            contexte.fillStyle = "yellow";
            contexte.fillRect(algoX - 10, algoY + i * algoDY - 20, 300, 25);
            contexte.fillStyle = "red";
            contexte.font = "bold 15px serif";
        }
        else {
            contexte.fillStyle = "black";
            contexte.font = "15px serif";
        }
        contexte.fillText(algo[i], algoX, algoY + i * algoDY);
    }
}
// Fonction pour afficher une variable avec fond coloré selon son état
function afficherVariable(x, y, valeur, titre, nomVar) {
    var varWidth = 60, varHeight = 30;
    var valX = 20, valY = 20;
    var titreX = 20, titreY = 45;
    // Déterminer la couleur de fond
    if (variablesModifiees.includes(nomVar)) {
        contexte.fillStyle = "lightblue"; // Modifiée = bleu
    }
    else if (variablesConsultees.includes(nomVar)) {
        contexte.fillStyle = "lightgreen"; // Consultée = vert
    }
    else {
        contexte.fillStyle = "white"; // Ni l'un ni l'autre = blanc
    }
    // Dessiner le fond
    contexte.fillRect(x, y, varWidth, varHeight);
    contexte.strokeRect(x, y, varWidth, varHeight);
    // Dessiner le texte
    contexte.textAlign = "center";
    contexte.fillStyle = "blue";
    contexte.fillText(valeur, x + valX, y + valY);
    contexte.fillStyle = "green";
    contexte.fillText(titre, x + titreX, y + titreY);
}
// Fonction pour afficher une cellule du tableau avec fond coloré selon son état
function afficherCelluleTableau(x, y, valeur, titre, index) {
    var varWidth = 60, varHeight = 30;
    var valX = 20, valY = 20;
    var titreX = 20, titreY = 45;
    // Déterminer si cette cellule est consultée/modifiée
    var estMini = (machine_mini === index);
    var estI = (machine_i === index);
    var estJ = (machine_j === index);
    // Couleur de fond spéciale pour les cellules particulières
    if (estMini || estI || estJ) {
        if (variablesModifiees.includes("t") && (estI || estMini)) {
            contexte.fillStyle = "lightblue"; // Cellule modifiée
        }
        else if (variablesConsultees.includes("t") && (estI || estJ || estMini)) {
            contexte.fillStyle = "lightgreen"; // Cellule consultée
        }
        else if (estI) {
            contexte.fillStyle = "pink"; // Position i
        }
        else if (estJ) {
            contexte.fillStyle = "orange"; // Position j
        }
        else if (estMini) {
            contexte.fillStyle = "lightyellow"; // Position mini
        }
    }
    else {
        contexte.fillStyle = "white";
    }
    // Dessiner le fond
    contexte.fillRect(x, y, varWidth, varHeight);
    contexte.strokeRect(x, y, varWidth, varHeight);
    // Dessiner le texte
    contexte.textAlign = "center";
    contexte.fillStyle = "black";
    contexte.fillText(valeur, x + valX, y + valY);
    contexte.fillStyle = "black";
    contexte.fillText(titre, x + titreX, y + titreY);
}
// Fonction pour afficher l'état de la machine
function afficherMachineVirtuelle() {
    // Afficher les variables ordinaires
    afficherVariable(50, 30, String(machine_ligneCourante), "Ligne", "ligneCourante");
    afficherVariable(50, 90, String(machine_i), "i", "i");
    afficherVariable(50, 150, String(machine_j), "j", "j");
    afficherVariable(50, 210, String(machine_n), "n", "n");
    afficherVariable(50, 270, String(machine_mini), "mini", "mini");
    // Afficher le tableau
    var startX = 150, startY = 400;
    var cellWidth = 60, cellHeight = 30;
    var spacing = 5;
    for (var i = 0; i < machine_n; i++) {
        var x = startX + i * (cellWidth + spacing);
        afficherCelluleTableau(x, startY, String(machine_t[i]), "t[" + (i + 1) + "]", i);
    }
}
// Fonction pour rafraîchir l'affichage
function rafraichirCanevas() {
    contexte.clearRect(0, 0, canevasSimulation.width, canevasSimulation.height);
    afficherMachineVirtuelle();
    afficherAlgorithme();
}
// Initialisation
rafraichirCanevas();
//##################################################################
// Troisième partie : le contrôleur
// Récupération des éléments HTML
var tailleTableauInput = document.getElementById("taille_tableau");
var boutonRecommencer = document.getElementById("recommmencer");
var boutonInitialiser = document.getElementById("initialiser");
var boutonUnPas = document.getElementById("un_pas");
var boutonContinuer = document.getElementById("continuer");
var boutonStop = document.getElementById("stop");
var boutonAide = document.getElementById("aide");
// Vérification des éléments
if (!tailleTableauInput || !boutonInitialiser || !boutonUnPas || !boutonContinuer || !boutonStop || !boutonRecommencer || !boutonAide) {
    throw new Error("Éléments HTML manquants");
}
// Variables pour la simulation continue
var simulationArrete = true;
var vitesseSimulation = 200; // en ms
var valeursInitiales = [];
// Fonction pour sauvegarder les valeurs initiales
function sauvegarderValeursInitiales() {
    valeursInitiales = __spreadArray([], machine_t, true);
}
// Fonction pour recommencer avec les mêmes valeurs
function recommencerAvecMemesValeurs() {
    if (valeursInitiales.length === 0)
        return;
    simulationArrete = true;
    machine_t = __spreadArray([], valeursInitiales, true);
    machine_i = NaN;
    machine_j = NaN;
    machine_mini = NaN;
    machine_ligneCourante = 1;
    rafraichirCanevas();
}
// Fonctions pour les boutons
function actionReinitialiser() {
    simulationArrete = true;
    var taille = parseInt(tailleTableauInput.value);
    var tailleFinale = isNaN(taille) || taille < 1 || taille > 20 ? 10 : taille;
    initialiserMachineVirtuelle(tailleFinale);
    sauvegarderValeursInitiales();
    rafraichirCanevas();
}
function actionUnPas() {
    simulationArrete = true;
    faireUnPas();
    rafraichirCanevas();
}
function actionContinuer() {
    simulationArrete = false;
    simulationContinue();
}
function actionStop() {
    simulationArrete = true;
}
function actionRecommencer() {
    recommencerAvecMemesValeurs();
}
// Fonction pour afficher l'aide
function afficherAide() {
    alert("Simulation du tri par sélection\n\nContrôles :\n- Taille du tableau : choisit la taille (1-20)\n- Recommencer : réinitialise avec mêmes valeurs\n- Réinitialiser : nouveau tableau aléatoire\n- Faire un pas : une étape de l'algorithme\n- Continuer : simulation automatique\n- Stopper : arrête la simulation\n\nAuteur : Amoesi Kewan");
}
// Gestionnaire de la simulation continue
function simulationContinue() {
    if (!simulationArrete) {
        faireUnPas();
        rafraichirCanevas();
        // Calcul de la vitesse en fonction de la taille du tableau
        var vitesse = Math.max(50, 250 - machine_n * 10);
        setTimeout(simulationContinue, vitesse);
    }
    else {
        setTimeout(simulationContinue, 500);
    }
}
// Association des événements
boutonInitialiser.addEventListener("click", actionReinitialiser);
boutonUnPas.addEventListener("click", actionUnPas);
boutonContinuer.addEventListener("click", actionContinuer);
boutonStop.addEventListener("click", actionStop);
boutonRecommencer.addEventListener("click", actionRecommencer);
boutonAide.addEventListener("click", afficherAide);
// Démarrage de la simulation continue
simulationContinue();
