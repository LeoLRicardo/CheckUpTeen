// ==================== ESTADO GLOBAL ====================
const gameState = {
    player: { name: "" },
    mission: { progress: 0 },
    tutorial: { completed: false, step: 0 },
    achievements: {},
    station: null
};

// Exemplo de estações (ajuste conforme seu jogo)
const STATIONS = {
    1: { id: 1, qrValue: "station1", name: "Estação 1" },
    2: { id: 2, qrValue: "station2", name: "Estação 2" }
};

let qrScanner = null;
let isScanning = false;

// ==================== FUNÇÕES DE NAVEGAÇÃO ====================
function navigateTo(screenId) {
    document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.remove("hidden");
}

function showModal(modalId) {
    document.querySelectorAll(".modal").forEach(m => m.classList.add("hidden"));
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("hidden");
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");
}

// ==================== SCANNER ====================
async function startQrScanner(isFinal = false, stationId = null) {
    const readerId = isFinal ? "final-qr-reader" : "qr-reader";
    const messageId = isFinal ? "final-scanner-message" : "scanner-message";

    const qrReader = document.getElementById(readerId);
    const message = document.getElementById(messageId);

    if (!qrReader || !message) return;

    // Reset visual
    qrReader.classList.remove("success", "error");
    message.textContent = "Aponte a câmera para o QR Code";
    message.setAttribute("aria-live", "polite");
    message.setAttribute("role", "status");

    if (isScanning && qrScanner) {
        try { await qrScanner.stop(); } catch {}
    }

    qrScanner = new Html5Qrcode(readerId);
    isScanning = true;

    qrScanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
            if (isFinal) {
                // Aceita qualquer QR por enquanto (você vai restringir depois)
                window.location.href = decodedText;
            } else {
                const station = STATIONS[stationId];
                if (station && decodedText === station.qrValue) {
                    qrReader.classList.add("success");
                    message.textContent = "QR Code válido!";
                    handleScanSuccess(stationId);
                } else {
                    qrReader.classList.add("error");
                    message.textContent = "QR Code inválido.";
                }
            }
        },
        (err) => { console.warn("QR scan error:", err); }
    ).catch(err => {
        console.error("Erro ao iniciar scanner:", err);
        message.textContent = "Erro ao acessar a câmera.";
    });
}

async function stopQrScanner() {
    if (isScanning && qrScanner) {
        try { await qrScanner.stop(); } catch {}
        qrScanner.clear();
        isScanning = false;
    }
}

function handleScanSuccess(stationId) {
    stopQrScanner();
    gameState.station = stationId;
    showModal("discovery-modal");
    document.getElementById("discovery-message").textContent =
        `Você descobriu ${STATIONS[stationId].name}!`;
}

// ==================== TUTORIAL ====================
const tutorialSteps = [
    { element: "#start-btn", text: "Clique para começar sua missão." },
    { element: "#accept-mission-btn", text: "Aceite a missão e continue." },
    { element: "#open-scanner-btn", text: "Escaneie QR Codes pela cidade." }
];

function startTutorial() {
    if (gameState.tutorial.completed) return;
    gameState.tutorial.step = 0;
    navigateTo("intro-screen");
    showTutorialStep();
}

function showTutorialStep() {
    const step = tutorialSteps[gameState.tutorial.step];
    if (!step) {
        endTutorial();
        return;
    }

    const element = document.querySelector(step.element);
    const highlight = document.getElementById("tutorial-highlight");
    const modal = document.getElementById("tutorial-modal");

    if (element && highlight && modal) {
        const rect = element.getBoundingClientRect();
        highlight.style.top = rect.top + "px";
        highlight.style.left = rect.left + "px";
        highlight.style.width = rect.width + "px";
        highlight.style.height = rect.height + "px";

        document.getElementById("tutorial-text").textContent = step.text;
        document.getElementById("tutorial-overlay").classList.remove("hidden");

        // posicionar modal sempre visível
        let top = rect.bottom + 10;
        if (top + modal.offsetHeight > window.innerHeight) {
            top = rect.top - modal.offsetHeight - 10;
        }
        modal.style.top = `${Math.max(10, top)}px`;
        modal.style.left = "50%";
        modal.style.transform = "translateX(-50%)";
    }
}

function nextTutorialStep() {
    gameState.tutorial.step++;
    if (gameState.tutorial.step < tutorialSteps.length) {
        showTutorialStep();
    } else {
        endTutorial();
    }
}

function endTutorial() {
    document.getElementById("tutorial-overlay").classList.add("hidden");
    gameState.tutorial.completed = true;
}

// ==================== MINIGAME ====================
function startMinigame() {
    navigateTo("minigame-screen");
    const container = document.getElementById("minigame-container");
    if (!container) return;

    container.innerHTML = "";
    const cards = ["✔️ Correto!", "❌ Errado!", "✔️ Muito bem!"];

    cards.forEach((text, i) => {
        const card = document.createElement("div");
        card.className = "swipe-card";
        card.textContent = text;
        card.style.zIndex = cards.length - i;
        container.appendChild(card);
        initSwipe(card);
    });
}

function initSwipe(card) {
    let startX = 0, currentX = 0, isDragging = false;

    function onMove(e) {
        if (!isDragging) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        currentX = x - startX;
        card.style.transform = `translateX(${currentX}px) rotate(${currentX/10}deg)`;
    }

    function onEnd() {
        if (!isDragging) return;
        isDragging = false;

        if (Math.abs(currentX) > 100) {
            card.style.transition = "transform 0.3s";
            card.style.transform = `translateX(${currentX > 0 ? 1000 : -1000}px) rotate(${currentX/10}deg)`;
            setTimeout(() => card.remove(), 300);
        } else {
            card.style.transition = "transform 0.3s";
            card.style.transform = "translateX(0) rotate(0)";
        }
    }

    card.addEventListener("mousedown", e => {
        isDragging = true;
        startX = e.clientX;
        currentX = 0;
    });

    card.addEventListener("touchstart", e => {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentX = 0;
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
}

// ==================== EVENTOS ====================
document.addEventListener("DOMContentLoaded", () => {
    // Estrelas de fundo (uma vez só)
    const starsContainer = document.querySelector(".stars");
    if (starsContainer) {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement("div");
            star.className = "star";
            star.style.position = "absolute";
            star.style.top = Math.random() * 100 + "%";
            star.style.left = Math.random() * 100 + "%";
            star.style.width = star.style.height = Math.random() * 3 + "px";
            star.style.background = "#fff";
            starsContainer.appendChild(star);
        }
    }

    // Mapa de eventos (único)
    const eventMap = {
        "start-btn": () => navigateTo("intro-screen"),
        "accept-mission-btn": () => navigateTo("onboarding-screen"),
        "register-mission-btn": () => {
            const name = document.getElementById("player-name").value.trim();
            if (name) {
                gameState.player.name = name;
                navigateTo("hub-screen");
                startTutorial();
            }
        },
        "open-scanner-btn": () => {
            navigateTo("scanner-screen");
            startQrScanner(false, 1);
        },
        "close-scanner-btn": () => {
            stopQrScanner();
            navigateTo("hub-screen");
        },
        "completion-back-to-hub-btn": () => navigateTo("hub-screen"),
        "close-final-scanner-btn": () => {
            stopQrScanner();
            navigateTo("hub-screen");
        },
        "open-achievements-btn": () => navigateTo("achievements-screen"),
        "achievements-back-btn": () => navigateTo("hub-screen"),
        "retry-btn": () => {
            hideModal("failure-modal");
            startMinigame();
        },
        "fail-back-to-hub-btn": () => {
            hideModal("failure-modal");
            navigateTo("hub-screen");
        },
        "modal-close-btn": () => {
            hideModal("discovery-modal");
            navigateTo("completion-screen");
        },
        "instructions-close-btn": () => hideModal("instructions-modal"),
        "tutorial-next-btn": () => nextTutorialStep()
    };

    Object.keys(eventMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("click", eventMap[id]);
    });
});
