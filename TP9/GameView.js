class GameView {
  constructor(game) {
    this.canvas = document.querySelector("canvas");
    this.dim = {
      width: this.canvas.width - 830,
      height: this.canvas.height,
    };
    this.context = this.canvas.getContext("2d");
    this.game = game;
    this.imgs = {};
    this.background = new Image();
    this.background.src = "./assets/map.png";
    this.minute = 0;
    this.seconde = 0;
    this.deadPlayers = [];
    this.livingPlayers = [];
    this.classementPlayer = [];
    this.div = document.querySelector("#tableau");
    this.div2 = document.querySelector("#victoryScreen");
  }

  createHealthBar(player) {
    if (this.livingPlayers.includes(player.id)) {
      this.context.fillStyle = "red";
      this.context.fillRect(
        player.renderX * this.dim.width + 4.5,
        player.renderY * this.dim.height - 7,
        55,
        10,
      );
      this.context.fillStyle = "#0cc87d";
      this.context.fillRect(
        player.renderX * this.dim.width + 4.5,
        player.renderY * this.dim.height - 7,
        55 * (player.hp / player.maxHp),
        10,
      );
      this.context.font = "15px arial";
      this.context.fillStyle = "white";
      this.context.fillText(
        `lvl:${player.lvl}`,
        player.renderX * this.dim.width - 35,
        player.renderY * this.dim.height + 3,
      );

      this.context.strokeStyle = "black";
      this.context.lineWidth = 1;
      this.context.strokeRect(
        player.renderX * this.dim.width + 4.5,
        player.renderY * this.dim.height - 7,
        55,
        10,
      );
    }
  }

  createCooldownBar(player) {
    if (this.livingPlayers.includes(player.id)) {
      this.context.fillStyle = "#e1a337";
      this.context.fillRect(
        player.renderX * this.dim.width + 4.5,
        player.renderY * this.dim.height + 71,
        55 * (player.currentAttackCooldown / player.attackCooldown),
        8,
      );
    }
  }

  createProfile(player) {
    if (this.livingPlayers.includes(player.id)) {
      this.context.font = "bold 15px Arial";
      this.context.fillStyle = "white";
      this.context.fillText(
        `${player.name}`,
        player.renderX * this.dim.width,
        player.renderY * this.dim.height - 17,
      );
    }
  }

  timer() {
    let minutes = Math.trunc(this.game.timer / 60);
    let secondes = Math.trunc(this.game.timer % 60);
    if (secondes < 10) secondes = `0${secondes}`;
    if (minutes < 10) minutes = `0${minutes}`;

    for (let element in this.game.players) {
      if (this.livingPlayers.includes(element)) {
        this.game.players[element].aliveTime = `${minutes}:${secondes}`;
        this.game.players[element].aliveTimeCount = this.game.timer;
      }
    }

    this.context.lineWidth = 5;
    this.context.strokeStyle = "white";
    this.context.strokeRect(
      0.68 * this.canvas.width,
      0.1 * this.canvas.height - 60,
      198,
      70,
    );
    this.context.font = "Bold 70px Arial";
    this.context.fillStyle = "white";
    this.context.fillText(
      `${minutes}:${secondes}`,
      0.68 * this.canvas.width + 10,
      0.1 * this.canvas.height,
    );
  }

  createImg() {
    for (let element in this.game.players) {
      this.imgs[element] = new Image();
      this.imgs[element].src = this.game.players[element].skinPath;
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.dim.width, this.dim.height);
  }

  drawBackground() {
    let img = this.background;
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (img.complete && img.naturalWidth !== 0) {
      this.context.drawImage(img, 0, 0, this.dim.width, this.dim.height);
    } else {
      this.context.fillStyle = "black";
      this.context.fillRect(0, 0, this.dim.width, this.dim.height);
    }
  }

  drawPlayer(player) {
    if (!this.imgs[player.id]) {
      this.imgs[player.id] = new Image();
      this.imgs[player.id].src = player.skinPath;
    }
    if (player.hp <= 0) player.isDying = true;
    player.animate();
    let swidth = 64;
    let sheight = 64;
    let width = 64;
    let height = 64;
    let x = player.renderX * this.dim.width;
    let y = player.renderY * this.dim.height;
    const cursed = [26, 29, 24, 21, 18, 13];
    const skinNumber = Number(player.skinPath.replace(/\D/g, ""));
    //transforme le player.skinPath en string comportant uniquement des chiffres
    //puis le number transforme la string en int utilisable pour le includes
    let change = 192;

    let dir = player.direction;

    if (player.direction === 1) dir = 3;
    else if (player.direction === 3) dir = 1;

    let cropX = 0;
    let cropY = 64 * (8 + dir);

    if (player.isWalking) {
      cropX = 64 * player.walkSpriteIndex;
    }
    if (
      player.isAttacking ||
      player.currentAttackSpriteStep > 0 ||
      player.attackSpriteIndex > 0
    ) {
      let line = 18;
      let decal = 64;

      if (cursed.includes(skinNumber)) {
        change = 128;
        line = 27;
        decal = 32;
      }
      cropX = change * player.attackSpriteIndex;
      cropY = change * (line + dir);
      swidth = change;
      sheight = change;
      x -= decal;
      y -= decal;
      width = change;
      height = change;
    }
    if (player.isDying) {
      cropX = 64 * player.deathSpriteIndex;
      cropY = 64 * 20;
    }

    let img = this.imgs[player.id];

    this.context.drawImage(
      img,
      cropX, //emplacement du crop
      cropY,
      swidth, //taille du crop
      sheight,
      x, //player.coordX,
      y, //player.coordY,
      width, //taille de l'image
      height,
    );
  }

  classement() {
    this.context.font = "bold 70px arial";
    this.context.fillStyle = "white";
    this.context.fillText(
      `${this.livingPlayers.length}/${Object.keys(this.game.players).length}`,
      this.canvas.width * 0.91,
      this.canvas.height * 0.1,
    );
    console.log(this.livingPlayers);

    const players = this.game.players;

    this.livingPlayers.forEach((element, index) => {
      for (let i = index; i < this.livingPlayers.length; i++) {
        if (
          players[this.livingPlayers[index]].lvl <
          players[this.livingPlayers[i]].lvl
        )
          [this.livingPlayers[i], this.livingPlayers[index]] = [
            this.livingPlayers[index],
            this.livingPlayers[i],
          ];
      }
    });

    this.deadPlayers.forEach((element, index) => {
      for (let i = index; i < this.deadPlayers.length; i++) {
        if (
          players[this.deadPlayers[index]].aliveTimeCount <
          players[this.deadPlayers[i]].aliveTimeCount
        )
          [this.deadPlayers[i], this.deadPlayers[index]] = [
            this.deadPlayers[index],
            this.deadPlayers[i],
          ];
      }
    });

    this.classementPlayer = this.livingPlayers.concat(this.deadPlayers);

    this.classementPlayer.forEach((element, index) => {
      let tag = document.getElementById(
        `number${this.game.players[element].id}`,
      );

      if (!tag) {
        tag = document.createElement("p");
        tag.id = `number${this.game.players[element].id}`;
        document.querySelector("#tableau").appendChild(tag);
      }
      tag.id = `number${this.game.players[element].id}`;
      let string = `${this.game.players[element].name}`;
      if (this.livingPlayers.includes(this.game.players[element].id))
        string = `N°${index + 1} | ${string} | LVL : ${this.game.players[element].lvl}`;
      else if (this.deadPlayers.includes(this.game.players[element].id))
        string = `N°${index + 1} | ${string} | Temps en vie : ${this.game.players[element].aliveTime}`;
      tag.innerHTML = string;
      document.querySelector("#tableau").appendChild(tag);
    });
  }

  checkLivingPlayers(player) {
    if (player.isDying && !this.deadPlayers.includes(player.id)) {
      this.deadPlayers.push(player.id);
      this.livingPlayers.splice(this.livingPlayers.indexOf(player.id), 1);
    }
    if (
      !this.livingPlayers.includes(player.id) &&
      !this.deadPlayers.includes(player.id)
    )
      this.livingPlayers.push(player.id);
    const playersTab = Object.keys(this.game.players);
    if (this.livingPlayers.length > playersTab.length)
      this.livingPlayers.forEach((element, index) => {
        const check = playersTab.includes(element) ? true : false;
        if (!check) {
          this.livingPlayers.splice(index, 1);
          document
            .querySelector(`#number${this.game.players[element].id}`)
            .remove();
        }
      });
  }

  victoryScene() {
    if (this.game.isOver) {
      const racc = this.div2.style;
      racc.display = "block";

      const doppel = document.querySelector("#winner");
      const ctx = doppel.getContext("2d");
      let img = new Image();

      img.onload = function () {
        ctx.drawImage(
          img,
          0,
          64 * 10,
          64,
          64,
          0,
          0,
          doppel.width,
          doppel.height,
        );
      };

      img.src = this.game.players[this.livingPlayers[0]].skinPath;
      doppel.imageSource = img;
    } else if (this.livingPlayers.length === 0)
      console.log("manque des joueurs, pas de vainqueur");
  }

  render() {
    this.drawBackground();

    //pour chaque joueur dans players
    for (let element in this.game.players) {
      this.checkLivingPlayers(this.game.players[element]);
      this.drawPlayer(this.game.players[element]);
      this.createProfile(this.game.players[element]);
      this.createCooldownBar(this.game.players[element]);
      this.createHealthBar(this.game.players[element]);
    }
    this.timer();
    this.classement();
    this.victoryScene();
  }
}
