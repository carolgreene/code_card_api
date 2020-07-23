document.addEventListener("DOMContentLoaded", function() {
  //fetchCards()
  fetchDecks()
  //fetchUsers()
})
/*
function fetchCards() {
  let cards = document.getElementById("cards")
  let li = document.createElement("li")
  fetch(`http://10.0.0.99:3000/api/v1/cards`)
  .then((res) => res.json())
  .then(results => {
    console.log(results)
  })
}
*/

function fetchDecks() {
  let decks = document.getElementById("deckUl")
  let li = document.createElement("li")
  fetch(`http://10.0.0.99:3000/api/v1/decks`)
  .then((res) => res.json())
  .then(results => {
    //console.log(results.data)
    results.forEach(deck => {
      //console.log(deck.attributes.name)
      renderDeck(deck)
    })
  })
}

function renderDeck(deck) {
  console.log(deck.cards)
  let main = document.querySelector('main') 
  let div = document.createElement('div')
  let p = document.createElement('p')
  let addBtn = document.createElement('button')
  let deckUl = document.createElement('ul')

  div.setAttribute('class', 'card')
  div.setAttribute('data-id', `${deck.id}`)
  addBtn.setAttribute('data-deck-id', `${deck.id}`)
  deckUl.setAttribute('data-deck-ul', `${deck.id}`)

  p.innerText = `${deck.name}`
  addBtn.innerText = "Pick this deck"

  div.appendChild(p)
  div.appendChild(addBtn)
  div.appendChild(deckUl)
  main.appendChild(div)

}

    function displayDecks(deck) {
      let ul = document.getElementById("deckUl")
      let li = document.createElement('li')
      li.innerText = deck.attributes.name
      ul.appendChild(li)

    }


    /*
    //need to work out how to get full list. only getting last one
    //follow this pattern
    var names = ['John', 'Jane'];
var ul = document.getElementById("friendsList");

for (var i = 0; i < names.length; i++) {
    var name = names[i];
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(name));
    ul.appendChild(li);
}

*/
  


  
  /*
  function fetchUsers() {
  let cards = document.getElementById("users")
  let li = document.createElement("li")
  fetch(`http://10.0.0.99:3000/api/v1/users`)
  .then((res) => res.json())
  .then(results => {
    console.log(results)
  }) 

}
*/

