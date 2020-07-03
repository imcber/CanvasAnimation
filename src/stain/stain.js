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
      this.x = mouse.x + Math.random() * 100 + 10;
      this.y = mouse.y + Math.random() * 100 + 10;
      this.size = Math.random() * 5 + 5;
      this.weight = Math.random() * 2 + -0.5;
    }
    this.y += this.weight;
    this.weight += 0.2;
    if (this.y > canvas.height) {
      //this change the bouncing
      this.weight *= -0.8;
    }
  };
}

const init = () => {
  particleArray = [];
  for (let i = 0; i < limitParticles; i++) {
    const config = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 5 + 5,
      color: `#${colorsFill[Math.floor(Math.random() * colorsFill.length)]}`,
      weight: 1,
    };

    particleArray.push(new Particle(config));
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillStyle = "rgba(0,0,0,0.05)";
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  particleArray.map((item) => {
    item.update();
    //item.draw();
  });
  connect();
  //requestAnimationFrame(animate);
};

const start = () => {
  setInterval(animate, 10);
};

init();
start();

const connect = () => {
  let opacityValue = 1;
  let numLink = 0;
  for (let a = 0; a < particleArray.length; a++) {
    for (let b = a; b < particleArray.length; b++) {
      let distance =
        (particleArray[a].x - particleArray[b].x) *
          (particleArray[a].x - particleArray[b].x) +
        (particleArray[a].y - particleArray[b].y) *
          (particleArray[a].y - particleArray[b].y);
      if (distance < 2000 && numLink < 52000) {
        opacityValue = 1 - distance / 10000;
        ctx.strokeStyle = `rgb(255,255,255,${opacityValue}`;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(particleArray[a].x, particleArray[a].y);
        ctx.lineTo(particleArray[b].x, particleArray[b].y);
        ctx.stroke();
        numLink++;
      } else {
        if (numLink > 2000) numLink = 0;
      }
    }
  }
};
