console.log("Session Cart working!");

function addQuantity(elementToAdd) {
  console.log(elementToAdd);
}

function restQuantity(elementToAdd) {
  alert("hola!");
}

const addButtonNodeList = document.querySelectorAll(".btn-add");
const addButton = Array.apply(null, addButtonNodeList);
addButton.forEach((element) => {
  element.addEventListener("click", addQuantity);
});

const restButtonNodeLis = document.querySelectorAll(".btn-rest");
const restButton = Array.apply(null, restButtonNodeLis);
restButton.forEach((element) => {
  element.addEventListener("click", restQuantity);
});

const quantityProductNodeList = document.querySelectorAll(".quantity-product");
const quantityProduct = Array.apply(null, quantityProductNodeList);

// console.log(addButton);
// console.log(restButton);
