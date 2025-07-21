// Auteur : Amoesi Kewan
// Ce programme simule l'algorithme de tri à bulle sur un tableau de nombres
// Les valeurs sont affichées sous forme de barres et l'exécution peut être
// contrôlée via des boutons.
//##################################################################
// Première partie : la machine virtuelle et l'algorithme
// Définition des lignes de l'algorithme
var algo = [
    "1: trié = faux",
    "2: Tant que trié est faux faire",
    "3:   trié = vrai",
    "4:   Pour i de 1 à n-1 faire",
    "5:     Si t[i] > t[i+1] alors",
    "6:       Échanger t[i] et t[i+1]",
    "7:       trié = faux",
    "8:     Fin si",
    "9:   Fin pour",
    "10: Fin tant que"
];
// Variables de la machine virtuelle
var machine_ligneCourante = 0;
var machine_t = [];
var machine_i = NaN;
var machine_n = NaN;
var machine_trie = false;
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
    machine_n = tailleTableau;
    machine_trie = false;
    machine_ligneCourante = 1;
}
// Fonction pour échanger deux éléments du tableau
function echanger(i, j) {
    var temp = machine_t[i];
    machine_t[i] = machine_t[j];
    machine_t[j] = temp;
}
// Fonction qui exécute un pas de l'algorithme
function faireUnPas() {
    if (machine_ligneCourante == 1) {
        machine_trie = false;
        machine_ligneCourante = 2;
    }
    else if (machine_ligneCourante == 2) {
        if (!machine_trie) {
            machine_ligneCourante = 3;
        }
        else {
            machine_ligneCourante = 10;
        }
    }
    else if (machine_ligneCourante == 3) {
        machine_trie = true;
        machine_i = 0;
        machine_ligneCourante = 4;
    }
    else if (machine_ligneCourante == 4) {
        if (machine_i < machine_n - 1) {
            machine_ligneCourante = 5;
        }
        else {
            machine_ligneCourante = 9;
        }
    }
    else if (machine_ligneCourante == 5) {
        if (machine_t[machine_i] > machine_t[machine_i + 1]) {
            machine_ligneCourante = 6;
        }
        else {
            machine_ligneCourante = 8;
        }
    }
    else if (machine_ligneCourante == 6) {
        echanger(machine_i, machine_i + 1);
        machine_ligneCourante = 7;
    }
    else if (machine_ligneCourante == 7) {
        machine_trie = false;
        machine_ligneCourante = 8;
    }
    else if (machine_ligneCourante == 8) {
        machine_i++;
        machine_ligneCourante = 4;
    }
    else if (machine_ligneCourante == 9) {
        machine_ligneCourante = 2;
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
// Fonction pour afficher une variable
function afficherVariable(x, y, valeur, titre) {
    var varWidth = 60, varHeight = 30;
    var valX = 20, valY = 20;
    var titreX = 20, titreY = 45;
    contexte.strokeRect(x, y, varWidth, varHeight);
    contexte.textAlign = "center";
    contexte.fillStyle = "blue";
    contexte.fillText(valeur, x + valX, y + valY);
    contexte.fillStyle = "green";
    contexte.fillText(titre, x + titreX, y + titreY);
}
// Fonction pour afficher le tableau sous forme de barres
function afficherTableau() {
    var startX = 50, startY = 550;
    var barWidth = 30, maxBarHeight = 200;
    var spacing = 10;
    if (machine_n == 0)
        return;
    // Trouver la valeur max pour l'échelle
    var maxVal = Math.max.apply(Math, machine_t);
    for (var i = 0; i < machine_n; i++) {
        var barHeight = (machine_t[i] / maxVal) * maxBarHeight;
        var x = startX + i * (barWidth + spacing);
        var y = startY - barHeight;
        // Dessiner la barre
        contexte.fillStyle = "blue";
        contexte.fillRect(x, y, barWidth, barHeight);
        // Dessiner la valeur
        contexte.fillStyle = "black";
        contexte.textAlign = "center";
        contexte.fillText(machine_t[i].toString(), x + barWidth / 2, startY + 20);
    }
}
// Fonction pour afficher l'état de la machine
function afficherMachineVirtuelle() {
    afficherVariable(50, 30, String(machine_ligneCourante), "Ligne");
    afficherVariable(50, 90, String(machine_trie), "trié");
    afficherVariable(50, 150, String(machine_i), "i");
    afficherVariable(50, 210, String(machine_n), "n");
    afficherTableau();
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
var boutonInitialiser = document.getElementById("initialiser");
var boutonUnPas = document.getElementById("un_pas");
var boutonContinuer = document.getElementById("continuer");
var boutonStop = document.getElementById("stop");
// Vérification des éléments
if (!tailleTableauInput || !boutonInitialiser || !boutonUnPas || !boutonContinuer || !boutonStop) {
    throw new Error("Éléments HTML manquants");
}
// Variables pour la simulation continue
var simulationArrete = true;
var vitesseSimulation = 200; // en ms
// Fonctions pour les boutons
function actionReinitialiser() {
    simulationArrete = true;
    var taille = parseInt(tailleTableauInput.value);
    var tailleFinale = isNaN(taille) || taille < 1 || taille > 20 ? 10 : taille;
    initialiserMachineVirtuelle(tailleFinale);
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
// Gestionnaire de la simulation continue
function simulationContinue() {
    if (!simulationArrete) {
        faireUnPas();
        rafraichirCanevas();
        // Calcul de la vitesse en fonction de la taille du tableau
        var vitesse = Math.max(50, 250 - machine_n * 10); // Plus le tableau est grand, plus c'est rapide
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
// Démarrage de la simulation continue
simulationContinue();
