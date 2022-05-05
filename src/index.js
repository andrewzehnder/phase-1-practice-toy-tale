//Add New Toy

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Fetch Andy's Toys

let addCard = document.querySelector('#toy-collection')

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toyCards => 
    toyCards.forEach(toy => createToyCard(toy))
    )
}


document.addEventListener('DOMContentLoaded', function() {
  fetchToys();
});

function createToyCard(toy) {
  const card = document.createElement('div');
  card.className = 'card';

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.className = 'toy-avatar';

  const p = document.createElement('p');
  p.textContent = `likes: ${toy.likes}`;

  const button = document.createElement('button');
  button.className = 'like-btn';
  button.id = toy.id;
  button.innerText = 'Like ❤️'

  button.addEventListener('click', likeToy)

  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button);

  addCard.appendChild(card);
}

//Add a New Toy

document.querySelector('form').addEventListener('submit', (e) => {

const formData = {
  name: e.target[0].value,
  image: e.target[1].value,
  likes: 0
}

const addNewToyPost = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
  body: JSON.stringify(formData) 
}

fetch('http://localhost:3000/toys', addNewToyPost)
.then(response => response.json())
.then(createToyCard)
})

//Increase a Toy's Likes

function likeToy(e){
  const oldLikes = +e.target.previousSibling.innerText.split(" ")[1]
  console.log(oldLikes)

  const newLikes = {
    likes: oldLikes + 1
  }

  const reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify(newLikes)
  }

  fetch(`http://localhost:3000/toys/${e.target.id}`, reqObj)
    .then(r => r.json())
    .then(({ likes, id }) => document.getElementById(id).previousSibling.innerText = `likes: ${likes}`)
}
