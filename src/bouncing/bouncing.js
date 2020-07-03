//canvas setup
//get canvas dom in variable
const canvas = document.getElementById("canvas1");
//create context of canvas
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Create particles array
let particleArray = [];
const limitParticles = 600;
//Get mouse position
const mouse = {
  x: null,
  y: null,
};
const colorsFill = ["ffcbf2", "deaaff", "c0fdff", "6e2594", "001c55"];
setInterval(() => {
  mouse.x = undefined;
  mouse.y = undefined;
}, 200);
//listener of mouse movement
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

//Create particles
class Particle {
  constructor({ x, y, size, color, weight }) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }
  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  update = () => {
    this.size -= 0.05;
    if (this.size < 0) {
      this.x = mouse.x + (Math.random() * 20 - 10);
      this.y = mouse.y + (Math.random() * 20 - 10);
      this.size = Math.random() * 25 + 2;
      this.weight = Math.random() * 2 + -0.5;
    }
    this.y += this.weight;
    this.weight += 0.2;
    if (this.y > canvas.height - this.size && this.weight > 0.5) {
      //this change the bouncing
      this.weight *= -0.2;
    }
  };
}

const init = () => {
  particleArray = [];
  for (let i = 0; i < limitParticles; i++) {
    const config = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 25 + 2,
      color: `#${colorsFill[Math.floor(Math.random() * colorsFill.length)]}`,
      weight: 1,
    };

    particleArray.push(new Particle(config));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleArray.map((item) => {
    item.update();
    item.draw();
  });
  //requestAnimationFrame(animate);
};

const start = () => {
  setInterval(animate, 1000 / 80);
};

init();
start();
