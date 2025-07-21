// Auteur : Amoesi Kewan

//Ce programme fait une simulation d'un algorithme
//comptant les nombres positifs ou nuls et les 
//nombre négatifs dans un tableau de 10 nombres entre -10
//et 10 inclus.


//##################################################################
// Première partie du programme TypeScript : la machine virtuelle.
//  1) Définition des lignes de l'algorithme simulé (tableau algo).
//  2) Déclarations des variables de la machine virtuelle.
//  3) Définition d'une fonction initialisant la machine virtuelle
//  4) Définition de la fonction faireUnPas() qui exécute les 
//     opérations de la ligne courante de l'algorithme puis 
//     positionne la ligne courante sur la prochaine ligne à exécuter.


//1)Définition des lignes de l'algorithme simulé (tableau algo).
// Tableau donnant les lignes de l'algorithme simulé.
// Permet d'afficher l'algorithme dans la visualisation.
const algo = [
    "1: positifs = 0",
    "2: négatifs = 0",
    "3: Pour i de 1 à n",
    "4: 	Si t[i] >= 0 alors",
    "5:     	positifs = positif + 1",
    "6:		Sinon",
	"7:			négatifs = négatifs + 1",
	"8:		Fin si",
	"9:Fin pour"
]
//1)--------------------------------------------------------------

// 2) Déclarations des variables de la machine virtuelle.

// Déclaration de la variable qui précise le numéro de la ligne de 
// l'algorithme qui va être exécutée au prochain pas.
//  - La valeur 0 indique que la simulation n'a pas commencé.
//  - Une valeur plus grande que la dernière ligne de l'algorithme indique
//    que la simulation est terminée.
// La simulation sera lancée plus tard après sa réinitialisation par l'utilisateur.
let machine_ligneCourante = 0

// Déclarations des variables de la machine virtuelle qui correspondent
// aux variables de l'algorithme.
// Pour cet algorithme, il s'agit des variables i, n, pos (positifs)
//neg (négatifs) et du tableau t.
// Dans la machine virtuelle, le nom d'une variable XYZ est machine_XYZ. Attention,
// il y a un décalage dans les indices du tableau car les indices en algorithmique
// débutent à un alors qu'en TypeScript, c'est zéro.
// Les valeurs initiales sont celles qui apparaitront au chargement de la
// page (avant la première réinitialisation lancée par l'utilisateur).
let machine_t : number[] = [] // Tableau vide au début (rien ne s'affiche)
let machine_i : number = NaN  // On pourrait mettre 0
let machine_n : number = NaN   // nombre d'élément du tableau
let machine_pos : number = NaN // On a pas encore commencé à compter
let machine_neg : number = NaN // On a pas encore commencé à compter


// Définition de la fonction qui initialise la machine virtuelle.
// Le paramètre permet de fixer le nombre de cellules du tableau.
// Les cellules du tableau sont initialisées par des valeurs entre
//  -10 et 10 (de manière aléatoire) avec random_integer_values.
// ROLE: renvoie un nombre entier aléatoire entre un min et un max donné
function random_integer_values(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 0.5)) + min;
}
//2)-------------------------------------------------------------

//3) Définition d'une fonction initialisant la machine virtuelle


function initialiserMachineVirtuelle(tailleTableau : number) {
  // Le tableau est créé puis initialisé avec tailleTableau valeurs aléatoires
  machine_t = []

  for(let i = 0 ; i < tailleTableau ; i++) {
    // On cherche un entier de -10 à 10 de manière aléatoire
    machine_t[i] = random_integer_values((-10), 10)
  }
  //Les autres variables sont initialisées
  machine_i = NaN
  machine_n = 10// on compte le zero 
  machine_pos = 0
  machine_neg = 0
  // On positionne la ligne courante sur la première ligne
  machine_ligneCourante = 1
}
//3)------------------------------------------------------------------


//4)Définition de la fonction faireUnPas() qui exécute les 
//  opérations de la ligne courante de l'algorithme puis 
//  positionne la ligne courante sur la prochaine ligne à exécuter.

// Définition de la fonction qui exécute un pas dans la simulation de l'algorithme.
// Les opérations de la ligne courante sont exécutées. Puis, la 
// prochaine ligne courante est calculée en fonction de l'instruction.
// Cette fonction comporte une grande structure conditionnelle basée sur
// la valeur de la ligne courante. Elle ne fait rien si la ligne courante
// ne correspond à aucune ligne de l'algorithme (ici si < 1 ou > 6).
function faireUnPas() {
	 
  if (machine_ligneCourante == 1) {
		machine_i = 0; // i est initialisé au debuty du programme
    // Ligne 1 : positifs = 0
		machine_pos = 0 ;
    // C'est une simple initialisation.

    // On poursuit avec la ligne suivante.
    machine_ligneCourante = 2
  }

  else if (machine_ligneCourante == 2) {
    // Ligne 2 : negatifs = 0
	// initialisation
    machine_neg = 0;
	
	// On poursuit avec la ligne suivante.
    machine_ligneCourante = 3;
  }

  else if (machine_ligneCourante == 3) {
		// Ligne 3 : Pour i de 1 à 10 (machine_n ; constante taille du tableau à 10)
		if (machine_i < (machine_n)){
				machine_ligneCourante = 4; //on accède a ma bpucle Si
		}
		else {
				machine_ligneCourante = 8; 
			
		}
		
  }

  else if (machine_ligneCourante == 4) {
    // Ligne 4 : Si t[i] >= 0 alors positifs++ sinon negatifs++
    
    if (machine_t[machine_i] >= 0) {
      machine_ligneCourante = 5
    }
    else {
      machine_ligneCourante = 6
    }
  }

  else if (machine_ligneCourante == 5) {
    // Ligne 5 : positifs++ 
		machine_pos = machine_pos + 1; // incrémentation de positifs
		machine_i = machine_i + 1; // on passe a la case suivante 
		
    // On revient a la boucle Pour
    machine_ligneCourante = 3;
  }
	else if (machine_ligneCourante == 6){
		//Ligne 6 : Sinon
		machine_ligneCourante = 7;
	}
	else if (machine_ligneCourante == 7){
		//Ligne 7 : negatifs++
		machine_neg = machine_neg + 1;
		machine_i = machine_i + 1; // on passe a la case suivante 
		
		// On revient a la boucle Pour
    machine_ligneCourante = 3;
	}
	
  else if (machine_ligneCourante == 8) {
		machine_ligneCourante = 9;
		

    }
  }


//###################################################################################
// Deuxième partie du programme TypeScript : la visualisation de la machine virtuelle
// et de l'algorithme (avec la ligne courante en rouge) sur le canevas.
//  1) Récupération du canevas et du contexte de rendu 2D.
//  2) Définition de la fonction affichant l'algorithme.
//  3) Définition d'une fonction affichant une variable de la machine virtuelle.
//  4) Définition d'une fonction affichant l'état de la machine virtuelle.
//  5) Définition d'une fonction rafraichissant complètement le canevas.
//  6) On rafraichit une première fois le canevas.

// Récupération du canevas.
const canevasSimulation =  document.getElementById("simulation") as HTMLCanvasElement;

// Récupération du contexte de rendu 2D du canevas.
const contexte = canevasSimulation.getContext("2d") as CanvasRenderingContext2D;

// Initialisation de la police de caractères utilisée et de sa taille.
contexte.font = "15px serif"

// Définition de la fonction qui affiche l'algorithme à droite du canevas. La ligne
// courante (qui sera exécutée lors de la prochaine étape) est affichée en rouge.
function afficherAlgorithme() {
  // Définitions des paramètres graphiques pour afficher l'algorithme sur le canevas.
  const algoX = 200, algoY = 50 // Coordonnées de la 1ère ligne de l'algorithme sur le canevas.
  const algoDY = 30             // Décalage vertical entre les lignes de l'algorithme.

  // Les lignes de l'algorithme sont justifiées à gauche.
  contexte.textAlign = "left"

  // On parcourt le tableau des lignes de l'algorithme.
  for(let i = 0 ; i < algo.length ; i++) {
    // Ligne normale en noir, ligne courante en rouge.
    if (machine_ligneCourante == i + 1) {
      contexte.fillStyle = "red"
    }
    else {
      contexte.fillStyle = "black"
    }
    // La position verticale de la ligne est calculée.
    let y = algoY + i * algoDY
    // La ligne est affichée.
    contexte.fillText(algo[i], algoX, y)
  }
}

// Définition de la fonction qui affiche une variable de la machine virtuelle quelque part sur le canevas.
// On crée un rectangle contenant la valeur. Il y a un titre en dessous du rectangle.
// Attention : la valeur affichée est donnée comme une chaîne de caractères. Les coordonnées
// x et y en paramètre correspondent au point en haut à gauche du rectangle.
function afficherVariable(x : number, y : number, valeur : string, titre : string) {
  // Définitions des paramètres graphiques pour afficher une variable sur le canevas.
  const variableDX = 45, variableDY = 30             // Largeur et hauteur du rectangle.
  const valeurVariableDX = 20, valeurVariableDY = 20 // Décalage pour la valeur de la variable.
  const titreVariableDX = 20, titreVariableDY = 47   // Décalage pour le titre de la variable.

  // Le rectangle a une taille fixe dans ce programme.
  contexte.strokeRect(x, y, variableDX, variableDY)
  // La valeur de la variable est en bleu au centre du rectangle.
  contexte.textAlign = "center"
  contexte.fillStyle = "blue"
  contexte.fillText(valeur, x+valeurVariableDX, y+valeurVariableDY)
  // Le titre de la variable est en vert en dessous du rectangle.
  contexte.fillStyle = "green"
  contexte.fillText(titre, x+titreVariableDX, y+titreVariableDY)
}

// Définition de la fonction qui affiche l'état de la machine virtuelle sur le canevas.
// Ici, il s'agit d'afficher le numéro de la ligne courante, les variables et le tableau.
function afficherMachineVirtuelle() {
  // Définitions des paramètres graphiques pour afficher les variables sur le canevas.
  const celluleDX = 50 // Décalage horizontal entre les cellules du tableau.

  // On affiche le numéro de la ligne courante.
  afficherVariable(50, 30, String(machine_ligneCourante), "Ligne")
  // On affiche les variables.
  afficherVariable(50, 90, String(machine_pos), "positifs")
	afficherVariable(50, 150, String(machine_neg), "négatifs")
  afficherVariable(50, 210, String(machine_i), "i")
  afficherVariable(50, 270, String(machine_n ), "n")
  // On affiche les cellules du tableau t.
  for(let i = 0 ; i < machine_t.length ; i++) {
    // On affiche la cellule t[i] du tableau t.
    afficherVariable(3+celluleDX*i, 400, String(machine_t[i]), "t["+(i+1)+"]")
  }
}

// Définition de la fonction qui redessine complètement le canevas.
function rafraichirCanevas() {
  // On commence par effacer le canevas.
  contexte.clearRect(0, 0, canevasSimulation.width, canevasSimulation.height)
  // On dessine l'état de la machine virtuelle.
  afficherMachineVirtuelle()
  // On affiche l'algorithme (avec la ligne courante en rouge).
  afficherAlgorithme()
}

// On rafraichit une première fois le canevas pour montrer l'état initial
// de la machine virtuelle.
rafraichirCanevas()

//########################################################################
// Troisième partie du programme TypeScript : le contrôleur du simulateur.
//  1) Récupération des éléments visuels (champ et boutons).
//  2) Définition d'une variable précisant si la simulation continue
//     est en cours ou est arrêtée.
//  3) Définitions des fonctions correspondant aux différents boutons.
//  4) Lancement de la fonction gérant la simulation continue.

// On récupère les différents éléments visuels liés au contrôle (champ et boutons).

const boutonInitialiser = document.getElementById("initialiser") as HTMLButtonElement;
const boutonUnPas =  document.getElementById("un_pas") as HTMLButtonElement;
const boutonContinuer =  document.getElementById("continuer") as HTMLButtonElement;
const boutonStop = document.getElementById("stop") as HTMLButtonElement;

// On teste que tous les éléments visuels ont été récupérés.
if (!boutonInitialiser || !boutonContinuer ||
    !boutonUnPas || !boutonStop ) {
  throw new Error("Certains éléments graphiques de la page n'ont pas été trouvés !");
}

// Déclaration de la variable qui indique si la simulation continue est en cours ou bien arrêtée.
// Au chargement du programme, elle est arrêtée.
let simulationArrete = true

// Définition de la fonction qui initialise la machine virtuelle en utilisant le champ
// "Taille du tableau" puis rafraichit le canevas.
// La simulation continue est éventuellement arrêtée.
// Cette fonction est appelée lorsqu'on clique sur le bouton "Réinitialisation...".
function actionReinitialiser () {
  // On arrête la simulation.
  simulationArrete = true
  // On récupère le nombre qui se trouve dans le champ "Taille du tableau".
  let nb = 10;
  if (isNaN(nb) || nb < 1) {
    // En cas de problème, on fixe la valeur entre 1 et 6 (de manière aléatoire).
    nb = Math.floor(Math.random()*6) + 1
  }
  // On initialise la machine virtuelle.
  initialiserMachineVirtuelle(nb)
  // On redessine le canevas.
  rafraichirCanevas()
}
// On associe cette fonction au clic sur le bouton "Réinitialiser".
boutonInitialiser.addEventListener("click", actionReinitialiser)

// Définition de la fonction qui effectue un pas de la simulation.
// La simulation continue est éventuellement arrêtée.
// Cette fonction est appelée lorsqu'on clique sur le bouton "Faire un pas".
function actionUnPas () {
  // On arrête la simulation.
  simulationArrete = true
  // On avance d'un pas dans la simulation (cela modifie la machine virtuelle).
  faireUnPas()
  // On redessine le canevas.
  rafraichirCanevas()
}
// On associe cette fonction au clic sur le bouton "Faire un pas".
boutonUnPas.addEventListener("click", actionUnPas)

// Définition de la fonction qui relance la simulation continue.
// Cette fonction est appelée lorsqu'on clique sur le bouton "Continuer...".
function actionContinuer () {
  // On continue la simulation.
  simulationArrete = false
}
// On associe cette fonction au clic sur le bouton "Commencer...".
boutonContinuer.addEventListener("click", actionContinuer)

// Définition de la fonction qui arrête la simulation continue.
// Cette fonction est appelée lorsqu'on clique sur le bouton "Stopper...".
function actionStop () {
  // On arrête la simulation.
  simulationArrete = true
}
// On associe cette fonction au clic sur le bouton "Faire un pas".
boutonStop.addEventListener("click", actionStop)


// Définition de la fonction qui effectue la simulation continue.
// Cette fonction fait un pas de la simulation puis recommence au bout
// d'un certain temps. Ici on utilise le mécanisme lié à la fonction setTimeout
// qui offre plus de liberté que setInterval.
// Cette fonction est exécutée toutes les 1/2 (simulation continue arrêtée) ou
// toutes les 2 secondes (simulation continue en cours).
function simulationContinue() {
  // Cette fonction ne modifie pas la machine virtuelle si la simulation est arrêtée.
  if (!simulationArrete) {
    // On avance d'un pas dans la simulation (cela modifie la machine virtuelle).
    faireUnPas()
    // On redessine le canevas.
    rafraichirCanevas()
    // La fonction est relancée dans 2 secondes.
    setTimeout(simulationContinue, 2000)
  }
  else {
    // Si la simulation continue est arrêtée, la fonction est rappelée plus souvent
    // pour plus de réactivité du bouton.
    setTimeout(simulationContinue, 500)
  }
}

// On lance la fonction qui effectue la simulation continue (lorsqu'elle
// est active).
simulationContinue()
