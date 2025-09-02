// --- CONFIGURAÇÃO DO JOGO ---
const CHARACTERS = {
    ju: { id: 'ju', name: 'Ju', image_url: './assets/images/characters/ju.png', desc: 'Agente Harmonizador, com atributos balanceados.', attributes: { forca: 2, inteligencia: 3, velocidade: 3, carisma: 3 }, perks: { advantage: { name: 'Conexão Genuína', desc: 'Vantagem em diálogos (Carisma).' }, disadvantage: { name: 'Busca o Equilíbrio', desc: 'Desvantagem em reflexos (Velocidade).' } } },
    joao: { id: 'joao', name: 'João', image_url: './assets/images/characters/joao.png', desc: 'Agente Tático, especialista em velocidade.', attributes: { forca: 3, inteligencia: 1, velocidade: 5, carisma: 2 }, perks: { advantage: { name: 'Pique de Atleta', desc: 'Vantagem em reflexos (Velocidade).' }, disadvantage: { name: 'Impaciente', desc: 'Desvantagem em lógica (Inteligência).' } } },
    leo: { id: 'leo', name: 'Léo', image_url: './assets/images/characters/leo.png', desc: 'Agente de Vanguarda, focado em força.', attributes: { forca: 5, inteligencia: 4, velocidade: 3, carisma: 1 }, perks: { advantage: { name: 'Força de Vontade', desc: 'Vantagem em precisão (Força).' }, disadvantage: { name: 'Pavio Curto', desc: 'Sua sinceridade excessiva pode magoar os outros.' } } },
    anna: { id: 'anna', name: 'Anna', image_url: './assets/images/characters/anna.png', desc: 'Agente Estrategista, mestre em inteligência.', attributes: { forca: 1, inteligencia: 5, velocidade: 1, carisma: 5 }, perks: { advantage: { name: 'Mente Brilhante', desc: 'Vantagem em lógica e quiz (Inteligência).' }, disadvantage: { name: 'Ritmo Cauteloso', desc: 'Desvantagem em reflexos (Velocidade).' } } }
};

const STATIONS = {
    mental: { title: 'Saúde Mental', unlocked: false, qrValue: 'QR_MENTAL_2025', achievementId: 'mental_unlocked', tip: 'Respirar fundo por 1 minuto pode acalmar seu cérebro na hora!', challengeAttr: 'inteligencia', masterTip: 'Criar um "diário de gratidão" anota 3 coisas boas do dia e melhora o sono.' },
    sexual: { title: 'Saúde Sexual', unlocked: false, qrValue: 'QR_SEXUAL_2025', achievementId: 'sexual_unlocked', tip: 'Conversar abertamente sobre prevenção é o maior superpoder.', challengeAttr: 'carisma', masterTip: 'Saber dizer "não" de forma clara e respeitosa é uma forma de autocuidado e de respeito ao outro.' },
    bucal: { title: 'Saúde Bucal', unlocked: false, qrValue: 'QR_BUCAL_2025', achievementId: 'bucal_unlocked', tip: 'Sua escova de dentes não alcança tudo! O fio dental é o melhor amigo dela.', challengeAttr: 'forca', masterTip: 'Esperar 30 minutos para escovar os dentes após comer algo ácido (como refri) protege o esmalte.' },
    nutricao: { title: 'Nutrição', unlocked: false, qrValue: 'QR_NUTRICAO_2025', achievementId: 'nutricao_unlocked', tip: 'Beber água antes de sentir sede mantém seu corpo com energia máxima.', challengeAttr: 'velocidade', masterTip: 'Comer um punhado de castanhas pode dar mais energia para estudar do que um doce.' },
    adolescencia: { title: 'Adolescência', unlocked: false, qrValue: 'QR_ADOLESCENCIA_2025', achievementId: 'adolescencia_unlocked', tip: 'Entender as mudanças do seu corpo te dá mais confiança para tomar decisões.', challengeAttr: 'inteligencia', masterTip: 'As emoções na adolescência são intensas. Aprender a nomeá-las é o primeiro passo para lidar com elas.' }
};
    
const ACHIEVEMENTS = {
    'mental_unlocked': { name: '[Tá na Mente!]', desc: 'Completou a estação de Saúde Mental.', locked_desc: '???' },
    'sexual_unlocked': { name: '[Tá no Papo!]', desc: 'Completou a estação de Saúde Sexual.', locked_desc: '???' },
    'bucal_unlocked': { name: '[Sorriso Tá On]', desc: 'Completou a estação de Saúde Bucal.', locked_desc: '???' },
    'nutricao_unlocked': { name: '[Deixa o Shape Falar]', desc: 'Completou a estação de Nutrição.', locked_desc: '???' },
    'adolescencia_unlocked': { name: '[É Sobre Isso]', desc: 'Completou a estação de Adolescência.', locked_desc: '???' },
    'master_tip': { name: '[Foi lançada a Braba!]', desc: 'Obteve uma "Dica de Mestre".', locked_desc: '???' },
    'game_complete': { name: '[Zerou o Game!]', desc: 'Completou todas as cinco estações.', locked_desc: '???' },
    'double_trouble': { name: '[Um raio cai duas vezes no mesmo lugar!]', desc: 'Concluiu todas as estações pelo menos 2 vezes.', locked_desc: '???' },
    'curious_agent': { name: '[Agente CURIOSO]', desc: 'Conquista Secreta: Explorou uma estação já concluída.', locked_desc: '???' },
    'first_try_master': { name: '[Mestre de Primeira]', desc: 'Conquista Secreta: Passou de um desafio na primeira tentativa.', locked_desc: '???' },
    'speed_demon': { name: '[Ligeirinho]', desc: 'Conquista Secreta: Venceu o desafio de nutrição com perfeição.', locked_desc: '???' }
};

const COMMANDER_FEEDBACK = {
    mental: ["Sua mente está afiada, agente! Excelente foco.", "Percebi sua calma e clareza. Continue assim!", "Ótimo trabalho em manter o equilíbrio mental."],
    sexual: ["Informação é poder, e você provou isso. Missão cumprida.", "Sua responsabilidade é exemplar. Continue seguro!", "Comunicação e respeito são suas melhores ferramentas. Excelente!"],
    bucal: ["Um sorriso saudável é uma arma poderosa. Bom trabalho!", "Sua precisão foi impecável. Continue com o bom hábito!", "Força e cuidado na medida certa. Perfeito!"],
    nutricao: ["Seus reflexos estão em dia! A energia está fluindo.", "Você é rápido nas escolhas certas. Continue nutrindo sua força.", "Velocidade e saúde andam juntas. Você provou isso!"],
    adolescencia: ["Entender a si mesmo é o maior desafio. Você conseguiu!", "Sua capacidade de tomar decisões conscientes é notável.", "Grande passo, agente. O autoconhecimento é uma jornada contínua."]
};

const MINIGAME_INSTRUCTIONS = {
    bucal: {
        title: "Desafio de Força",
        how: "Uma barra vai se mover. Clique na tela no momento exato em que ela estiver sobre a área verde para marcar um ponto. Acerte 3 vezes para vencer!",
        why: "Assim como ter força na mão pra escovar os dentes, aqui você precisa de precisão. É sobre ter o controle certo na hora certa!"
    },
    nutricao: {
        title: "Desafio de Velocidade",
        how: "Colete 15 alimentos saudáveis para vencer! Não deixe nenhum deles cair e cuidado para não clicar nas guloseimas.",
        why: "Na vida, a gente é bombardeado por opções. Saber escolher rápido o que te faz bem é um superpoder pra ter mais energia no dia a dia."
    },
    mental: {
        title: "Desafio de Inteligência",
        how: "Você vai encarar 3 questões sobre saúde mental. Leia com atenção e escolha a resposta que você acha certa. Acerte todas para passar!",
        why: "Cuidar da mente é tão importante quanto cuidar do corpo. Entender o que a gente sente e saber que não estamos sozinhos faz toda a diferença."
    },
    sexual: {
        title: "Desafio de Carisma",
        how: "Vão aparecer algumas situações do dia a dia. Se você acha que a atitude é legal e respeitosa, deslize para a direita (👍). Se for uma atitude errada ou perigosa, deslize para a esquerda (👎).",
        why: "Saber se comunicar, respeitar os limites dos outros e os seus é a base pra qualquer relação saudável. Isso é ter carisma de verdade!"
    },
    adolescencia: {
        title: "Desafio: Equilíbrio da Vida",
        how: "Situações da vida vão aparecer. Arraste para a esquerda ou direita para fazer sua escolha e veja como isso afeta seu equilíbrio. Mantenha as barras de Estudos, Social e Saúde longe do limite!",
        why: "A adolescência é um ato de malabarismo. Este desafio te ajuda a visualizar como suas escolhas impactam diferentes áreas da sua vida, buscando sempre o caminho mais equilibrado."
    }
};

const TUTORIAL_CHAPTERS = {
    onboarding: [
        {
            screen: 'onboarding-screen',
            title: 'Bem-vindo, Agente!',
            text: 'Sua primeira tarefa é escolher um avatar. Cada um possui Atributos e Vantagens diferentes.',
            highlightElement: '#character-selection'
        },
        {
            screen: 'onboarding-screen',
            title: 'Atributos Importam',
            text: "Um nível alto em 'Força' trará vantagens em desafios físicos, enquanto 'Inteligência' ajudará em lógica. Escolha com sabedoria e clique em 'Iniciar Missão'!",
            highlightElement: '.char-card .attributes'
        }
    ],
    hub: [
        {
            screen: 'hub-screen',
            title: 'Base de Operações',
            text: 'Esta é sua base. Complete todas as missões para restaurar a Conexão Saúde.',
            highlightElement: '#hub-grid'
        },
        {
            screen: 'hub-screen',
            title: 'Acesso às Estações',
            text: 'Para desbloquear cada uma dessas portas, você precisará encontrar e escanear o QR Code físico correspondente.',
            highlightElement: '.door-station.locked'
        },
        {
            screen: 'hub-screen',
            title: 'Seu Passe de Agente',
            text: 'Clique aqui a qualquer momento para ver seu progresso, selos e Conquistas. Explore tudo para se tornar um agente lendário!',
            highlightElement: '#hub-overlay'
        },
        {
            screen: 'hub-screen',
            title: 'Missão Aceita',
            text: 'O resto é com você, Agente. Boa sorte!',
            highlightElement: null
        }
    ]
};

let gameState = { 
    player: null, 
    stations: {},
    achievements: {},
    completionCount: { mental: 0, sexual: 0, bucal: 0, nutricao: 0, adolescencia: 0 },
    stationToUnlock: null,
    triesThisStation: 0,
    tutorial: {
        step: 0,
        chapter: 'onboarding',
        completed: false,
        onboardingCompleted: false
    }
};

let activeGameIntervals = [];
let html5QrCode;
let currentHighlight = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const navigateTo = (screenId) => {
    $$('.screen').forEach(s => s.classList.remove('active'));
    $(`#${screenId}`).classList.add('active');
};

function unlockAchievement(id) {
    if (gameState.achievements[id] && !gameState.achievements[id].unlocked) {
        gameState.achievements[id].unlocked = true;
        const toast = $('#achievement-toast');
        toast.textContent = `🏆 Conquista: ${gameState.achievements[id].name}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

function createPixelAvatar(character, container) {
    container.innerHTML = ''; 
    if (character && character.image_url) {
        const img = document.createElement('img');
        img.src = character.image_url;
        img.alt = `Avatar de ${character.name}`;
        container.appendChild(img);
    }
}
    
function startTutorial(chapter = 'onboarding') {
    gameState.tutorial.chapter = chapter;
    gameState.tutorial.step = 0;
    showTutorialStep();
}

function endTutorialChapter() {
    $('#tutorial-modal').style.display = 'none';
    $('#tutorial-overlay').style.display = 'none';
    if (currentHighlight) {
        currentHighlight.classList.remove('tutorial-highlight');
        currentHighlight = null;
    }
}

function showTutorialStep() {
    if (currentHighlight) {
        currentHighlight.classList.remove('tutorial-highlight');
        currentHighlight = null;
    }

    const chapterName = gameState.tutorial.chapter;
    const stepIndex = gameState.tutorial.step;
    const chapterSteps = TUTORIAL_CHAPTERS[chapterName];

    if (stepIndex >= chapterSteps.length) {
        endTutorialChapter();
        if(chapterName === 'onboarding') {
            gameState.tutorial.onboardingCompleted = true;
        }
        if(chapterName === 'hub') {
            gameState.tutorial.completed = true;
            localStorage.setItem('tutorialCompleted', 'true');
        }
        return;
    }

    const step = chapterSteps[stepIndex];
    navigateTo(step.screen);

    setTimeout(() => {
        const tutorialModal = $('#tutorial-modal');
        $('#tutorial-title').textContent = step.title;
        $('#tutorial-text').textContent = step.text;
        
        let isLastStep = stepIndex === chapterSteps.length - 1;
        $('#tutorial-next-btn').textContent = isLastStep ? "Entendi!" : "Próximo";

        if (step.highlightElement) {
            const elementToHighlight = $(step.highlightElement);
            if (elementToHighlight) {
                currentHighlight = elementToHighlight;
                elementToHighlight.classList.add('tutorial-highlight');
                
                const rect = elementToHighlight.getBoundingClientRect();
                const modalHeight = tutorialModal.offsetHeight;

                if (rect.bottom + modalHeight + 20 > window.innerHeight) {
                    tutorialModal.style.top = `${rect.top - 20}px`;
                    tutorialModal.style.transform = 'translate(-50%, -100%)';
                } else {
                    tutorialModal.style.top = `${rect.bottom + 20}px`;
                    tutorialModal.style.transform = 'translate(-50%, 0)';
                }
            }
        } else {
            tutorialModal.style.top = '50%';
            tutorialModal.style.transform = 'translate(-50%, -50%)';
        }

        $('#tutorial-overlay').style.display = 'block';
        tutorialModal.style.display = 'block';
    }, 100);
}

function setupIntro() {
    const container = $('#briefing-container');
    const button = $('#accept-mission-btn');
    container.innerHTML = '';
    button.style.display = 'none';

    const dialogues = [
        { char: 'anna', text: "Pessoal, detectei um sinal estranho vindo da Unidade de Saúde. Parece um 'bug' espalhando desinformação." },
        { char: 'joao', text: "Um... um bug? Isso é sério? As pessoas podem acreditar em coisas erradas!" },
        { char: 'ju', text: "Demoro! Então a missão é essa: a gente invade as estações, completa os desafios e conserta esse sistema. Bora?" },
        { char: 'leo', text: "Positivo. A comunidade depende de nós. Preparem-se, agentes. A missão começa agora." }
    ];

    let dialogueIndex = 0;

    function showNextDialogue() {
        if (dialogueIndex >= dialogues.length) {
            button.style.display = 'block';
            button.style.animation = 'fadeIn 1s forwards';
            return;
        }

        const current = dialogues[dialogueIndex];
        const char = CHARACTERS[current.char];
        
        const dialogueBox = document.createElement('div');
        dialogueBox.className = 'dialogue-box';
        
        const avatarContainer = document.createElement('div');
        avatarContainer.className = 'pixel-avatar';
        createPixelAvatar(char, avatarContainer);
        
        const textElement = document.createElement('div');
        textElement.className = 'dialogue-text';
        
        dialogueBox.appendChild(avatarContainer);
        dialogueBox.appendChild(textElement);
        container.appendChild(dialogueBox);

        let charIndex = 0;
        const typing = setInterval(() => {
            if (charIndex < current.text.length) {
                textElement.textContent += current.text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typing);
                dialogueIndex++;
                showNextDialogue();
            }
        }, 40);
    }
    showNextDialogue();
}

function createCharacterCard(char) {
    const card = document.createElement('div');
    card.className = 'char-card glass-card';
    card.dataset.charId = char.id;

    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'pixel-avatar';
    createPixelAvatar(char, avatarContainer);

    const name = document.createElement('h3');
    name.textContent = char.name;

    const desc = document.createElement('p');
    desc.className = 'char-desc';
    desc.textContent = char.desc;

    const attributesContainer = document.createElement('div');
    attributesContainer.className = 'attributes';
    Object.entries(char.attributes).forEach(([attr, val]) => {
        const attrWrapper = document.createElement('div');
        const attrName = document.createElement('span');
        attrName.textContent = attr.charAt(0).toUpperCase() + attr.slice(1);
        
        const barContainer = document.createElement('div');
        barContainer.className = 'attr-bar-container';
        const barFill = document.createElement('div');
        barFill.className = 'attr-bar';
        barFill.style.width = `${val * 20}%`;
        barContainer.appendChild(barFill);

        attrWrapper.appendChild(attrName);
        attrWrapper.appendChild(barContainer);
        attributesContainer.appendChild(attrWrapper);
    });

    const perksContainer = document.createElement('div');
    perksContainer.className = 'perks-section';
    const advantage = document.createElement('div');
    advantage.className = 'perk advantage';
    advantage.innerHTML = `<span class="name">${char.perks.advantage.name}</span>`;
    const disadvantage = document.createElement('div');
    disadvantage.className = 'perk disadvantage';
    disadvantage.innerHTML = `<span class="name">${char.perks.disadvantage.name}</span>`;
    perksContainer.appendChild(advantage);
    perksContainer.appendChild(disadvantage);

    card.append(avatarContainer, name, desc, attributesContainer, perksContainer);
    return card;
}

function setupOnboarding() {
    const container = $('#character-selection');
    container.innerHTML = ''; 
    Object.values(CHARACTERS).forEach(char => {
        const card = createCharacterCard(char);
        container.appendChild(card);
    });
    
    $$('.char-card').forEach(card => {
        card.addEventListener('click', () => {
            $$('.char-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            gameState.player = CHARACTERS[card.dataset.charId];
        });
    });
}

function createDoorElement(id, station) {
    const isUnlocked = station.unlocked;
    const stationColors = { mental: 'var(--color-accent1-glow)', sexual: 'var(--color-accent2-glow)', bucal: 'var(--color-secondary-glow)', nutricao: 'var(--color-nutricao-glow)', adolescencia: 'var(--color-accent3-glow)' };

    const doorStation = document.createElement('div');
    doorStation.className = `door-station ${isUnlocked ? 'unlocked' : 'locked'}`;
    if(isUnlocked) doorStation.classList.add('is-open');
    doorStation.dataset.stationId = id;
    doorStation.id = `door-${id}`;

    const doorFrame = document.createElement('div');
    doorFrame.className = 'door-frame';
    if (isUnlocked) {
        doorFrame.style.setProperty('--glow-color', stationColors[id]);
    }

    const doorPanel = document.createElement('div');
    doorPanel.className = 'door-panel';
    const doorKnob = document.createElement('div');
    doorKnob.className = 'door-knob';
    doorPanel.appendChild(doorKnob);

    const doorTitle = document.createElement('div');
    doorTitle.className = 'door-title';
    doorTitle.textContent = station.title;

    const doorStatusIcon = document.createElement('div');
    doorStatusIcon.className = 'door-status-icon';
    doorStatusIcon.textContent = isUnlocked ? '✅' : '🔒';
    
    const doorReplayText = document.createElement('div');
    doorReplayText.className = 'door-replay-text';
    if(isUnlocked) {
        doorReplayText.innerHTML = 'Rejogar 🔄';
    }

    doorFrame.appendChild(doorPanel);
    doorStation.append(doorFrame, doorTitle, doorStatusIcon, doorReplayText);
    return doorStation;
}

function setupHub() {
    const unlockedCount = Object.values(gameState.achievements).filter(a => a.unlocked).length;
    const totalCount = Object.keys(ACHIEVEMENTS).length;
    $('#agent-panel-achievements').textContent = `🏆 ${unlockedCount} / ${totalCount}`;
    $('#agent-panel-name').textContent = gameState.player.name;
    createPixelAvatar(gameState.player, $('#agent-panel-avatar'));

    const container = $('#hub-grid');
    container.innerHTML = '';
    
    Object.entries(gameState.stations).forEach(([id, station]) => {
        const stationEl = createDoorElement(id, station);
        container.appendChild(stationEl);
        
        stationEl.addEventListener('click', () => {
            if (gameState.stations[id].unlocked) {
                unlockAchievement('curious_agent');
                startMinigame(id);
                return;
            }
            
            const doorPanel = stationEl.querySelector('.door-panel');
            if (doorPanel) {
                doorPanel.style.transform = 'rotateY(-75deg)';
            }
            
            setTimeout(() => {
                gameState.stationToUnlock = id;
                $('#scanner-subtitle').textContent = `Estação: ${STATIONS[id].title}`;
                navigateTo('scanner-screen');
                startQrScanner();
            }, 500); 
        });
    });
    
    createPixelAvatar(gameState.player, $('#hub-avatar'));
}

function handleScanSuccess() {
    const stationId = gameState.stationToUnlock;
    showInstructionsModal(stationId);
}
    
function showInstructionsModal(stationId) {
    const instructions = MINIGAME_INSTRUCTIONS[stationId];
    if (!instructions) return;

    $('#instructions-title').textContent = instructions.title;
    $('#instructions-how-to').textContent = instructions.how;
    $('#instructions-why').textContent = instructions.why;
    $('#instructions-modal').classList.add('visible');
    
    $('#start-challenge-btn').onclick = () => {
        $('#instructions-modal').classList.remove('visible');
        startMinigame(stationId);
    };
}

function showDiscoveryModal(masteryAchieved) {
    const stationId = gameState.stationToUnlock;
    const station = STATIONS[stationId];
    const feedbackOptions = COMMANDER_FEEDBACK[stationId] || ["Excelente trabalho, agente!"];
    const commanderMessage = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
    
    $('#commander-feedback').textContent = `Comandante: "${commanderMessage}"`;
    $('#modal-title').textContent = `ESTAÇÃO CONCLUÍDA!`;
    $('#modal-tip-text').innerHTML = `<strong>Super Dica:</strong> ${station.tip}`;
    
    const masterTipBox = $('#master-tip-box');
    if (masteryAchieved) {
        masterTipBox.innerHTML = `<p style="font-size: 24px; margin: 0;">🏆</p><p><strong>Dica de Mestre:</strong> ${station.masterTip}</p>`;
        masterTipBox.style.display = 'block';
        unlockAchievement('master_tip');
    } else {
        masterTipBox.style.display = 'none';
    }
    $('#discovery-modal').classList.add('visible');
}

function setupAgentPass() {
    createPixelAvatar(gameState.player, $('#pass-avatar'));
    $('#pass-name').textContent = gameState.player.name;
    
    const attrContainer = $('#pass-attributes');
    attrContainer.innerHTML = '';
    Object.entries(gameState.player.attributes).forEach(([attr, val]) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<span>${attr.charAt(0).toUpperCase() + attr.slice(1)}</span><div class="attr-bar-container"><div class="attr-bar" style="width: ${val * 20}%;"></div></div>`;
        attrContainer.appendChild(wrapper);
    });

    const perksContainer = $('#pass-perks');
    perksContainer.innerHTML = `<div class="perk advantage"><span class="name">${gameState.player.perks.advantage.name}</span><br>${gameState.player.perks.advantage.desc}</div><div class="perk disadvantage"><span class="name">${gameState.player.perks.disadvantage.name}</span><br>${gameState.player.perks.disadvantage.desc}</div>`;
    
    const stampsContainer = $('#stamps-grid');
    stampsContainer.innerHTML = '';
    const stationColors = { mental: '#a29bfe', sexual: '#e84393', bucal: '#0984e3', nutricao: '#00b894', adolescencia: '#fdcb6e' };
    const stampIcon = { mental: '🧠', sexual: '❤️', bucal: '🦷', nutricao: '⚡️', adolescencia: '⭐️' };
    Object.entries(gameState.stations).forEach(([id, station]) => {
        const stamp = document.createElement('div');
        stamp.className = 'stamp';
        stamp.innerHTML = `<div class="stamp-icon ${station.unlocked ? 'unlocked' : ''}" style="background-color: ${station.unlocked ? stationColors[id] : 'rgba(0,0,0,0.3)'};">${stampIcon[id]}</div><p>${station.title}</p>`;
        stampsContainer.appendChild(stamp);
    });
        
    const unlockedCount = Object.values(gameState.achievements).filter(a => a.unlocked).length;
    const totalCount = Object.keys(ACHIEVEMENTS).length;
    $('#achievement-progress-text').textContent = `${unlockedCount} / ${totalCount} Conquistas`;
    $('#achievement-progress-fill').style.width = `${(unlockedCount / totalCount) * 100}%`;

    const achievementsContainer = $('#achievements-grid');
    achievementsContainer.innerHTML = '';
    Object.values(gameState.achievements).forEach(ach => {
        const achievement = document.createElement('div');
        achievement.className = `achievement ${ach.unlocked ? 'unlocked' : ''}`;
        achievement.innerHTML = `<div class="name">${ach.name}</div><div class="desc">${ach.unlocked ? ach.desc : ach.locked_desc}</div>`;
        achievementsContainer.appendChild(achievement);
    });
}
    
function clearActiveGameIntervals() { activeGameIntervals.forEach(interval => clearInterval(interval)); activeGameIntervals = []; }
    
function endMinigame(success, reason = '', perfect = false) { 
    clearActiveGameIntervals(); 
    if (success) { 
        if (gameState.triesThisStation === 1 && !gameState.stations[gameState.stationToUnlock].unlocked) {
            unlockAchievement('first_try_master');
        }

        if (!gameState.stations[gameState.stationToUnlock].unlocked) {
            gameState.stations[gameState.stationToUnlock].unlocked = true;
            unlockAchievement(STATIONS[gameState.stationToUnlock].achievementId);
        }
        
        gameState.completionCount[gameState.stationToUnlock]++;
        if (Object.values(gameState.completionCount).every(count => count >= 2)) {
            unlockAchievement('double_trouble');
        }

        if (gameState.stationToUnlock === 'nutricao' && perfect) {
            unlockAchievement('speed_demon');
        }
        
        showDiscoveryModal(true); 
    } else { 
        $('#failure-reason').textContent = reason;
        $('#failure-modal').classList.add('visible'); 
    } 
}
    
function startMinigame(stationId) {
    gameState.triesThisStation = 1;
    gameState.stationToUnlock = stationId; 
    const station = STATIONS[stationId];
    const attr = station.challengeAttr;
    const container = $('#minigame-container');
    container.innerHTML = '';
    container.onclick = null;
    clearActiveGameIntervals();
    $('#minigame-screen .minigame-title').textContent = `Desafio de ${attr.charAt(0).toUpperCase() + attr.slice(1)}`;
    if (attr === 'forca') setupForcaGame(container);
    else if (attr === 'velocidade') setupVelocidadeGame(container);
    else if (attr === 'inteligencia') {
        if (stationId === 'mental') setupMentalQuizGame(container);
        else setupBalanceGame(container);
    }
    else if (attr === 'carisma') setupSexualSwipeGame(container);
    navigateTo('minigame-screen');
}

function setupForcaGame(container) {
    let wins = 0;
    const maxWins = 3;
    const instructions = $('#minigame-screen .minigame-instructions');
    instructions.innerHTML = `Acerte o tempo 3 vezes para provar sua habilidade!`;
    
    const playerForca = gameState.player.attributes.forca;
    if (playerForca >= 4) { instructions.innerHTML += "<br><span class='perk-text advantage'>Sua alta Força torna o indicador mais lento e a área de acerto maior!</span>"; } 
    else if (playerForca <= 2) { instructions.innerHTML += "<br><span class='perk-text disadvantage'>Sua baixa Força torna o indicador mais rápido e a área menor. Precisão é tudo!</span>"; }
    
    function newRound() {
        container.innerHTML = `<div class="force-bar-wrapper"><div class="force-bar-rounds">ACERTOS: ${wins} / ${maxWins}</div><div class="force-bar"><div class="force-bar-target"></div><div class="force-bar-indicator"></div></div></div>`;
        const difficultyModifier = wins * 0.2;
        const speedModifier = (playerForca - 3) * 0.3; 
        const indicatorSpeed = Math.max(0.8, 2.5 - difficultyModifier - speedModifier);
        const targetWidth = 25 + (playerForca - 3) * 5;
        
        $('.force-bar-target').style.cssText = `width:${targetWidth}%; left:${Math.random() * (100 - targetWidth)}%`;
        $('.force-bar-indicator').style.animation = `moveIndicator ${indicatorSpeed}s infinite alternate ease-in-out`;
    }

    container.onclick = () => {
        const indicator = $('.force-bar-indicator'), target = $('.force-bar-target');
        if (indicator && indicator.getAnimations()[0]) indicator.getAnimations()[0].pause(); else return;
        const currentPos = (indicator.offsetLeft / $('.force-bar').offsetWidth) * 100;
        const targetLeft = parseFloat(target.style.left), targetWidth = parseFloat(target.style.width);
        if (currentPos >= targetLeft && currentPos <= (targetLeft + targetWidth)) { if (++wins >= maxWins) endMinigame(true); else newRound(); } 
        else { endMinigame(false, 'Você errou o tempo! Mais precisão da próxima vez.'); }
    };
    newRound();
}

function setupVelocidadeGame(container) {
    const instructions = $('#minigame-screen .minigame-instructions');
    instructions.innerHTML = "Colete 15 alimentos saudáveis para vencer!";
    let lives = 3;
    let perfectGame = true;
    let gameEnded = false;
    let healthyCollected = 0;
    const healthyGoal = 15;
    
    const healthyFoods = ['🍎', '🥦', '🥕', '🍓', '🍇', '🍉', '🍌', '🍊', '🍐', '🍅'];
    const unhealthyFoods = ['🍩', '🍕', '🍔', '🍟', '🍫', '🥤', '🍰', '🍿', '🍭', '🍬'];
    
    const playerVelocidade = gameState.player.attributes.velocidade;
    if (playerVelocidade >= 4) { instructions.innerHTML += "<br><span class='perk-text advantage'>Seus reflexos rápidos fazem os itens caírem mais devagar!</span>"; } 
    else if (playerVelocidade <= 2) { instructions.innerHTML += "<br><span class='perk-text disadvantage'>Sua velocidade é um desafio a mais. Foco total!</span>"; }

    container.innerHTML = `<div class="speed-game-hud"><div class="score-display">Coletados: 0 / ${healthyGoal}</div><div class="lives-container">❤️❤️❤️</div></div><div class="speed-game-area"></div>`;
    const gameArea = container.querySelector('.speed-game-area');
    const livesDisplay = container.querySelector('.lives-container');
    const scoreDisplay = container.querySelector('.score-display');
    
    const gameLoop = setInterval(() => {
        if (gameEnded) return;
        const healthy = Math.random() > 0.4;
        const icon = document.createElement('div');
        icon.className = 'game-icon';
        icon.isHandled = false; 
        const iconChar = healthy ? healthyFoods[Math.floor(Math.random() * healthyFoods.length)] : unhealthyFoods[Math.floor(Math.random() * unhealthyFoods.length)];
        icon.textContent = iconChar;
        icon.style.left = `${Math.random() * 90}%`;
        icon.style.top = `-10%`;
        
        icon.onclick = () => {
            if (gameEnded || icon.isHandled) return;
            icon.isHandled = true;
            if (healthy) {
                healthyCollected++;
                scoreDisplay.textContent = `Coletados: ${healthyCollected} / ${healthyGoal}`;
                if (healthyCollected >= healthyGoal) {
                    gameEnded = true;
                    endMinigame(true, '', perfectGame);
                }
            } else { 
                perfectGame = false;
                lives--; 
                livesDisplay.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives); 
                $('#minigame-screen').classList.add('shake'); 
                setTimeout(() => $('#minigame-screen').classList.remove('shake'), 300); 
                if (lives <= 0) { 
                    gameEnded = true;
                    endMinigame(false, 'Você clicou em uma guloseima!'); 
                } 
            }
            icon.remove();
        };
        gameArea.appendChild(icon);

        let top = -10;
        const fallSpeed = 3.0 - (playerVelocidade * 0.4);

        const fallInterval = setInterval(() => { 
            if (gameEnded || icon.isHandled) {
                clearInterval(fallInterval);
                if (icon.parentNode) icon.remove();
                return;
            }
            top += fallSpeed; 
            icon.style.top = `${top}%`; 
            if (top > 110) { 
                clearInterval(fallInterval); 
                icon.isHandled = true;
                if(icon.parentNode) icon.remove(); 
                if (healthy) {
                    perfectGame = false;
                    lives--;
                    livesDisplay.textContent = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
                    if (lives <= 0) { 
                        gameEnded = true;
                        endMinigame(false, 'Você deixou um alimento saudável cair!'); 
                    }
                }
            } 
        }, 50);
        activeGameIntervals.push(fallInterval);
    }, 900);
    activeGameIntervals.push(gameLoop);
}

function setupMentalQuizGame(container) {
    const allQuestions = [
        { q: "Mito ou Verdade: Falar sobre sentimentos é sinal de fraqueza.", a: false, distractors: ["Depende da situação", "Só se for com estranhos"] },
        { q: "Se sentir ansioso antes de uma prova é algo que só acontece comigo.", a: false, distractors: ["É raro, mas acontece", "É um sinal de despreparo"] },
        { q: "Pedir ajuda para um adulto de confiança quando estou mal é uma boa ideia.", a: true, distractors: ["Só se o problema for grave", "É melhor resolver sozinho"] },
        { q: "Passar muito tempo nas redes sociais comparando minha vida com a dos outros pode me deixar pra baixo.", a: true, distractors: ["Isso só me inspira", "Não tem nada a ver"] },
        { q: "Ter um hobby ou fazer algo que eu gosto é uma boa forma de cuidar da minha mente.", a: true, distractors: ["É perda de tempo", "Só se for algo produtivo"] }
    ];
    
    let questions = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, 3);
    let currentQuestionIndex = 0;

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endMinigame(true);
            return;
        }
        const currentQuestion = questions[currentQuestionIndex];
        const instructions = $('#minigame-screen .minigame-instructions');
        instructions.innerHTML = `Analise a afirmação e responda. (${currentQuestionIndex + 1}/3)`;
        const intelligence = gameState.player.attributes.inteligencia;
        let options = [];
        if (currentQuestion.a) {
            options.push({ text: "Verdade", correct: true });
            options.push({ text: "Mito", correct: false });
        } else {
            options.push({ text: "Mito", correct: true });
            options.push({ text: "Verdade", correct: false });
        }
        if (intelligence <= 2) {
            options.push({ text: currentQuestion.distractors[0], correct: false });
            options.push({ text: currentQuestion.distractors[1], correct: false });
        } else if (intelligence <= 3) {
            options.push({ text: currentQuestion.distractors[0], correct: false });
        }
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-progress-bar"><div class="quiz-progress" style="width: ${((currentQuestionIndex) / questions.length) * 100}%"></div></div>
                <div class="quiz-question">${currentQuestion.q}</div>
                <div class="quiz-options"></div>
            </div>
        `;
        const optionsContainer = container.querySelector('.quiz-options');
        shuffledOptions.forEach(opt => {
            const button = document.createElement('button');
            button.dataset.correct = opt.correct;
            button.textContent = opt.text;
            button.onclick = () => {
                if (button.dataset.correct === 'true') {
                    currentQuestionIndex++;
                    showQuestion();
                } else {
                    endMinigame(false, 'Resposta incorreta. Conhecimento é a chave!');
                }
            };
            optionsContainer.appendChild(button);
        });
    }
    showQuestion();
}
    
function setupBalanceGame(container) {
    const instructions = $('#minigame-screen .minigame-instructions');
    instructions.innerHTML = "Mantenha as barras em equilíbrio fazendo as escolhas certas!";
    const intelligence = gameState.player.attributes.inteligencia;
    if (intelligence >= 4) { instructions.innerHTML += "<br><span class='perk-text advantage'>Sua Mente Brilhante revela o impacto de cada escolha!</span>"; } 
    else if (intelligence <= 2) { instructions.innerHTML += "<br><span class='perk-text disadvantage'>Sua impaciência esconde os resultados. Escolha com cuidado!</span>"; }
    let bars = { estudos: 50, social: 50, saude: 50 };
    let eventCards = [
        { q: "Prova importante amanhã!", left: { text: "Virar a noite estudando", impact: { estudos: +25, social: -10, saude: -20 } }, right: { text: "Revisar e dormir cedo", impact: { estudos: +15, social: -5, saude: +10 } } },
        { q: "Seus amigos chamam para jogar bola.", left: { text: "Ir jogar com eles", impact: { estudos: -10, social: +15, saude: +15 } }, right: { text: "Ficar em casa e relaxar", impact: { estudos: +5, social: -10, saude: +5 } } },
        { q: "Você tem um trabalho em grupo para entregar.", left: { text: "Fazer sua parte e ajudar os outros", impact: { estudos: +20, social: +10 } }, right: { text: "Fazer apenas o mínimo necessário", impact: { estudos: -5, social: -5 } } },
        { q: "Seus pais pedem ajuda com as tarefas de casa.", left: { text: "Ajudar de bom grado", impact: { social: -5, saude: +10 } }, right: { text: "Dizer que está ocupado com os estudos", impact: { estudos: +10, social: -10 } } },
        { q: "Fim de semana livre!", left: { text: "Maratonar séries o dia todo", impact: { social: -10, saude: -15 } }, right: { text: "Praticar um esporte ou hobby", impact: { social: +5, saude: +20 } } },
        { q: "Um amigo parece triste e te chama para conversar.", left: { text: "Parar tudo para ouvi-lo", impact: { estudos: -10, social: +20, saude: +5 } }, right: { text: "Dizer que conversa com ele depois", impact: { social: -15 } } },
        { q: "Hora do almoço!", left: { text: "Lanche rápido na rua", impact: { saude: -10 } }, right: { text: "Comida caseira e balanceada", impact: { saude: +15 } } },
        { q: "Você recebe muitas notificações no celular enquanto estuda.", left: { text: "Deixar o celular no silencioso", impact: { estudos: +15, social: -5 } }, right: { text: "Responder cada mensagem na hora", impact: { estudos: -15, social: +10 } } },
    ].sort(() => 0.5 - Math.random());
    let currentCardIndex = 0;
    function updateBars() {
        Object.keys(bars).forEach(key => {
            const barFill = $(`#bar-${key} .balance-bar-fill`);
            let value = Math.max(0, Math.min(100, bars[key]));
            barFill.style.width = `${value}%`;
        });
    }
    function nextCard() {
        if (currentCardIndex >= eventCards.length) {
            endMinigame(true);
            return;
        }
        const cardData = eventCards[currentCardIndex];
        const cardContainer = $('.event-card-container');
        if(cardContainer) cardContainer.innerHTML = ''; 
        const newCard = document.createElement('div');
        newCard.className = 'event-card';
        const leftImpactHint = intelligence >= 4 ? `<div class="event-card-impacts">${formatImpact(cardData.left.impact)}</div>` : '';
        const rightImpactHint = intelligence >= 4 ? `<div class="event-card-impacts">${formatImpact(cardData.right.impact)}</div>` : '';
        newCard.innerHTML = `
            <div class="event-card-question">${cardData.q}</div>
            <div class="event-card-choices">
                <div>${cardData.left.text}${leftImpactHint}</div>
                <div>${cardData.right.text}${rightImpactHint}</div>
            </div>
        `;
        cardContainer.appendChild(newCard);
        setupDrag(newCard, cardData);
        currentCardIndex++;
    }
    function formatImpact(impact) {
        return Object.entries(impact).map(([key, value]) => {
            let icon = key === 'estudos' ? '📚' : key === 'social' ? '🎉' : '❤️';
            return `<span style="color: ${value > 0 ? 'var(--color-primary-glow)' : '#e74c3c'};">${icon}${value > 0 ? '↑' : '↓'}</span>`;
        }).join(' ');
    }
    function setupDrag(card, data) {
        let startX = 0, currentX = 0, isDragging = false;
        function onStart(e) { e.preventDefault(); startX = e.pageX || e.touches[0].pageX; isDragging = true; card.classList.add('grabbing'); }
        function onMove(e) { if (!isDragging) return; currentX = (e.pageX || e.touches[0].pageX) - startX; card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`; }
        function onEnd() {
            if (!isDragging) return;
            isDragging = false;
            card.classList.remove('grabbing');
            const decisionThreshold = 80;
            let choice = null;
            if (currentX > decisionThreshold) { choice = data.right; } 
            else if (currentX < -decisionThreshold) { choice = data.left; }
            if (choice) {
                Object.keys(choice.impact).forEach(key => { bars[key] += choice.impact[key]; });
                card.style.transform = `translateX(${currentX > 0 ? 500 : -500}px) rotate(${currentX * 0.1}deg)`;
                card.style.opacity = 0;
                updateBars();
                setTimeout(() => {
                    if (Object.values(bars).some(v => v <= 0 || v >= 100)) {
                        const brokenBar = Object.keys(bars).find(k => bars[k] <= 0 || bars[k] >= 100);
                        endMinigame(false, `Você desequilibrou sua vida! A barra de ${brokenBar} chegou ao limite.`);
                    } else { nextCard(); }
                }, 400);
            } else { card.style.transform = 'translateX(0) rotate(0deg)'; }
        }
        card.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        card.addEventListener('touchstart', onStart, { passive: true });
        document.addEventListener('touchmove', onMove, { passive: true });
        document.addEventListener('touchend', onEnd);
    }
    container.innerHTML = `
        <div class="balance-game-container">
            <div class="balance-bars">
                <div class="balance-bar-wrapper" id="bar-estudos"><span class="balance-bar-icon">📚</span><div class="balance-bar-container"><div class="balance-bar-fill"></div></div></div>
                <div class="balance-bar-wrapper" id="bar-social"><span class="balance-bar-icon">🎉</span><div class="balance-bar-container"><div class="balance-bar-fill"></div></div></div>
                <div class="balance-bar-wrapper" id="bar-saude"><span class="balance-bar-icon">❤️</span><div class="balance-bar-container"><div class="balance-bar-fill"></div></div></div>
            </div>
            <div class="event-card-container"></div>
        </div>
    `;
    updateBars();
    nextCard();
}

function setupSexualSwipeGame(container) {
    const scenarios = [
        { q: "Seu amigo te pede pra guardar um segredo que pode ser perigoso pra ele.", correct: false },
        { q: "Alguém que você está ficando te chama pra sair, mas você não quer. Dizer 'Não, obrigado(a)' de forma educada é a melhor opção.", correct: true },
        { q: "Você vê alguém postando boatos sobre um colega na internet. Curtir e compartilhar é uma boa ideia.", correct: false },
        { q: "Seu/sua parceiro(a) diz 'não' para algo. Você deve insistir até a pessoa mudar de ideia.", correct: false },
        { q: "Conversar sobre consentimento e limites antes de qualquer coisa é um sinal de respeito.", correct: true }
    ];
    let currentScenarioIndex = 0;
    const instructions = $('#minigame-screen .minigame-instructions');
    instructions.innerHTML = `Deslize para a direita se a atitude for POSITIVA 👍, ou para a esquerda se for NEGATIVA 👎.`;
    function nextCard() {
        if (currentScenarioIndex >= scenarios.length) { endMinigame(true); return; }
        const scenario = scenarios[currentScenarioIndex];
        container.innerHTML = `
            <div class="swipe-container">
                <div class="swipe-card" data-correct="${scenario.correct}">
                    <div class="swipe-feedback nope">👎</div>
                    <div class="swipe-feedback like">👍</div>
                    ${scenario.q}
                </div>
                <div class="swipe-instructions">
                    <span class="left">👎 Negativo</span> | <span class="right">Positivo 👍</span>
                </div>
            </div>
        `;
        const card = container.querySelector('.swipe-card');
        let startX = 0, currentX = 0, isDragging = false;
        function onStart(e) { startX = e.pageX || e.touches[0].pageX; isDragging = true; card.classList.add('grabbing'); }
        function onMove(e) {
            if (!isDragging) return;
            currentX = (e.pageX || e.touches[0].pageX) - startX;
            card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.1}deg)`;
            card.classList.add('swiping');
            const opacity = Math.abs(currentX) / (card.offsetWidth / 2);
            card.style.setProperty('--opacity-like', currentX > 0 ? opacity : 0);
            card.style.setProperty('--opacity-nope', currentX < 0 ? opacity : 0);
        }
        function onEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            card.classList.remove('grabbing', 'swiping');
            const decisionThreshold = 75;
            let choice;
            if (currentX > decisionThreshold) { choice = true; } 
            else if (currentX < -decisionThreshold) { choice = false; }
            if (choice !== undefined) {
                const correct = card.dataset.correct === 'true';
                if (choice === correct) {
                    card.style.transform = `translateX(${currentX > 0 ? 500 : -500}px)`;
                    card.style.opacity = 0;
                    currentScenarioIndex++;
                    setTimeout(nextCard, 300);
                } else { endMinigame(false, 'Decisão incorreta. Pense bem nas atitudes!'); }
            } else { card.style.transform = 'translateX(0) rotate(0deg)'; }
        }
        card.addEventListener('mousedown', onStart);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        card.addEventListener('touchstart', onStart, { passive: true });
        document.addEventListener('touchmove', onMove, { passive: true });
        document.addEventListener('touchend', onEnd);
    }
    nextCard();
}

function startQrScanner(final = false) {
    const readerId = final ? 'final-qr-reader' : 'qr-reader';
    const messageId = final ? 'final-scanner-message' : 'scanner-message';
    const qrReaderElement = $(`#${readerId}`);
    const scannerMessage = $(`#${messageId}`);
    
    qrReaderElement.classList.remove('success', 'error');
    scannerMessage.textContent = final ? "Aguardando QR Code..." : "Aponte a câmera para o QR Code da estação.";
    scannerMessage.style.color = 'var(--color-light)';

    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.error("Falha ao parar scanner existente:", err));
    }
    html5QrCode = new Html5Qrcode(readerId);

    const onScanSuccess = (decodedText) => {
        if (!html5QrCode || !html5QrCode.isScanning) return;
        if (final) {
            try {
                new URL(decodedText); 
                scannerMessage.textContent = "URL Válida! Redirecionando...";
                qrReaderElement.classList.add('success');
                window.location.href = decodedText;
                html5QrCode.stop();
            } catch (_) {
                scannerMessage.textContent = "QR Code inválido. Aponte para o QR Code do formulário.";
                qrReaderElement.classList.add('error');
                setTimeout(() => qrReaderElement.classList.remove('error'), 2000);
            }
        } else {
            const expectedQrValue = STATIONS[gameState.stationToUnlock].qrValue;
            if (decodedText === expectedQrValue) {
                scannerMessage.textContent = "Código correto! Desbloqueando...";
                qrReaderElement.classList.add('success');
                html5QrCode.stop().then(handleScanSuccess).catch(err => {
                    console.error("Falha ao parar scanner, mas prosseguindo.", err);
                    handleScanSuccess();
                });
            } else {
                scannerMessage.textContent = "QR Code errado. Tente o código da estação correta.";
                qrReaderElement.classList.add('error');
                setTimeout(() => qrReaderElement.classList.remove('error'), 1000);
            }
        }
    };

    html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: { width: 200, height: 200 } }, onScanSuccess, (error) => {})
        .catch(err => {
            console.error("Não foi possível iniciar o scanner.", err);
            scannerMessage.textContent = "Não foi possível acessar a câmera.";
        });
}

function init() {
    gameState.stations = JSON.parse(JSON.stringify(STATIONS));
    gameState.achievements = JSON.parse(JSON.stringify(ACHIEVEMENTS));
    if (localStorage.getItem('tutorialCompleted') === 'true') {
        gameState.tutorial.completed = true;
        gameState.tutorial.onboardingCompleted = true;
    }
    
    const splashVideo = $('#splash-video');
    splashVideo.play().catch(error => {
        console.warn("Autoplay do vídeo foi bloqueado.", error);
        setTimeout(() => { navigateTo('title-screen'); }, 3000);
    });
    splashVideo.addEventListener('ended', () => {
        navigateTo('title-screen');
    });

    const starsBg = $('#stars-bg');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.cssText = `width:${size}px; height:${size}px; left:${Math.random()*100}%; top:${Math.random()*100}%; animation-duration:${Math.random()*8+4}s; animation-delay:${Math.random()*4}s;`;
        starsBg.appendChild(star);
    }
    
    function stopScannerAndNavigate(screenId) {
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop().catch(err => console.error("Falha ao parar scanner:", err));
        }
        if (screenId) {
            setupHub();
            navigateTo(screenId);
        }
    }

    const eventMap = {
        'enter-game-btn': () => {
            setupIntro();
            navigateTo('intro-screen');
        },
        'accept-mission-btn': () => {
            setupOnboarding();
            navigateTo('onboarding-screen');
            if (!gameState.tutorial.onboardingCompleted) {
                startTutorial('onboarding');
            }
        },
        'tutorial-next-btn': () => {
            gameState.tutorial.step++;
            showTutorialStep();
        },
        'start-mission-btn': () => {
            if (!gameState.player) {
                const btn = $('#start-mission-btn');
                btn.style.borderColor = "var(--color-accent2-glow)";
                btn.textContent = "Escolha um Agente!";
                setTimeout(() => {
                    btn.style.borderColor = "var(--color-primary-glow)";
                    btn.textContent = "Iniciar Missão";
                }, 1500);
                return;
            }
            
            setupHub();
            navigateTo('hub-screen');

            if (!gameState.tutorial.completed) {
                startTutorial('hub');
            }
        },
        'back-to-briefing-btn': () => navigateTo('intro-screen'),
        'scanner-back-btn': () => stopScannerAndNavigate('hub-screen'),
        'retry-btn': () => { 
            gameState.triesThisStation++;
            $('#failure-modal').classList.remove('visible'); 
            startMinigame(gameState.stationToUnlock); 
        },
        'fail-back-to-hub-btn': () => {
            $('#failure-modal').classList.remove('visible');
            stopScannerAndNavigate('hub-screen');
        },
        'modal-close-btn': () => {
            $('#discovery-modal').classList.remove('visible');
            if (Object.values(gameState.stations).every(s => s.unlocked) && !gameState.achievements.game_complete.unlocked) {
                unlockAchievement('game_complete');
                createPixelAvatar(gameState.player, $('#completion-avatar'));
                navigateTo('completion-screen');
            } else {
                stopScannerAndNavigate('hub-screen');
            }
        },
        'hub-overlay': () => {
            setupAgentPass();
            navigateTo('pass-screen');
        },
        'pass-back-btn': () => navigateTo('hub-screen'),
        'register-mission-btn': () => {
            navigateTo('final-scanner-screen');
            startQrScanner(true);
        },
        'final-scanner-back-btn': () => {
            stopScannerAndNavigate('completion-screen');
        }
    };
    
    for (const [id, action] of Object.entries(eventMap)) { 
        const element = $(`#${id}`);
        if (element) {
            element.addEventListener('click', action); 
        }
    }
}

document.addEventListener('DOMContentLoaded', init);