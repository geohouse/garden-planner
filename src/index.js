const mainLabel = document.querySelector(".main-label");

mainLabel.addEventListener("click", () => {
  if (mainLabel.innerText === "Garden planner") {
    mainLabel.innerText = "Still being planted";
  } else if (mainLabel.innerText === "Still being planted") {
    mainLabel.innerText = "Garden planner";
  }
});
