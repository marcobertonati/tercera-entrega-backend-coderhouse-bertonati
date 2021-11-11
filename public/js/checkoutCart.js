console.log("Chcekout Cart Working!");

function buyCart() {
  alert("Comprar el carrito!");
  fetch("http://localhost:8080/api/cart/create", {
      method: 'POST'
  });
}
