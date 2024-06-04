const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  console.log("cliced");
  document.body.classList.toggle("dark");
});

// const toggleContainer = document.getElementById("toggle-container");
// const toggleButton = document.getElementById("toggle-button");
// const body = document.body;

// toggleContainer.addEventListener("click", () => {
//   body.classList.toggle("dark-mode");
//   toggleButton.classList.toggle("active");
// });
