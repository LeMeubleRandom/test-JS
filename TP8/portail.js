const bouton = document.querySelector("#userinfo");

class MenuController {
  constructor() {
    this.doc = document.querySelectorAll(".peau");

    this.inputState = false;
    this.indexState = {
      index: 0,
      currentIndex: 0,
      indexDuration: 0,
    };

    this.SERVER_TICK_RATE = 20;

    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    this.checkOver();
    this.loop = this.loop.bind(this);

    requestAnimationFrame(this.loop);
  }

  checkOver() {
    this.doc.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.inputState = true;
        let img = element.imageSource;
        const context = element.getContext("2d");

        element.width = 100;
        element.height = 100;

        context.clearRect(0, 0, element.width, element.height);

        var cropX = 0;
        var cropY = 64 * 15;
        var cropWidth = 64;
        var cropHeight = 64;

        element.style.width = cropWidth;
        element.style.height = cropHeight;

        context.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          element.width,
          element.height,
        );
      });

      element.addEventListener("mouseout", () => {
        this.inputState = false;
        let img = element.imageSource;
        const context = element.getContext("2d");

        context.clearRect(0, 0, 64, 64);

        var cropX = 0;
        var cropY = 64 * 10;
        var cropWidth = 64;
        var cropHeight = 64;

        element.style.width = cropWidth;
        element.style.height = cropHeight;

        context.drawImage(
          img,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          0,
          0,
          element.width,
          element.height,
        );
      });
    });
  }

  animate() {
    if (this.inputState) {
      let img = element.imageSource;
      const context = element.getContext("2d");

      element.width = 100;
      element.height = 100;

      var cropX = 0;
      var cropY = 64 * 15;
      var cropWidth = 64;
      var cropHeight = 64;

      element.style.width = cropWidth;
      element.style.height = cropHeight;

      context.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        element.width,
        element.height,
      );
    } else {
      let img = element.imageSource;
      const context = element.getContext("2d");

      context.clearRect(0, 0, 64, 64);

      var cropX = 0;
      var cropY = 64 * 10;
      var cropWidth = 64;
      var cropHeight = 64;

      element.style.width = cropWidth;
      element.style.height = cropHeight;

      context.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        element.width,
        element.height,
      );
    }
  }

  loop(timestamp) {
    console.log(this.inputState);
    this.animate();
    requestAnimationFrame(this.loop);
  }
}

bouton.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameValue = document.querySelector("#username").value;
  const linkValue = document.querySelector("#link").value;
  const radioValue =
    document.querySelector('input[name="skin"]:checked')?.value ?? "noskin";
  if (usernameValue === null || linkValue === null || radioValue === "noskin")
    alert("Remplissez tous les champs");
  else {
    console.log(usernameValue, linkValue, radioValue);
    localStorage.setItem("username", usernameValue);
    localStorage.setItem("link", linkValue);
    localStorage.setItem("skin", radioValue);

    window.location.replace("Game.html");
  }
});

for (let i = 1; i < 30; i++) {
  const div = document.createElement("div");
  div.id = `dskin${i}`;

  const input = document.createElement("input");
  input.type = "radio";
  input.id = `iskin${i}`;
  input.value = `assets/${i}.png`;
  input.name = "skin";
  input.className = "iskin";

  const label = document.createElement("label");
  label.htmlFor = `iskin${i}`;
  label.id = `lskin${i}`;

  div.appendChild(input);
  div.appendChild(label);

  document.getElementById("userskin").appendChild(div);

  const newImg = document.createElement("canvas");
  newImg.setAttribute("id", `skin${i}`);
  newImg.className = "peau";
  document.getElementById(`lskin${i}`).appendChild(newImg);
  const canvas = document.querySelector(`#skin${i}`);
  const context = canvas.getContext("2d");
  let img = new Image();

  img.onload = function () {
    var cropX = 0;
    var cropY = 64 * 10;
    var cropWidth = 64;
    var cropHeight = 64;

    canvas.style.width = cropWidth;
    canvas.style.height = cropHeight;

    context.drawImage(
      img,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  };
  img.src = `assets/${i}.png`;
  canvas.imageSource = img;
}

new MenuController();
