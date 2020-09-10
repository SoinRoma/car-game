const score = document.querySelector(".score");
const start = document.querySelector(".text");
const image = document.querySelector(".start");
const gameArea = document.querySelector(".gameArea");
const car = document.createElement("div");

car.classList.add("car");

start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);

const keys = {
  w: false,
  s: false,
  a: false,
  d: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  trafic: 3,
};

function getQuantityElementElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
  start.classList.add("hide");
  image.classList.add("hide");
  gameArea.innerHTML = "";

  for (let i = 0; i < getQuantityElementElements(100); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = i * 75 + "px";
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElementElements(100 * setting.trafic); i++) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = -100 * setting.trafic * (i + 1);
    enemy.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    enemy.style.top = enemy.y + "px";

    gameArea.appendChild(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = "auto";
  car.style.bottom = "10px";
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (setting.start) {
    setting.score += setting.speed;
    score.innerHTML = "Score<br> " + setting.score;
    moveRoad();
    moveEnemy();
    if (keys.a && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.d && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }

    if (keys.w && setting.y > 0) {
      setting.y -= setting.speed;
    }

    if (keys.s && setting.y < gameArea.offsetHeight - car.offsetHeight) {
      setting.y += setting.speed;
    }

    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";

    requestAnimationFrame(playGame);
  }
}

function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll(".line");
  lines.forEach(function (line) {
    line.y += setting.speed;
    line.style.top = line.y + "px";
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();

    if (
      carRect.top <= enemyRect.bottom &&
      carRect.right >= enemyRect.left &&
      carRect.bottom >= enemyRect.top &&
      carRect.left <= enemyRect.right
    ) {
      setting.start = false;
      start.classList.remove("hide");
      image.classList.remove("hide");
      document.querySelector(".text").textContent =
        "Ваши очки: " + setting.score;
    }
    item.y += setting.speed / 2;
    item.style.top = item.y + "px";

    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.trafic * 2;
      item.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    }
  });
}
