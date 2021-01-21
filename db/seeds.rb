# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: 'Ozzie', password_digest: 'password')
Deck.create(name: 'JavaScript Facts', user_id: '1')
Card.create(front: 'who invented JavaScript', back: 'Brendan Eich', deck_id: '1')

User.create(name: 'Augie', password_digest: 'password')
User.create(name: 'Walter', password_digest: 'password')

Deck.create(name: 'Ruby Facts', user_id: '2')
Deck.create(name: 'Data Types', user_id: '3')

Card.create(front: 'What type of language is Ruby', back: 'Object Oriented', deck_id: '2')
Card.create(front: 'How do you measure code efficiency', back: 'Big-O Notation', deck_id: '3')


Card.create(front: 'name 3 ways to create variables', back: 'var, let, & const', deck_id: '1')
Card.create(front: 'What is the difference between Java & JavaScript', back: 'Java is an OO Programming language, JavaScript is an OO scripting language. Java needs to be compiled, JavaScript is in the form of text. Java can run in virtual machine or browser, JavaScript runs in the browser only', deck_id: '1')
Card.create(front: 'Name the JavaScript data types', back: 'undefined, null, boolean, string, symbol, number, object', deck_id: '1')
Card.create(front: 'what are the features of JavaScript', back: 'it is a lightweight, interpreted programming language. Designed for creating network-centric applications. Complementary to & integrated w/Java. Open and cross platform scripting language.', deck_id: '1')
Card.create(front: 'Is JavaScript a case-sensitive language', back: 'Yes, the language keywords, variables, and function names, and any other identifiers must always be typed with a consistent capitalization', deck_id: '1')
Card.create(front: 'How do you create an object', back: 'let emp = { name: "Daniel", age: 40}', deck_id: '1')
Card.create(front: 'How do you create an array', back: 'let x = []; or const y = [1,2,3,4]', deck_id: '1')


Card.create(front: 'What are the 2 types of Data types in JavaScript?', back: 'Primitive  & Complex')
Card.create(front: 'What are the 5 primitive data types?', back: 'String, number, boolean, null, undefined')
Card.create(front: 'How do Primitive Data Types get passed, compared, & assigned?', back: 'By value')
Card.create(front: 'What are the 3 complex data types?', back: 'Array, object, function')
Card.create(front: 'How do Complex Data Types get passed, compared, & assigned?', back: 'By reference')  
Card.create(front: "What will this return?  const a = 'John' const b = 'John' console.log(a === b)", back: 'true')
Card.create(front: "What will this return?  const a = { name:'John'} const b = { name:'John'} console.log(a === b)", back: 'false')
Card.create(front: "Why was the last question false?", back:"because JavaScript checks the objects by the address where they are stored in memory, so even though they contain the same information, they are different objects stored in different locations, so they are not equal")
Card.create(front: "can you compare 2 different objects, arrays, or functions?", back: "No, you'll always get false because they have different locations in memory")
Card.create(front: "how can you find out what the data type 'a' is?", back: 'console.log(typeof a)')
Card.create(front: 'what will console.log(typeof null) show?', back: 'object')
Card.create(front: 'what will console.log(typeof array) show?', back: 'object')