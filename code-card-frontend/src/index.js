// for html server in chrome:    python -m SimpleHTTPServer


//****NEED TO EDIT & DELETE DECKS & CARDS */

//MADE userId A GLOBAL VARIABLE. NOT SURE IF THAT IS GOOD PRACTICE
let counter = 0
let decks
let userId = null
let main = document.querySelector('main')
let home = document.getElementById('homeLink')

//SET UP LINKS TO BE ON OR OFF DEPENDING ON WHETHER OR NOT LOGGED IN     *****DONE*****
let logInLink = document.getElementById("logInLink")
let signUpLink = document.getElementById('signUpLink')
let decksLink = document.getElementById('decksLink')  //NEED TO MAKE THIS GO TO USER'S DECKS NOT ALL DECKS ****DONE****
let addDeckLink = document.getElementById('addDeckLink')
let quitLink = document.getElementById('quitLink')



home.addEventListener("click", function(e) {
  e.preventDefault()    
  welcome()
})

logInLink.addEventListener("click", function(e) {
  e.preventDefault() 
  logIn()
})

signUpLink.addEventListener("click", function(e) {
  e.preventDefault()
  signUp()
})

decksLink.addEventListener('click', function(e) {
  e.preventDefault()
  fetchUserDecks()
})

addDeckLink.addEventListener('click', function(e) {
  e.preventDefault()
  addNewDeck()
})

quitLink.addEventListener('click', function(e) {
  e.preventDefault()   
  quit()
})


document.addEventListener("DOMContentLoaded", function() {
  //fetchCards()
  //fetchDecks()
  welcome()  
  //fetchUsers()
})

function clearMain() {
  main.innerHTML = ''
}

function resetForms() {    
  document.getElementById("logInForm").reset()
  document.getElementById("logInForm").style.display = 'none'
  document.getElementById("signUpForm").reset()
  document.getElementById("signUpForm").style.display = 'none'
  document.getElementById("addDeckForm").reset()
  document.getElementById("addDeckForm").style.display = 'none' 
  document.getElementById("addCardForm").reset()
  document.getElementById("addCardForm").style.display = 'none'
  setNavBar()
}

// NEED TO FIGURE OUT HOW TO CK FOR VALUE IN EITHER USERID OR LOCALSTORAGE.JWT_TOKEN     ***DONE***

//LOOK INTO WHETHER THIS WOULD BE BETTER DOING W/IN CSS FILE
function setNavBar() {
  if(userId !== null) {
    logInLink.style.display = 'none' 
    signUpLink.style.display = 'none'
    decksLink.style.display = 'block'  
    addDeckLink.style.display = 'block'
    quitLink.style.display = 'block'
  } else { 
    decksLink.style.display = 'none'  
    addDeckLink.style.display = 'none'
    quitLink.style.display = 'block'
    logInLink.style.display = 'block' 
    signUpLink.style.display = 'block'
  }
}


function welcome() {
  clearMain()
  resetForms()
  let div = document.createElement('div')
  let h1 = document.createElement('h1')
  let signUpBtn = document.createElement('button')
  let logInBtn = document.createElement('button')

  h1.innerText = 'Welcome to Code Card!'
  signUpBtn.setAttribute('type','button')
  signUpBtn.innerText = 'Sign Up'
  logInBtn.setAttribute('type', 'button')
  logInBtn.innerText = 'Log In'
  
  main.append(div, h1, signUpBtn, logInBtn)

  console.log('in welcome-userId', userId)

  signUpBtn.addEventListener('click', function(e) {
    e.preventDefault()
    signUp()
  })

  logInBtn.addEventListener('click', function(e) {
    e.preventDefault()
    logIn()
  })
}

function logIn() {
  clearMain()
  resetForms()
  document.getElementById("logInForm").style.display = "block"
  let submitLogIn = document.getElementById('submitLogIn')

  submitLogIn.addEventListener('click', function(e) {
    e.preventDefault()
    postLogIn()
  })
}

function postLogIn() {
  let userName = document.getElementById('userName').value
  let password = document.getElementById('password').value

  const data = {user: {name: userName, password: password}}
  console.log('data', data)

  return fetch('http://10.0.0.99:3000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success', data)
    localStorage.setItem('jwt_token', data.jwt)
    console.log('jwt_token', localStorage.jwt_token)    
    renderUserProfile(data)
  })
}

function renderUserProfile(data) {
  userId = data.user.data.id
  clearMain()
  resetForms()

  let div = document.createElement('div')
  let h3 = document.createElement('h3')
  let seeDecksBtn = document.createElement('button')
  let addDeckBtn = document.createElement('button')
  let name = data.user.data.attributes.name    
 
  h3.innerText = `Hi, ${name}! Pick a deck or add a new one.`
  seeDecksBtn.setAttribute('type', 'button')
  seeDecksBtn.innerText ='Pick a Deck'
  addDeckBtn.setAttribute('type', 'button')
  addDeckBtn.innerText ='Add New Deck'

  main.append(div, h3, seeDecksBtn, addDeckBtn)  

  seeDecksBtn.addEventListener('click', function(e) {
    e.preventDefault()
    fetchUserDecks()
  })

  addDeckBtn.addEventListener('click', function(e) {
    e.preventDefault()
    addNewDeck()
  })

console.log('in render User', data.user.data.attributes.name)
console.log('in render User- userId', userId)
}


function signUp() {
  clearMain()
  resetForms()
  document.getElementById("signUpForm").style.display = "block"
  let submitSignUp = document.getElementById("submitSignUp")

  submitSignUp.addEventListener('click', function(e) {
    e.preventDefault()
    postSignUp() 
  })
}

function postSignUp() {
  let userName = document.getElementById('newUserName').value
  let password = document.getElementById('newUserPassword').value
  
  const data = {user: {name: userName, password: password}}
  //console.log(data)

  return fetch('http://10.0.0.99:3000/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success', data)
    localStorage.setItem('jwt_token', data.jwt)
    renderUserProfile(data)
  })
}


function addNewDeck() {  
  clearMain()
  resetForms()
  document.getElementById("addDeckForm").style.display = "block"
  let submitDeck = document.getElementById('submitDeck')

  submitDeck.addEventListener('click', function(e) {
    e.preventDefault()
    postDeck()
  })
}
 
function postDeck() {  
  let name = document.getElementById('name').value

  const data = {name: name, user_id: userId}
  console.log(data)

  return fetch('http://10.0.0.99:3000/api/v1/decks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {    
      console.log('Success:', data);
      fetchUserDecks(userId)
    })
    .catch((error) => {
      alert('Error:', error)
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
  //clearMain()
  fetch(`http://10.0.0.99:3000/api/v1/decks`)
  .then((res) => res.json())
  .then(results => {  
    decks = results  
    renderDeck()      
  })
}

function fetchUserDecks() {
  console.log('id', userId)
  fetch(`http://10.0.0.99:3000/api/v1/users/${userId}`)
  .then((res) => res.json())
  .then(results => {
    decks = results.decks    
    console.log('results', decks)
    renderDeck()
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
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
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
  clearMain()
  resetForms()
    
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
    fetchUserDecks(userId)
  })
}

function renderDeck() {  
  clearMain()  
  resetForms()      
  decks.forEach(deck => {   
    
    let div = document.createElement('div')
    let p = document.createElement('p')
    let pickDeckBtn = document.createElement('button')
    let deckUl = document.createElement('ul')

    div.setAttribute('class', 'card')
    div.setAttribute('data-id', `${deck.id}`)
    pickDeckBtn.setAttribute('data-deck-id', `${deck.id}`)    
    deckUl.setAttribute('data-deck-ul', `${deck.id}`)

    p.innerText = `${deck.name}`
    pickDeckBtn.innerText = "Pick this deck"

    div.appendChild(p)
    div.appendChild(pickDeckBtn)
    div.appendChild(deckUl)
    main.appendChild(div)  

    pickDeckBtn.addEventListener("click", function(e) { 
      e.preventDefault() 
      fetchDeck(deck.id)    
      //chooseDeck(deck)
    })
  })

}



function fetchDeck(deckId) { 
  //clearMain()
  fetch(`http://10.0.0.99:3000/api/v1/decks/${deckId}`, { 
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
  }
})
  .then((res) => res.json())
  .then(results => {  
    deck = results  
    chooseDeck(deck)      
  })
}


function chooseDeck(deck) {
  clearMain()
  
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let addCardBtn = document.createElement('button')
  let quizBtn = document.createElement('button')
  let editBtn = document.createElement('button')
  let deleteBtn = document.createElement('button')
  
  h2.innerText = deck.name  
  addCardBtn.innerText = 'Add Card'  
  quizBtn.innerText = 'Quiz Yourself'
  editBtn.innerText = 'Edit Deck'
  deleteBtn.innerText = 'Delete Deck'

  main.append(div, h2, addCardBtn, quizBtn, editBtn, deleteBtn)

  addCardBtn.addEventListener('click', function(e) {  //WHERE'S MY E.PREVENTDEFAULT???
    addCard(deck)
  })

  quizBtn.addEventListener('click', function(e) {   //NO E.PREVENTDEFAULT HERE EITHER???
    //alert('clicked')
   quizYourself(deck)
  })

  editBtn.addEventListener('click', function(e) {   //SAME AS ABOVE
    editDeck(deck)
  })

  deleteBtn.addEventListener('click', function(e) {  //SAME AS ABOVE
    alert('also clicked')
  })
}

//need to have event listener for edit button. I may need to use a different button
function editDeck(deck) {
  console.log(deck)
  clearMain()
  let heading = document.createElement('h4')
  heading.innerText = `Edit ${deck.name} Deck`
  let form = document.getElementById("addDeckForm")
  form.style.display = "block"
  
  form.name.value = deck.name
  form.submitDeck.innerText = 'Submit Edit'
  form.prepend(heading)

  form.submitDeck.addEventListener('click', function(e) {
    e.preventDefault()
    patchDeck(deck)
  })
}

function patchDeck(deck) {
  console.log('in patchDeck', deck)
  let deckId = deck.id
  let name = document.getElementById('name').value

  const data = {name: name, user_id: userId}
  console.log(data)

  return fetch(`http://10.0.0.99:3000/api/v1/decks/${deckId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {    
      console.log('Success:', data);
      fetchUserDecks(userId)
    })
    .catch((error) => {
      alert('Error:', error)
    })  
  
  


}


//REMOVED USER/CARD RELATIONSHIP SO THIS WILL WORK
function addCard(deck) {
  console.log('in addCard-deck', deck)
  clearMain()
  document.getElementById("addCardForm").style.display = "block"   
  let submitCard = document.getElementById('submitCard')

  submitCard.addEventListener("click", function(e) {
    e.preventDefault()
    postCard(deck)
  })
}

//NEED TO ADD A CK WITH AN ERROR MSG IF THERE ARE  NO CARDS IN THE DECK
function quizYourself(deck) {  
  console.log('deck in quiz', deck)
  let card = deck.cards[counter]    
  clearMain()
 
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

}  

  function nextQuestion(deck) {   
    if(counter < deck.cards.length - 1) {
      counter++
      quizYourself(deck)
    } else {             
      counter = 0   
      clearMain() 
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
      clearMain()
      renderDeck(decks)    
    }) 

    btn2.addEventListener('click', function(e) {
      e.preventDefault()
      quit()
    })
  } 
  
  function quit() {
    userId = null
    clearMain()
    resetForms()
    
    let div = document.createElement('div')
    let h2 = document.createElement('h2')

    h2.innerText = 'Great job, come back soon!'
    main.append(div, h2)
    localStorage.clear()
    console.log('token', localStorage.jwt_token)
    console.log('userId', userId)    
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

