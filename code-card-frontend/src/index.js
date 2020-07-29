let counter = 0
let decks
let main = document.querySelector('main')


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
  fetch(`http://10.0.0.99:3000/api/v1/decks`)
  .then((res) => res.json())
  .then(results => {  
    decks = results 
    renderDeck(decks)     
  })
}

function renderDeck(decks) {
  
  console.log('renderDecks decks:', decks)
  decks.forEach(deck => {   
    
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

  addBtn.addEventListener("click", function(e) { 
    chooseDeck(deck)
  })
  })

}

function displayDecks(deck) {
  let ul = document.getElementById("deckUl")
  let li = document.createElement('li')
  li.innerText = deck.attributes.name
  ul.appendChild(li)

}

function chooseDeck(deck) {  
  let card = deck.cards[counter]  
  
  //let main = document.querySelector('main')
  main.innerHTML = ''
  let div1 = document.createElement('div')
  let p1 = document.createElement('p')
  let ckAnsBtn = document.createElement('button')

  div1.setAttribute('class', 'cards')
  div1.setAttribute('id', 'qDiv')
  p1.setAttribute('id', 'p')
  ckAnsBtn.setAttribute('id', 'btn')
  ckAnsBtn.innerText = 'check answer'
  p1.innerText = card.front

  p1.appendChild(ckAnsBtn)
  div1.appendChild(p1)
  main.appendChild(div1)  
  
  ckAnsBtn.addEventListener('click', function(e) {
    checkAnswer(deck, card, main)
  })  
}

function checkAnswer(deck, card, main) {
  let div = document.createElement('div')
  let p = document.createElement('p')
  let btn = document.createElement('button')

  div.setAttribute('class', 'answer')
  div.setAttribute('id', 'ansDiv')
  p.innerText = card.back
  btn.innerText = 'next'

  p.appendChild(btn)
  div.appendChild(p)
  main.appendChild(div)  

  btn.addEventListener('click', function(e) {
    nextQuestion(deck, card, main)     
    
  })

  function nextQuestion(deck) {   
    if(counter < deck.cards.length - 1) {
      counter++
    } else {         
      counter = 0        
    }    
    chooseDeck(deck)
  }
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

