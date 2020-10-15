const btnForm = document.querySelector(".btn-form");
const boxForm = document.querySelector(".box-form");
const btnClose = document.querySelector(".btn-close");
const boxMessage = document.querySelector(".box-message");

btnForm.addEventListener("click", function () {
  boxForm.style.display = "block";
});

btnClose.addEventListener("click", function () {
  boxMessage.style.display = "none";
});