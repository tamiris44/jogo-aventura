const storyText = document.getElementById('story-text');
const choicesDiv = document.getElementById('choices');
const gameImage = document.getElementById('game-image');
const resetButton = document.getElementById('reset-button');

// Define the game's states (nodes in a flowchart)
const gameStates = {
    start: {
        text: "Você acorda desorientado em uma densa floresta, a névoa é tão espessa que você mal consegue ver suas mãos. O acampamento não está à vista. Você precisa encontrar o caminho de volta antes que a noite caia.",
        image: "images/foggy_forest.jpg",
        choices: [
            { text: "Tentar se orientar pelo sol (se puder ver)", nextState: "lookForSun" },
            { text: "Seguir o barulho de um riacho próximo", nextState: "followStream" }
        ]
    },
    lookForSun: {
        text: "A névoa está muito forte para ver o sol. Você se sente ainda mais perdido, mas percebe uma trilha pouco usada. Parece promissora.",
        image: "images/trail.jpg",
        choices: [
            { text: "Seguir a trilha", nextState: "followTrail" },
            { text: "Tentar gritar por ajuda", nextState: "shoutForHelp" }
        ]
    },
    followStream: {
        text: "Você segue o riacho, o som da água corrente te dá alguma esperança. O riacho leva a uma pequena clareira com um cogumelo estranho no meio.",
        image: "images/stream.jpg",
        choices: [
            { text: "Examinar o cogumelo", nextState: "examineMushroom" },
            { text: "Continuar seguindo o riacho", nextState: "continueStream" }
        ]
    },
    followTrail: {
        text: "A trilha é coberta por folhas e galhos, mas parece levar a algum lugar. Depois de um tempo, você se depara com uma cabana abandonada.",
        image: "images/cabin.jpg",
        choices: [
            { text: "Entrar na cabana", nextState: "enterCabin" },
            { text: "Contornar a cabana e continuar na trilha", nextState: "bypassCabin" }
        ]
    },
    shoutForHelp: {
        text: "Você grita com toda a força, mas apenas o eco responde. Um som distante de rosnado te faz pular. É melhor não chamar mais atenção.",
        image: "images/bear_sound.jpg",
        choices: [
            { text: "Correr na direção oposta ao som", nextState: "runAway" },
            { text: "Subir em uma árvore próxima", nextState: "climbTree" }
        ]
    },
    examineMushroom: {
        text: "O cogumelo brilha suavemente. Ao tocá-lo, você sente uma tontura, mas sua visão fica mais clara. Você agora consegue ver uma bússola no chão, que estava escondida.",
        image: "images/glowing_mushroom.jpg",
        choices: [
            { text: "Usar a bússola para ir para o norte", nextState: "compassNorth" },
            { text: "Continuar na clareira para ver se encontra algo mais", nextState: "searchClearing" }
        ]
    },
    continueStream: {
        text: "O riacho se alarga e você ouve o som de uma cachoeira. Ao se aproximar, você vê uma ponte de corda bamba sobre um desfiladeiro.",
        image: "images/waterfall.jpg",
        choices: [
            { text: "Atravessar a ponte", nextState: "crossBridge" },
            { text: "Tentar encontrar um caminho ao redor", nextState: "detourWaterfall" }
        ]
    },
    enterCabin: {
        text: "A cabana está empoeirada e escura. Você encontra um mapa antigo na mesa. Parece ser da região, mas está danificado.",
        image: "images/cabin_inside.jpg",
        choices: [
            { text: "Tentar decifrar o mapa", nextState: "decipherMap" },
            { text: "Procurar por comida ou água", nextState: "searchCabin" }
        ]
    },
    bypassCabin: {
        text: "Você decide não se arriscar na cabana. A trilha continua, mas parece ficar mais densa. Você começa a ouvir latidos de cachorro à distância.",
        image: "images/dense_forest.jpg",
        choices: [
            { text: "Seguir os latidos", nextState: "followBarks" },
            { text: "Continuar na trilha, ignorando os latidos", nextState: "ignoreBarks" }
        ]
    },
    runAway: {
        text: "Você corre cegamente pela floresta, o som do rosnado parece desaparecer. Você tropeça e cai em uma ravina rasa. Por sorte, você vê uma fogueira à distância.",
        image: "images/ravine.jpg",
        choices: [
            { text: "Rastejar até a fogueira", nextState: "reachCamp" }, // SUCCESS ENDING
            { text: "Esperar por ajuda na ravina", nextState: "waitInRavine" }
        ]
    },
    climbTree: {
        text: "Você escala uma árvore alta. De cima, você consegue ver uma pequena clareira com fumaça subindo. Parece ser um acampamento!",
        image: "images/tree_view.jpg",
        choices: [
            { text: "Descer e ir em direção à fumaça", nextState: "reachCamp" }, // SUCCESS ENDING
            { text: "Esperar que alguém te veja", nextState: "waitOnTree" }
        ]
    },
    compassNorth: {
        text: "Você segue o norte com a bússola. A cada passo, a névoa começa a dissipar e você vê um caminho pavimentado. Você avista seu acampamento!",
        image: "images/road.jpg",
        choices: [
            { text: "Chegar ao acampamento", nextState: "reachCamp" } // SUCCESS ENDING
        ]
    },
    searchClearing: {
        text: "Você procura na clareira, mas não encontra nada além de algumas plantas comuns. A tontura do cogumelo passa e a névoa volta a ser densa.",
        image: "images/clearing.jpg",
        choices: [
            { text: "Voltar para o riacho", nextState: "followStream" },
            { text: "Tentar outra direção aleatória", nextState: "lostAgain" }
        ]
    },
    crossBridge: {
        text: "A ponte balança perigosamente, mas você consegue atravessá-la. Do outro lado, você encontra uma estrada de terra. Não demora muito para ver placas do parque e, finalmente, o acampamento.",
        image: "images/dirt_road.jpg",
        choices: [
            { text: "Chegar ao acampamento", nextState: "reachCamp" } // SUCCESS ENDING
        ]
    },
    detourWaterfall: {
        text: "Você tenta contornar a cachoeira, mas o terreno é íngreme e escorregadio. Você escorrega e rola por uma encosta, perdendo a consciência. Você acorda horas depois, completamente perdido.",
        image: "images/cliff.jpg",
        choices: [
            { text: "Começar do zero", nextState: "start" } // LOSE/RESET
        ]
    },
    decipherMap: {
        text: "O mapa está rasgado, mas você consegue identificar um ponto de referência: um grande carvalho. Você se lembra de tê-lo visto perto do acampamento. Você se orienta e segue na direção correta.",
        image: "images/oak_tree.jpg",
        choices: [
            { text: "Ir em direção ao carvalho", nextState: "reachCamp" } // SUCCESS ENDING
        ]
    },
    searchCabin: {
        text: "Você procura na cabana e encontra algumas frutas silvestres comestíveis. Enquanto come, você ouve passos do lado de fora. Um guarda florestal aparece na porta!",
        image: "images/ranger.jpg",
        choices: [
            { text: "Pedir ajuda ao guarda", nextState: "rangerHelp" }
        ]
    },
    followBarks: {
        text: "Você segue o latido e encontra um grupo de escoteiros com seu cachorro. Eles estão perto de uma área conhecida do acampamento e te ajudam a se orientar.",
        image: "images/scouts.jpg",
        choices: [
            { text: "Ir com os escoteiros para o acampamento", nextState: "reachCamp" } // SUCCESS ENDING
        ]
    },
    ignoreBarks: {
        text: "Você ignora os latidos e continua na trilha. A névoa volta a se intensificar, e você sente que está andando em círculos. A noite está caindo e a temperatura despenca.",
        image: "images/night_falls.jpg",
        choices: [
            { text: "Tentar encontrar um abrigo para a noite", nextState: "findShelter" },
            { text: "Continuar andando na esperança de encontrar algo", nextState: "walkInCircles" }
        ]
    },
    waitInRavine: {
        text: "Você espera por ajuda, mas o tempo passa e ninguém aparece. A noite cai, e o frio se intensifica. Você percebe que as chances de ser encontrado aqui são mínimas.",
        image: "images/night_falls_ravine.jpg",
        choices: [
            { text: "Recomeçar o jogo", nextState: "start" } // LOSE/RESET
        ]
    },
    waitOnTree: {
        text: "Você espera na árvore, mas a fumaça do acampamento se dissipa com o vento, e ninguém te vê. A noite chega e você fica preso na árvore, com frio e sem esperança.",
        image: "images/cold_night.jpg",
        choices: [
            { text: "Recomeçar o jogo", nextState: "start" } // LOSE/RESET
        ]
    },
    lostAgain: {
        text: "Você anda aleatoriamente pela floresta, mas parece que está se perdendo cada vez mais. A névoa não cede, e o desespero começa a tomar conta.",
        image: "images/lost.jpg",
        choices: [
            { text: "Recomeçar o jogo", nextState: "start" } // LOSE/RESET
        ]
    },
    rangerHelp: {
        text: "O guarda florestal o reconhece e fica aliviado por tê-lo encontrado. Ele te guia de volta ao acampamento em segurança.",
        image: "images/camp_found.jpg",
        choices: [
            { text: "Chegar ao acampamento", nextState: "reachCamp" } // SUCCESS ENDING
        ]
    },
    findShelter: {
        text: "Você encontra uma pequena caverna e decide passar a noite lá. É frio e desconfortável, mas você está seguro. Pela manhã, a névoa se dissipa, mas você ainda está perdido.",
        image: "images/cave.jpg",
        choices: [
            { text: "Recomeçar o jogo", nextState: "start" } // LOSE/RESET
        ]
    },
    walkInCircles: {
        text: "Você continua andando, mas está exausto e desorientado. Você acaba voltando ao mesmo ponto que estava horas atrás. A noite é longa e fria.",
        image: "images/circles.jpg",
        choices: [
            { text: "Recomeçar o jogo", nextState: "start" } // LOSE/RESET
        ]
    },
    reachCamp: {
        text: "Você finalmente vê as luzes familiares do acampamento! Seus amigos correm para te abraçar, aliviados. Você está seguro e a aventura acabou.",
        image: "images/camp.jpg",
        choices: [] // No choices, as the game ends here
    },
    gameOver: {
        text: "Suas tentativas falharam e você está completamente perdido na floresta escura. A noite chegou, e as chances de ser encontrado diminuem a cada minuto. Fim de jogo.",
        image: "images/game_over.jpg",
        choices: [] // No choices for game over, will show reset button
    }
};

let currentState = 'start';

function startGame() {
    currentState = 'start';
    updateGame();
    resetButton.style.display = 'none'; // Hide reset button at start
}

function updateGame() {
    const state = gameStates[currentState];
    storyText.textContent = state.text;
    gameImage.src = state.image;
    choicesDiv.innerHTML = ''; // Clear previous choices

    if (state.choices.length > 0) {
        state.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => choose(choice.nextState);
            choicesDiv.appendChild(button);
        });
    } else {
        // If there are no choices, it means the game has ended (win or lose)
        resetButton.style.display = 'block'; // Show reset button
    }
}

function choose(nextState) {
    currentState = nextState;
    updateGame();
}

// Event listener for the reset button
resetButton.addEventListener('click', startGame);

// Initialize the game
startGame();