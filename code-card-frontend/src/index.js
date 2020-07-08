document.addEventListener("DOMContentLoaded", function() {
  fetchCards()
})

function fetchCards() {
  let cards = document.getElementById("cards")
  let li = document.createElement("li")
  fetch(`http://10.0.0.99:3000/api/v1/cards`)
  .then((res) => res.json())
  .then(results => {
    console.log(results)
  })



}