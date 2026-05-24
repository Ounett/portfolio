const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const typingText = $("#typing-text");
const phrases = [
    "building EdwinOS...",
    "future web developer",
    "technical support + systems",
    "developed by Ounett"
];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typingText) return;
    const current = phrases[phraseIndex];

    typingText.textContent = deleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    if (!deleting && charIndex > current.length + 6) deleting = true;
    if (deleting && charIndex < 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

const reveals = $$(".reveal");
function revealElements() {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < windowHeight - 90) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealElements);
revealElements();

const navbar = $(".navbar");
const sections = $$("main section[id]");
const navLinks = $$(".nav-links a");
function activeMenu() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    let current = "";
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 160) current = section.id;
    });
    navLinks.forEach((link) => {
        link.classList.toggle("active-link", link.getAttribute("href") === `#${current}`);
    });
}
window.addEventListener("scroll", activeMenu);
activeMenu();

const menuToggle = $("#menu-toggle");
const navList = $("#nav-links");
if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => navList.classList.toggle("open"));
    navLinks.forEach((link) => link.addEventListener("click", () => navList.classList.remove("open")));
}

const glowCards = $$(".project-card, .skill, .about-card, .lab-card");
glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
});

const canvas = $("#matrix-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let columns = 0;
let drops = [];
let matrixInterval = null;
function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / 20);
    drops = Array(columns).fill(1);
}
function drawMatrix() {
    if (!ctx || !canvas) return;
    ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#22c55e";
    ctx.font = "18px Consolas";
    drops.forEach((y, index) => {
        const text = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(text, index * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[index] = 0;
        drops[index]++;
    });
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function setMatrix(active) {
    document.body.classList.toggle("hacker-mode", active);
    const modeBtn = $("#mode-btn");
    if (active) {
        if (!matrixInterval) matrixInterval = setInterval(drawMatrix, 50);
        if (modeBtn) modeBtn.textContent = "Matrix ON";
        toast("Matrix mode enabled");
    } else {
        clearInterval(matrixInterval);
        matrixInterval = null;
        if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (modeBtn) modeBtn.textContent = "Matrix";
        toast("Matrix mode disabled");
    }
}

const modeBtn = $("#mode-btn");
if (modeBtn) {
    modeBtn.addEventListener("click", () => {
        document.body.classList.add("rebooting");
        setTimeout(() => setMatrix(!document.body.classList.contains("hacker-mode")), 250);
        setTimeout(() => document.body.classList.remove("rebooting"), 650);
    });
}

const recruiterBtn = $("#recruiter-btn");
function toggleRecruiter() {
    document.body.classList.toggle("recruiter-mode");
    const active = document.body.classList.contains("recruiter-mode");
    if (recruiterBtn) recruiterBtn.textContent = active ? "Ounett Mode" : "Recruiter Mode";
    toast(active ? "Recruiter mode enabled" : "Ounett mode restored");
}
if (recruiterBtn) recruiterBtn.addEventListener("click", toggleRecruiter);

const loader = $("#loader");
const loaderText = $("#loader-text");
const loadingMessages = [
    "Booting EdwinOS...",
    "Loading Ounett modules...",
    "Injecting portfolio UI...",
    "Checking developer profile...",
    "Access granted."
];
let msgIndex = 0;
if (loaderText) {
    const loaderMessages = setInterval(() => {
        loaderText.textContent = loadingMessages[msgIndex] || "Access granted.";
        msgIndex++;
        if (msgIndex >= loadingMessages.length) clearInterval(loaderMessages);
    }, 560);
}
window.addEventListener("load", () => setTimeout(() => loader?.classList.add("hidden"), 3000));

const secretDino = $("#secret-dino");
function showDino() {
    if (!secretDino) return;
    secretDino.classList.add("active");
    toast("Dino mode activated");
    setTimeout(() => secretDino.classList.remove("active"), 5000);
}

const terminalInput = $("#terminal-input");
const terminalBody = $("#terminal-body");
const commands = {
    help: `Available commands:\n\nwhoami\nskills\nprojects\nexperience\neducation\ncontact\nsocial\ncv\nopen vital-snack\nopen ouneassist\nmatrix\nrecruiter\nsudo dino\nclear`,
    whoami: `Edwin Escobar\nSystems Engineering Student\nTechnical Support + Future Web Developer\nIdentity: Ounett / EdwinOS`,
    skills: `HTML | CSS | JavaScript | Java | SQL\nWindows | Linux | Office\nPC repair | Technical Support | Customer Service`,
    projects: `01 Portfolio EdwinOS\n02 Vital Snack\n03 Sistema Diagnóstico Médico\n04 OuneAssist\n05 Sensor de Aplausos\n06 Dino Easter Egg`,
    experience: `2021-2025: Ventas, atención al cliente, inventario y facturación\nActual: Soporte técnico, mantenimiento, Windows/Linux y desarrollo de proyectos`,
    education: `Ingeniería en Sistemas de la Información\nRuta actual: web development, redes, Java y proyectos reales`,
    contact: `Email: escobaredwin715@gmail.com\nGitHub: pendiente de enlazar\nLinkedIn: pendiente de enlazar`,
    social: `Developed by Ounett\nGitHub: coming soon\nLinkedIn: coming soon`,
    cv: `Coloca tu archivo como cv-edwin.pdf en la carpeta del portfolio\ny el botón Descargar CV funcionará automáticamente.`
};
function appendTerminalLine(content, className = "terminal-output") {
    if (!terminalBody) return;
    const line = document.createElement("p");
    line.className = className;
    line.innerText = content;
    terminalBody.insertBefore(line, terminalBody.querySelector(".terminal-input-line"));
    terminalBody.scrollTop = terminalBody.scrollHeight;
}
function runCommand(command) {
    if (command === "clear") {
        const inputLine = terminalBody.querySelector(".terminal-input-line");
        terminalBody.innerHTML = "";
        terminalBody.appendChild(inputLine);
        return;
    }
    if (command === "sudo dino") return showDino();
    if (command === "matrix") return setMatrix(!document.body.classList.contains("hacker-mode"));
    if (command === "recruiter") return toggleRecruiter();
    if (command === "open vital-snack") return document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" });
    if (command === "open ouneassist") return document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" });
    appendTerminalLine(commands[command] || "Command not found. Type 'help'.");
}
if (terminalInput && terminalBody) {
    terminalInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        const command = terminalInput.value.trim().toLowerCase();
        if (!command) return;
        appendTerminalLine(`edwin@system:~$ ${command}`, "terminal-command");
        runCommand(command);
        terminalInput.value = "";
    });
}

let secretCode = "";
document.addEventListener("keydown", (e) => {
    secretCode += e.key.toLowerCase();
    if (secretCode.length > 9) secretCode = secretCode.slice(-9);
    if (secretCode === "sudo dino") {
        showDino();
        secretCode = "";
    }
});

function toast(message) {
    const toastEl = $("#toast");
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("active");
    clearTimeout(toastEl.timer);
    toastEl.timer = setTimeout(() => toastEl.classList.remove("active"), 2400);
}

$$(".mini-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        if (action === "scan") {
            const output = $("#scan-output");
            if (output) {
                output.textContent = "scanning UI...\nchecking projects...\nchecking terminal...\nresult: portfolio level upgraded";
            }
            toast("System scan completed");
        }
        if (action === "matrix") setMatrix(!document.body.classList.contains("hacker-mode"));
        if (action === "recruiter") toggleRecruiter();
        if (action === "dino") showDino();
    });
});

const customCursor = $("#custom-cursor");
if (customCursor) {
    document.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });
    $$("a, button, .project-card, .skill, input, .lab-card").forEach((el) => {
        el.addEventListener("mouseenter", () => customCursor.classList.add("active"));
        el.addEventListener("mouseleave", () => customCursor.classList.remove("active"));
    });
}

const particlesCanvas = $("#particles-canvas");
const particlesCtx = particlesCanvas ? particlesCanvas.getContext("2d") : null;
const particles = [];
function resizeParticles() {
    if (!particlesCanvas) return;
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}
class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.35;
        this.speedY = (Math.random() - 0.5) * 0.35;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > particlesCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particlesCanvas.width;
        if (this.y > particlesCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particlesCanvas.height;
    }
    draw() {
        particlesCtx.fillStyle = "rgba(34, 211, 238, 0.7)";
        particlesCtx.beginPath();
        particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        particlesCtx.fill();
    }
}
if (particlesCanvas && particlesCtx) {
    resizeParticles();
    for (let i = 0; i < 110; i++) particles.push(new Particle());
    function animateParticles() {
        particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        particles.forEach((p) => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    window.addEventListener("resize", () => { resizeParticles(); particles.forEach((p) => p.reset()); });
}
