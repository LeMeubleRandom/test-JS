const bouton = document.querySelector("#userinfo");

bouton.addEventListener("submit", function (event) {
  event.preventDefault();
  const usernameValue = document.querySelector("#username").value;
  const linkValue = document.querySelector("#link").value;
  const radioValue =
    document.querySelector('input[name="skin"]:checked')?.value ?? "noskin";
  if (usernameValue === null || linkValue === null || radioValue === "noskin")
    alert("Remplissez tous les champs");
  else {
    const skinNumber = radioValue.replace(/\D/g, "");
    console.log(usernameValue, linkValue, skinNumber);
    localStorage.setItem("username", usernameValue);
    localStorage.setItem("link", linkValue);
    localStorage.setItem("skin", skinNumber);
  }
});

for (let i = 1; i < 30; i++) {
  const div = document.createElement("div");
  div.id = `dskin${i}`;

  const input = document.createElement("input");
  input.type = "radio";
  input.id = `iskin${i}`;
  input.value = `skin ${i}`;
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
      canvas.height
    );
  };
  img.src = `assets/${i}.png`;
  canvas.imageSource = img;
}

let test = document.querySelectorAll(".peau");

/*test.forEach((element) => {
  element.addEventListener("mouseenter", function () {
    let img = element.imageSource;
    const context = element.getContext("2d");
    element.style.background = "black";

    context.clearRect(0, 0, 64, 64);

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
      element.height
    );
  });

  element.addEventListener("mouseout", function () {
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
      element.height
    );
  });
});
*/
