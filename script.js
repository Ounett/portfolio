const text = "futuro desarrollador web";
const typingText = document.getElementById("typing-text");

let index = 0;

function typeEffect() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 90);
    }
}

typeEffect();
const reveals = document.querySelectorAll(".reveal");

function revealElements() {
    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);

revealElements();
const glowCards = document.querySelectorAll(
    ".project-card, .skill, .about-card"
);

glowCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });
});
let secretCode = "";

document.addEventListener("keydown", (e) => {
    secretCode += e.key.toLowerCase();

    if (secretCode.length > 9) {
        secretCode = secretCode.slice(-9);
    }

    if (secretCode === "sudo dino") {
        const dino = document.getElementById("secret-dino");

        dino.classList.add("active");

        setTimeout(() => {
            dino.classList.remove("active");
        }, 5000);

        secretCode = "";
    }
});
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function activeMenu() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 180) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active-link");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active-link");
        }
    });
}

const modeBtn = document.getElementById("mode-btn");

modeBtn.addEventListener("click", () => {
    document.body.classList.add("rebooting");

    setTimeout(() => {
        document.body.classList.toggle("hacker-mode");

        if (document.body.classList.contains("hacker-mode")) {
            matrixInterval = setInterval(drawMatrix, 50);
            modeBtn.textContent = "Matrix ON";
        } else {
            clearInterval(matrixInterval);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            modeBtn.textContent = "Reboot System";
        }
    }, 300);

    setTimeout(() => {
        document.body.classList.remove("rebooting");
    }, 700);
});

const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

let columns;
let drops;
let matrixInterval;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / 20);
    drops = Array(columns).fill(1);
}

function drawMatrix() {
    ctx.fillStyle = "rgba(2, 6, 23, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#22c55e";
    ctx.font = "18px Consolas";

    drops.forEach((y, index) => {
        const text = Math.random() > 0.5 ? "1" : "0";
        const x = index * 20;

        ctx.fillText(text, x, y * 20);

        if (y * 20 > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
        }

        drops[index]++;
    });
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);
const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");

const loadingMessages = [
    "Booting EdwinOS...",
    "Loading portfolio modules...",
    "Starting Matrix engine...",
    "Checking developer profile...",
    "Access granted."
];

let messageIndex = 0;

const loaderMessages = setInterval(() => {
    loaderText.textContent = loadingMessages[messageIndex];
    messageIndex++;

    if (messageIndex === loadingMessages.length) {
        clearInterval(loaderMessages);
    }
}, 600);

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hidden");
    }, 3200);
});
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");

const commands = {

    help: `
Available commands:

whoami
skills
projects
social
clear
sudo dino
`,

    whoami: `
Edwin Escobar
Systems Engineering Student
Future Web Developer
`,

    skills: `
HTML
CSS
JavaScript
Java
Linux
SQL
Technical Support
`,

    projects: `
Portfolio Hacker UI
Java Projects
Cybersecurity Learning
`,

    social: `
GitHub: coming soon
LinkedIn: coming soon
`,

};

terminalInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        const command = terminalInput.value.trim();

        const userLine = document.createElement("p");

        userLine.innerHTML = `
        <span style="color:#22d3ee;">
        edwin@system:~$
        </span>
        ${command}
        `;

        terminalBody.appendChild(userLine);

        if (command === "clear") {

            terminalBody.innerHTML = `
                <p>Terminal cleared.</p>

                <div class="terminal-input-line">
                    <span>edwin@system:~$</span>

                    <input
                        type="text"
                        id="terminal-input"
                        autocomplete="off"
                    >
                </div>
            `;

            location.reload();
            return;
        }

        const output = document.createElement("p");

        output.innerText =
            commands[command] ||
            "Command not found.";

        terminalBody.appendChild(output);

        terminalInput.value = "";

        terminalBody.scrollTop =
            terminalBody.scrollHeight;
    }

});
const customCursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

const clickableElements = document.querySelectorAll(
    "a, button, .project-card, .skill, input"
);

clickableElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
        customCursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
        customCursor.classList.remove("active");
    });
});
const particlesCanvas = document.getElementById("particles-canvas");
const particlesCtx = particlesCanvas.getContext("2d");

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particlesArray = [];

class Particle {

    constructor() {

        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * particlesCanvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
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

for (let i = 0; i < 90; i++) {
    particlesArray.push(new Particle());
}

function animateParticles() {

    particlesCtx.clearRect(
        0,
        0,
        particlesCanvas.width,
        particlesCanvas.height
    );

    particlesArray.forEach((particle) => {

        particle.update();
        particle.draw();

    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener("resize", () => {

    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;

});