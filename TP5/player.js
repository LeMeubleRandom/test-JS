class Player {
  constructor(name, skin, coord) {
    this.name = name;
    this.skin = skin;
    this.coord = coord;
  }
  level = 0;
  attack = 0;
  cooldown = 0;
  speed = 0;
  hp = 50;
  max_hp = 50;
  hpPerS = 0;
  currentCooldown = 0;
  direction = 0;

  dead = false;
  attacking = false;
  moving = false;

  walkSpriteDuration = 2;
  walkSpriteIndex = 0;
  walkSpriteNumber = 9;
  currentStep = 0;

  animate() {
    if (this.moving) {
      this.currentStep++;
      if (this.currentStep >= this.walkSpriteDuration) {
        this.currentStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
      console.log(
        "En train d'attaquer :",
        this.attacking,
        "\nEn train de bouger :",
        this.moving,
        "\nEn train de mourir :",
        this.dead,
        "\nSprite N°",
        this.walkSpriteIndex
      );
      //en fonction de la direction
      //prendre ce paramêtre de direction pour calculer l'une des 4 lignes de déplacement
    } else if (this.attacking) {
      this.currentStep++;
      if (this.currentStep >= this.walkSpriteDuration) {
        this.currentStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
      console.log(
        "En train d'attaquer :",
        this.attacking,
        "\nEn train de bouger :",
        this.moving,
        "\nEn train de mourir :",
        this.dead,
        "\nSprite N°",
        this.walkSpriteIndex
      );
      //en fonction de la direction
      //prendre ce paramêtre de direction pour calculer l'une des 4 lignes d'attaque
    } else if (this.dead) {
      this.currentStep++;
      if (this.currentStep >= this.walkSpriteDuration) {
        this.currentStep = 0;
        this.walkSpriteIndex++;
      }
      console.log(
        "En train d'attaquer :",
        this.attacking,
        "\nEn train de bouger :",
        this.moving,
        "\nEn train de mourir :",
        this.dead,
        "\nSprite N°",
        this.walkSpriteIndex
      );
      //en fonction de la direction
      //prendre ce paramêtre de direction pour calculer l'une des 4 lignes de mort
    } else {
      this.currentStep = 0;
      this.walkSpriteIndex = 0;
      console.log(
        "En train d'attaquer :",
        this.attacking,
        "\nEn train de bouger :",
        this.moving,
        "\nEn train de mourir :",
        this.dead
      );
      //en fonction de la direction
      //prendre la première frame de marche
    }
  }

  showHealthBar() {
    console.log(`${this.hp}/${this.max_hp}`);
  }

  takeDamage(damage) {
    this.hp -= damage;
    this.takeDamageAnim(damage);
  }

  takeDamageAnim(damage) {
    console.log(`Vous avez subis ${damage}`);
  }

  levelUp() {
    this.level++;
    this.levelUpAnim(level);
  }

  levelUpAnim(level) {
    console.log(`Vous avez passé un niveau\nNiveau ${level}`);
  }

  updatePlayer(newData) {
    this.name = newData.name;
    this.skin = newData.skin;
    this.level = newData.level;
    this.attack = newData.attack;
    this.cooldown = newData.cooldown;
    this.currentCooldown = newData.currentCooldown;
    this.speed = newData.speed;
    this.hp = newData.hp;
    this.max_hp = newData.max_hp;
    this.hpPerS = newData.hpPerS;
    this.coord = newData.coord;
    this.direction = newData.direction;
    this.dead = newData.dead;
    this.attacking = newData.attacking;
    this.moving = newData.moving;
    this.currentStep = newData;
    this.walkSpriteDuration = newData.walkSpriteDuration;
    this.walkSpriteIndex = newData.walkSpriteIndex;
    this.walkSpriteNumber = newData.walkSpriteNumber;
    this.isAlive(newData.hp);
  }
}

let player1 = new Player("test", 1);
let player2 = new Player("test2", 2);

for (let i = 0; i < 60; i++) {
  player1.dead = true;
  player1.animate();
}
