// for html server in chrome:    python -m SimpleHTTPServer

//BACK BUTTONS NEED TO BE SET UP FOR EDIT CARDS & EDIT DECKS*****************


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
  let btn1 = document.createElement('button')  
  let btn2 = document.createElement('button')  
  
  h1.innerText = 'Welcome to Code Card!'
  
  div.setAttribute('class', 'btn-group-vertical')  
  btn1.setAttribute('type','button')             
  btn1.setAttribute('class', 'btn btn-success')  
  btn2.setAttribute('type','button')             
  btn2.setAttribute('class', 'btn btn-primary')    

  div.appendChild(btn1)  
  div.appendChild(btn2)  
  main.append(div)       

  main.appendChild(h1)  
  
  if(userId === null) {
    btn1.innerText = 'Sign Up'
    btn2.innerText = 'Log In'

    btn1.addEventListener('click', function(e) {
      e.preventDefault()
      signUp()
    })

    btn2.addEventListener('click', function(e) {
      e.preventDefault()
      logIn()
    })
  } else {
    btn1.innerText = 'Pick a Deck'
    btn2.innerText = 'Add New Deck'

    btn1.addEventListener('click', function(e) {
      e.preventDefault()
      fetchUserDecks(userId)
    })

    btn2.addEventListener('click', function(e) {
      e.preventDefault()
      addNewDeck()
    })    
  }
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
    if(data.error) {
      alert(error)
    } else {
    localStorage.setItem('jwt_token', data.jwt)
    console.log('jwt_token', localStorage.jwt_token)    
    renderUserProfile(data)
    }
  })
  .catch((error) => {
    console.log(error)
    //alert(error.response)  CAN'T GET THIS TO DISPLAY THE ERROR so I hardcoded it below
    alert("Invalid name or password. Please try again.")
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
  
  div.setAttribute('class', 'btn-group-vertical')
 
  h3.innerText = `Hi, ${name}! Pick a deck or add a new one.`
  seeDecksBtn.setAttribute('type', 'button')
  seeDecksBtn.setAttribute('class','btn btn-primary' )
  seeDecksBtn.innerText ='Pick a Deck'
  addDeckBtn.setAttribute('type', 'button')
  addDeckBtn.setAttribute('class','btn btn-success' )
  addDeckBtn.innerText ='Add New Deck'

  div.appendChild(seeDecksBtn)
  div.appendChild(addDeckBtn)
  main.append(div)  

  main.appendChild(h3)

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
    if(data.error) {        
      alert(data.error)  
      document.getElementById("signUpForm").reset()      
    } else {      
    localStorage.setItem('jwt_token', data.jwt)
    renderUserProfile(data)
    }
  })
  .catch((error) => {
    console.error('Error:', error)
  })
}


function addNewDeck() {  
  clearMain()
  resetForms()
  let div = document.createElement('div')
  let backHomeBtn = document.createElement('button')

  let form = document.getElementById("addDeckForm")
  form.style.display = "block"
  let heading = form.querySelector('h4')
  heading.innerText = "Add New Deck"
  //let backBtn = form.querySelector("#backBtn")   //removed btn from form html
  //backBtn.style.display = "none"

  let submitDeck = document.getElementById('submitDeck')
  submitDeck.innerText = 'Submit Deck'

  div.setAttribute('class', 'btn-group-vertical')    //added this section
  backHomeBtn.setAttribute('type','button')             
  backHomeBtn.setAttribute('class', 'btn btn-success')  
  backHomeBtn.innerText = 'Back to Home'

  div.appendChild(backHomeBtn)  //added
  main.append(div)           //added

  submitDeck.addEventListener('click', function(e) {
    e.preventDefault()
    postDeck()
  })

  backHomeBtn.addEventListener('click', function(e) {
    e.preventDefault()
    welcome()
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
    if(data.error) {        
      alert(data.error)  
      document.getElementById("addDeckForm").reset()      
    } else {        
      fetchUserDecks(userId)
    }      
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
  .catch((error) => {
    alert('Error:', error)
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
    if(data.error) {
      alert(data.error)
    } else {
    renderCard(data, deck)
    }
  })
  .catch((error) => {
    alert('Error:', error)
  })
}

function renderCard(data, deck) {  
  clearMain()
  resetForms()
    
  let card = data
  let div = document.createElement('div')
  let cardFront = document.createElement('h6')
  let cardBack = document.createElement('h6')
  let addAnotherCardBtn = document.createElement('button')
  let allDecksBtn = document.createElement('button')

  div.setAttribute('class', 'card scrollable')
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
  .catch((error) => {
    alert('Error:', error)
  })
}

//This is not showing the buttons right. not giving the margins & overlaying heading.///****** */
function chooseDeck(deck) {
  clearMain()
  resetForms()
  
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let seeCardsBtn = document.createElement('button')  
  let addCardBtn = document.createElement('button')
  let quizBtn = document.createElement('button')
  let editBtn = document.createElement('button')
  let deleteBtn = document.createElement('button')
  
  h2.innerText = deck.name 

  div.setAttribute('class', 'btn-group-vertical big')
  
  seeCardsBtn.setAttribute('type','button')
  seeCardsBtn.setAttribute('class','btn btn-primary')
  seeCardsBtn.innerText = 'See Cards'   //added  SEE CARDS
  addCardBtn.setAttribute('type','button')
  addCardBtn.setAttribute('class','btn btn-success' )
  addCardBtn.innerText = 'Add Card' 
  quizBtn.setAttribute('type','button')
  quizBtn.setAttribute('class','btn btn-primary' )
  quizBtn.innerText = 'Quiz Yourself'
  editBtn.setAttribute('type','button')
  editBtn.setAttribute('class','btn btn-success' )
  editBtn.innerText = 'Edit Deck Name'
  deleteBtn.setAttribute('type', 'button')
  deleteBtn.setAttribute('class','btn btn-primary' )
  deleteBtn.innerText = 'Delete Deck'

  div.appendChild(seeCardsBtn)
  div.appendChild(addCardBtn)
  div.appendChild(quizBtn)
  div.appendChild(editBtn)
  div.appendChild(deleteBtn)

  main.append(div)   //added seeCardBtn-  SEE CARDS

  main.appendChild(h2)

  seeCardsBtn.addEventListener('click', function(e) {    
    seeCards(deck)
  })

  addCardBtn.addEventListener('click', function(e) {  
    addCard(deck)
  })

  quizBtn.addEventListener('click', function(e) {   
    quizYourself(deck)
  })

  editBtn.addEventListener('click', function(e) {   
    editDeckName(deck)
  })

  deleteBtn.addEventListener('click', function(e) {  
    deleteDeck(deck)
  })  
}

function setCardsLayout() {
  let div = document.createElement('div')
  let backBtn = document.createElement('button')
  let h3 = document.createElement('h3')  
  
  div.setAttribute('class', 'btn-group-vertical') 
  h3.innerText = deck.name
  backBtn.setAttribute('type','button')           
  backBtn.setAttribute('class', 'btn btn-success')
  backBtn.innerText = 'Back to Deck'  

  div.appendChild(h3)
  div.appendChild(backBtn)
  main.appendChild(div)

  backBtn.addEventListener('click', function(e) {
    chooseDeck(deck)
  })
}

//NEED TO ADD A CK WITH MSG IF DECK HAS NO CARDS*************
function seeCards(deck) {  //can make a separate function setting up divs for this & cards after delete. They're the same.***DONE***
  clearMain()
  resetForms()
  setCardsLayout()  
  
  deck.cards.forEach(card => {  
    let cardFt = card.front
    let cardBk = card.back 
  displayCard(card, cardFt, cardBk)
  })
}


//ADD BUTTON HERE OR IN SEE CARDS TO GO BACK TO CHOOSE DECK  ****DONE****
function displayCard(card, cardFt, cardBk) {  
  console.log('display card', card, 'cardFt', cardFt, 'cardBk',cardBk, )  
    let div = document.createElement('div')
    let cardFront = document.createElement('h5')   //changed from h4 
    let cardBack = document.createElement('h5')    //changed from h4
    let editCardBtn = document.createElement('button')
    let deleteCardBtn = document.createElement('button')
    
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', `${card.id}`)
    editCardBtn.setAttribute('data-card-id', `${card.id}`)  
    deleteCardBtn.setAttribute('data-card-id', `${card.id}`)      

    cardFront.innerText = `Question: ${cardFt}` 
    cardBack.innerText = `Answer: ${cardBk}` 
    editCardBtn.innerText = "Edit Card"
    deleteCardBtn.innerText = "Delete Card"

    div.appendChild(cardFront)
    div.appendChild(cardBack)
    div.appendChild(editCardBtn)
    div.appendChild(deleteCardBtn)
    main.appendChild(div)  
    
  editCardBtn.addEventListener('click', function(e) {
    editCard(card, deck)
  })

  deleteCardBtn.addEventListener('click', function(e) {
    deleteCard(card, deck) 
  })  
  /*backBtn.addEventListener('click', function(e) {   //don't need anymore. I put it in setCardsLayout***
    chooseDeck(deck)
  })*/
}

//BACK BUTTONS NEED TO BE SET UP FOR EDIT CARDS & EDIT DECKS
//NEED TO BUILD THESE 2 FUNCTIONS TO EDIT & DELETE CARDS---****DONE***
function editCard(card, deck) {
  console.log('in edit card', card)
  clearMain() 
//Begin set up buttons- can make this a separate function to use
//with add card or edit card
  let div = document.createElement('div')
  let backToDeck = document.createElement('button')
  let backToCards = document.createElement('button')

  div.setAttribute('class', 'btn-group-vertical')  
  backToDeck.setAttribute('type','button')             
  backToDeck.setAttribute('class', 'btn btn-success')  
  backToDeck.innerText = 'Back to Deck'
  backToCards.setAttribute('type','button')             
  backToCards.setAttribute('class', 'btn btn-primary') 
  backToCards.innerText = 'Back to Cards'     

  div.appendChild(backToDeck)
  div.appendChild(backToCards)
  main.append(div)
  //end set up buttons

  let form = document.getElementById("addCardForm")
  form.style.display = "block"
  let heading = form.querySelector('h4')
  heading.innerText = 'Edit Card'  

  form.question.value = card.front
  form.answer.value = card.back
  form.submitCard.innerText = "Submit Edit"
  
  form.submitCard.addEventListener('click', function(e) {
    e.preventDefault()
    patchCard(card, deck)
  })

  backToDeck.addEventListener('click', function(e) {
    e.preventDefault()
    chooseDeck(deck)
  })

  backToCards.addEventListener('click', function(e) {
    e.preventDefault()
    seeCards(deck)
  })
}

function patchCard(card, deck) {
  console.log('in patchCard', card)
  let cardId = card.id
  let deck_id = card.deck_id
  let card_front = document.getElementById('question').value
  let card_back = document.getElementById('answer').value

  const data = {front: card_front, back: card_back, deck_id: deck_id}
  console.log('data', data)

  return fetch(`http://10.0.0.99:3000/api/v1/cards/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Authorization':  `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    if(data.error) {
      alert(error)
    } else {
    console.log('after fetch-data', data)
    renderCard(data, deck)
    }
  })
  .catch((error) => {
    alert('Error:', error)
  })
}

//NEED TO FIGURE OUT HOW TO MAKE THIS GO BACK TO THIS DECK'S CARDS & HAVE IT EXCLUDE THE DELETED CARD--***FIXED***
function deleteCard(card,deck) {
  console.log('in delete card', card)
  let cardId = card.id
  let deckId = deck.id
  
  return fetch(`http://10.0.0.99:3000/api/v1/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },

  })
  .then(response => response.json())
  .then(data => {
    if(data.error) {
      alert(error)
    } else {
    console.log('after fetch', data)
    //fetchDeck(deckId)

    let cards = data.data
    let deckName = deck.name
    
    cardsAfterDelete(cards, deckName)
    //cardsAfterDelete(data, deck)
    }    
  })
  .catch((error) => {
    alert('Error:', error)
  })    
}

//THIS DOES NOT WORK DOES NOT SEEM TO BE GETTING OUT OF THIS FUNCTION. TRY AGAIN TOMORROW.  ***yay, fixed!***
function cardsAfterDelete(cards, deckName) {  
  clearMain()
  resetForms()
  setCardsLayout()  
  
  cards.forEach(card => {
    let cardFt = card.attributes.front
    let cardBk = card.attributes.back
  displayCard(card, cardFt, cardBk)    
  })
}

//need to have event listener for edit button. I may need to use a different button
function editDeckName(deck) {
  console.log(deck)
  clearMain() 
  let div = document.createElement('div')   //added
  let backBtn2 = document.createElement('button')  //added
  
  let form = document.getElementById("addDeckForm")
  form.style.display = "block"

  let heading = form.querySelector('h4')
  heading.innerText = "Edit Deck Name"

  //let backBtn = form.querySelector("#backBtn") 
  //backBtn.style.display = "block"

  div.setAttribute('class', 'btn-group-vertical')    //added this section
  backBtn2.setAttribute('type','button')             
  backBtn2.setAttribute('class', 'btn btn-success')  
  backBtn2.innerText = 'Back to Deck'

  div.appendChild(backBtn2)  //added
  main.append(div)           //added

  //let priorHeading = form.querySelector('h4')  
  //if(priorHeading) {
  //  priorHeading.parentElement.removeChild(priorHeading)
  //}  
  
  form.name.value = deck.name
  form.submitDeck.innerText = 'Submit Edit'
  //form.prepend(heading)

  form.submitDeck.addEventListener('click', function(e) {
    e.preventDefault()
    patchDeck(deck)
  })

  //backBtn.addEventListener('click', function(e) {
    backBtn2.addEventListener('click', function(e) {  //added
    chooseDeck(deck)
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
    if(data.error) {
      alert(error)
    } else {
      console.log('Success:', data);
      fetchUserDecks(userId)
    }
  })
  .catch((error) => {
    alert('Error:', error)
  })    
}

//WORKS TO DELETE DECK BUT CARDS IN DECK STILL EXIST. NEED TO FIX IT---****FIXED****
function deleteDeck(deck) {
  console.log('in delete', deck)
  let deckId = deck.id

  return fetch(`http://10.0.0.99:3000/api/v1/decks/${deckId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
    
  })
  .then(response => response.json())
  .then(data => {  
    if(data.error) {
     alert(error) 
    } else {  
      console.log('Success:', data);
      fetchUserDecks(userId)
    }  
    })
  .catch((error) => {
    alert('Error:', error)
  })      
}

//NEED TO FINISH THIS TO GET FORM IN THE MIDDLE & BUTTONS ON THE SIDE
//REMOVED USER/CARD RELATIONSHIP SO THIS WILL WORK
function addCard(deck) {
  console.log('in addCard-deck', deck)
  clearMain()  
  let div = document.createElement('div')
  let backToDeck = document.createElement('button')
  let backToCards = document.createElement('button')

  div.setAttribute('class', 'btn-group-vertical')  
  backToDeck.setAttribute('type','button')             
  backToDeck.setAttribute('class', 'btn btn-success')  
  backToDeck.innerText = 'Back to Deck'
  backToCards.setAttribute('type','button')             
  backToCards.setAttribute('class', 'btn btn-primary') 
  backToCards.innerText = 'Back to Cards'     

  div.appendChild(backToDeck)
  div.appendChild(backToCards)
  main.append(div)
  

  let form = document.getElementById("addCardForm")
  form.style.display = "block"
  let heading = form.querySelector('h4')  
  heading.innerText = "Add Card"   
  
  //div.appendChild(form)
  
  //main.appendChild(form)   

  let submitCard = document.getElementById('submitCard')
  submitCard.innerText = "Submit Card"

  submitCard.addEventListener("click", function(e) {
    e.preventDefault()
    postCard(deck)
  })  

  backToDeck.addEventListener('click', function(e) {
    e.preventDefault()
    chooseDeck(deck)
  })

  backToCards.addEventListener('click', function(e) {
    seeCards(deck)
  })
}

//OZZIE'S TEST DECK & OZZIE'S BEST TEST DECK DO NOT WORK FOR QUIZ YOURSELF. GET ERROR MSG. NEED TO FIX
//NEED TO ADD A CK WITH AN ERROR MSG IF THERE ARE  NO CARDS IN THE DECK******  DONE***
function quizYourself(deck) {  
  console.log('deck in quiz', deck)
  let card = deck.cards[counter]    
  clearMain()

  let div = document.createElement('div')  //added
  let backToDeck = document.createElement('button')  //added
  let h3 = document.createElement('h3')
  
  //added below
  div.setAttribute('class', 'btn-group-vertical') 
  h3.innerText = `${deck.name}`
  backToDeck.setAttribute('type', 'button')
  backToDeck.setAttribute('class','btn btn-success' )
  backToDeck.innerText ='Back to Deck'
  
  div.appendChild(h3)
  div.appendChild(backToDeck)
  main.append(div)    
  //end of added

  let div1 = document.createElement('div')
  let p1 = document.createElement('p')

  if(deck.cards.length < 1) {
    p1.innerText = `This deck doesn't have any cards yet, go back to deck.`
    div1.appendChild(p1)
    main.appendChild(div1)
  } else {  
    let ckAnsBtn = document.createElement('button')

    div1.setAttribute('class', 'card scrollable')
    div1.setAttribute('id', 'qDiv')
    p1.setAttribute('id', 'p')
    ckAnsBtn.setAttribute('id', 'btn')  
    ckAnsBtn.innerText = 'check answer'
    p1.innerText = card.front

    div1.appendChild(p1)
    div1.appendChild(ckAnsBtn)
    main.appendChild(div1)  

  //let backToDeck = document.createElement('button')   cmmt out original grouping
  //backToDeck.innerText = "Back to Deck"
  //main.appendChild(backToDeck)
  
    ckAnsBtn.addEventListener('click', function(e) {
      e.preventDefault()
      checkAnswer(deck, card)
    }) 
  } 

  backToDeck.addEventListener('click', function(e) {
    e.preventDefault()
    chooseDeck(deck)
  })

}

function checkAnswer(deck, card) {
  let div = document.createElement('div')
  let p = document.createElement('p')
  let btn = document.createElement('button')

  div.setAttribute('class', 'card scrollable')
  div.setAttribute('id', 'ansDiv')
  p.innerText = card.back
  btn.innerText = 'next'

  div.appendChild(p)
  div.appendChild(btn)
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

    div.setAttribute('class', 'btn-group-vertical')
    div.setAttribute('id', 'goAgain')
    btn1.setAttribute('id', 'yesBtn')
    btn1.setAttribute('class', 'btn btn-success')
    btn2.setAttribute('id', 'noBtn')
    btn2.setAttribute('class', 'btn btn-primary')
    p.innerText = 'Congratulations, you finished the deck! Do you want to try another deck?'
    btn1.innerText = 'Yes'
    btn2.innerText = 'No'
    
    //main.append(div, p, btn1, btn2) ***trying to fix layout 

    //added
    div.appendChild(p)
    div.appendChild(btn1)
    div.appendChild(btn2)
    main.appendChild(div)

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

