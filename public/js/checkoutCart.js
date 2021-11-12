console.log("Chcekout Cart Working!");

function buyCart() {
  alert("Comprar el carrito!");
  fetch("/api/cart/create", {
      method: 'POST'
  });
}
