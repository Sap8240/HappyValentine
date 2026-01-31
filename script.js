/* =========================
   3D HEART PARTICLE BACKGROUND
========================= */
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
resize();

window.addEventListener("resize", resize);

let particles = [];
let angle = 0;
let mouse = { x: 0, y: 0 };

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function heartShape(t) {
  const x = 18 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return { x, y };
}

// Create particles
for (let i = 0; i < 1200; i++) {
  let t = Math.random() * Math.PI * 2;
  let pos = heartShape(t);
  particles.push({
    t,
    z: Math.random(),
    size: Math.random() * 2 + 1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  angle += 0.005;

  particles.forEach(p => {
    const pos = heartShape(p.t);
    let scale = 5 + p.z * 20;

    let x = canvas.width / 2 + pos.x * scale * Math.cos(angle);
    let y = canvas.height / 2 - pos.y * scale;

    ctx.beginPath();
    ctx.fillStyle = `rgba(253,90,180,${500 - p.z})`;
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animate);
}
animate();

/* =========================
   BUTTON INTERACTIONS
========================= */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const final = document.getElementById("final");

let yesStage = 0;

noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * (window.innerWidth - 150);
  const y = Math.random() * (window.innerHeight - 80);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
});

yesBtn.addEventListener("click", () => {
  yesStage++;

  if (yesStage === 1) {
    question.textContent =
      "Are you sure Momma??? ";
    noBtn.style.opacity = 0;
    yesBtn.style.transform = "scale(1.2)";
  } 
  else if (yesStage === 2) {
    question.textContent = "Really Really Sure that you want to be Valentine of a loser like me??? ";
    yesBtn.style.transform = "scale(1.4)";
  } 
  else {
    window.location.href = "index1.html";
  }
});

function revealFinal() {
  document.getElementById("proposal").style.opacity = 0;
  setTimeout(() => {
    final.classList.add("active");
    document.querySelectorAll(".line").forEach((line, i) => {
      line.style.animationDelay = `${i * 1.2}s`;
    });
    document.querySelectorAll(".photos img").forEach((img, i) => {
      img.style.animationDelay = `${i * 0.8}s`;
    });
  }, 2000);
}

/* =========================
   MUSIC TOGGLE
========================= */
const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");
let playing = false;

toggle.onclick = () => {
  playing ? music.pause() : music.play();
  playing = !playing;
};