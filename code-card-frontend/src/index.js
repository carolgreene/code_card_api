// for html server in chrome:    python -m SimpleHTTPServer

let counter = 0
let decks
let main = document.querySelector('main')


document.addEventListener("DOMContentLoaded", function() {
  //fetchCards()
  fetchDecks()
  welcome()
  //fetchUsers()
})


function welcome() {
  let div = document.createElement('div')
  let h1 = document.createElement('h1')
  let pickDeckBtn = document.createElement('button')
  let addDeckBtn = document.createElement('button')

  h1.innerText = 'Welcome to Code Card!'
  pickDeckBtn.setAttribute('type','button')
  pickDeckBtn.innerText = 'Pick a Deck'
  addDeckBtn.setAttribute('type', 'button')
  addDeckBtn.innerText = 'Add New Deck'
  
  main.append(div, h1, pickDeckBtn, addDeckBtn)

  pickDeckBtn.addEventListener('click', function(e) {
    e.preventDefault()
    renderDeck()
  })

  addDeckBtn.addEventListener('click', function(e) {
    e.preventDefault()
    addNewDeck()
  })
}


//next step is to send this to proper function when submitDeck is clicked
function addNewDeck() {  
  main.innerHTML = ''
  document.getElementById("addDeckForm").style.display = "block"
  let submitDeck = document.getElementById('submitDeck')

  submitDeck.addEventListener('click', function(e) {
    e.preventDefault()
    postDeck()
  })
}

//using default user_id of 1 until I get users up & running. Also need to change welcome to pass to 
//fetchDecks & pull fetchDecks out of initial start
function postDeck() {
  let name = document.getElementById('name').value

  const data = {name: name, user_id: 1}
  console.log(data)

  return fetch('http://10.0.0.99:3000/api/v1/decks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {    
      console.log('Success:', data);
      renderDeck()
    })
    .catch((error) => {
      console.error('Error:', error)
    })  
  
}
  

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
  main.innerHTML = ''
  fetch(`http://10.0.0.99:3000/api/v1/decks`)
  .then((res) => res.json())
  .then(results => {  
    decks = results        
  })
}

function postCard(deck) {  
  let question = document.getElementById('question').value 
  let answer = document.getElementById('answer').value  
  let id = deck.id  
  
  const data = { front: question, back: answer, deck_id: id}  

  return fetch('http://10.0.0.99:3000/api/v1/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    renderCard(data, deck)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
}

function renderCard(data, deck) {  
  main.innerHTML = ''
  document.getElementById("addCardForm").reset()
  document.getElementById("addCardForm").style.display = 'none'
  
  let card = data
  let div = document.createElement('div')
  let cardFront = document.createElement('h3')
  let cardBack = document.createElement('h3')
  let addAnotherCardBtn = document.createElement('button')
  let allDecksBtn = document.createElement('button')

  div.setAttribute('class', 'card')
  div.setAttribute('data-id', `${card.data.id}`)
  addAnotherCardBtn.setAttribute('data-card-id', `${card.data.id}`) 
  addAnotherCardBtn.setAttribute('data-deck-id', `${card.data.attributes.deck_id}`)  
  allDecksBtn.setAttribute('data-card-id', `${card.data.id}`) 
  allDecksBtn.setAttribute('data-deck-id', `${card.data.attributes.deck_id}`)      
   
  cardFront.innerText = `Question: ${card.data.attributes.front}`
  cardBack.innerText = `Answer: ${card.data.attributes.back}`
  addAnotherCardBtn.innerText = 'Add Another Card'
  allDecksBtn.innerText = 'See all decks'
  
  div.appendChild(cardFront)
  div.appendChild(cardBack)
  div.appendChild(addAnotherCardBtn)
  div.appendChild(allDecksBtn)
  main.appendChild(div)  

  addAnotherCardBtn.addEventListener('click', function(e) {
    e.preventDefault()
    addCard(deck)
  })

  allDecksBtn.addEventListener('click', function(e) {
    e.preventDefault()
    renderDeck()
  })

}

function renderDeck() {  
  main.innerHTML = ''   
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
      e.preventDefault()     
      chooseDeck(deck)
    })
  })

}

function chooseDeck(deck) {
  main.innerHTML = ''
  
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let addCardBtn = document.createElement('button')
  let quizBtn = document.createElement('button')
  
  h2.innerText = deck.name  
  addCardBtn.innerText = 'Add Card'  
  quizBtn.innerText = 'Quiz Yourself'

  main.append(div, h2, addCardBtn, quizBtn)

  addCardBtn.addEventListener('click', function(e) {
    addCard(deck)
  })

  quizBtn.addEventListener('click', function(e) {
   quizYourself(deck)
  })
}

function addCard(deck) {
  main.innerHTML = ''
  document.getElementById("addCardForm").style.display = "block"  
  let submitCard = document.getElementById('submitCard')

  submitCard.addEventListener("click", function(e) {
    e.preventDefault()
    postCard(deck)
  })
}

function quizYourself(deck) {  
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
    e.preventDefault()
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
    e.preventDefault()
    nextQuestion(deck)        
  })

  function nextQuestion(deck) {   
    if(counter < deck.cards.length - 1) {
      counter++
      quizYourself(deck)
    } else {             
      counter = 0   
      main.innerHTML = ''  
      finishedDeck()      
    }      
  }

  function finishedDeck() {        
    let div = document.createElement('div')
    let p = document.createElement('p')
    let btn1 = document.createElement('button')
    let btn2 = document.createElement('button')

    div.setAttribute('id', 'goAgain')
    btn1.setAttribute('id', 'yesBtn')
    btn2.setAttribute('id', 'noBtn')
    p.innerText = 'Congratulations, you finished the deck! Do you want to try another deck?'
    btn1.innerText = 'Yes'
    btn2.innerText = 'No'
    
    main.append(div, p, btn1, btn2) 

    btn1.addEventListener('click', function(e) {
      e.preventDefault()
      main.innerHTML = ''
      renderDeck(decks)    
    }) 

    btn2.addEventListener('click', function(e) {
      e.preventDefault()
      quit()
    })
  }

  function quit() {
    main.innerHTML = ''
    let div = document.createElement('div')
    let h2 = document.createElement('h2')

    h2.innerText = 'Great job, come back soon!'

    main.append(div, h2)    
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

