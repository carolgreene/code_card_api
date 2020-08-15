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
  let btn = document.createElement('button')

  h1.innerText = 'Welcome to Code Card!'
  btn.setAttribute('type','button')
  btn.innerText = 'Pick a Deck'
  
  main.append(div, h1, btn)

  btn.addEventListener('click', function(e) {
    e.preventDefault()
    renderDeck()
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

//finish this function & then add to github. Not working yet
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
    renderCard(data)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
}

function renderCard(data) {
  console.log('in render card', data)
  let form = document.getElementById("addCardForm")
  form.style.display = 'none'
  console.log(form)

  let card = data
  let div = document.createElement('div')
  let cardFront = document.createElement('h3')
  let cardBack = document.createElement('h3')
  let thisDeckBtn = document.createElement('button')
  let allDecksBtn = document.createElement('button')

  div.setAttribute('class', 'card')
  div.setAttribute('data-id', `${card.data.id}`)
  thisDeckBtn.setAttribute('data-card-id', `${card.data.id}`) 
  thisDeckBtn.setAttribute('data-deck-id', `${card.data.attributes.deck_id}`)  
  allDecksBtn.setAttribute('data-card-id', `${card.data.id}`) 
  allDecksBtn.setAttribute('data-deck-id', `${card.data.attributes.deck_id}`)      
   
  cardFront.innerText = `Question: ${card.data.attributes.front}`
  cardBack.innerText = `Answer: ${card.data.attributes.back}`
  thisDeckBtn.innerText = 'See this deck'
  allDecksBtn.innerText = 'See all decks'
  
  div.appendChild(cardFront)
  div.appendChild(cardBack)
  div.appendChild(thisDeckBtn)
  div.appendChild(allDecksBtn)
  main.appendChild(div)  

}

function renderDeck() {  
  main.innerHTML = ''
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

