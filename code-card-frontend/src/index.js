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
    renderDeck()     
  })
}

function renderDeck() {  
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

function chooseDeck(deck) {  
  let card = deck.cards[counter]    
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
    checkAnswer(deck, card)
  })  
}

function checkAnswer(deck, card) {
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
    nextQuestion(deck)        
  })

  function nextQuestion(deck) {   
    if(counter < deck.cards.length - 1) {
      counter++
      chooseDeck(deck)
    } else {             
      counter = 0   
      main.innerHTML = ''  
      finishedDeck()
      //renderDeck(decks)
    }      
  }

  function finishedDeck() {        
    let div = document.createElement('div')
    let p = document.createElement('p')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')

    div.setAttribute('id', 'goAgain')
    p.innerText = 'Congratulations, you finished the deck? Do you want to try another deck?'
    btn1.innerText = 'Yes'
    btn2.innerText = 'No'

    btn1.appendChild(btn2)
    p.appendChild(btn1)
    div.appendChild(p)
    main.appendChild(div)  
  }

  
}   
  


  
  /*
  function fetchUsers() {
  let cards = document.getElementById("users")
  let li = document.createElement("li")
  fetch(`http://10.0.0.99:3000/api/v1/users`)
  .then((res) => res.json())
  .then(results => {
    console.log(results)
  }) 

*/

