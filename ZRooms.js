//ADICIONE SEUS LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyD9b4gnjX5Ne4JDCmG5_WoepdDEbP1Q3tM",
  authDomain: "byjus---app-twitter.firebaseapp.com",
  databaseURL: "https://byjus---app-twitter-default-rtdb.firebaseio.com",
  projectId: "byjus---app-twitter",
  storageBucket: "byjus---app-twitter.appspot.com",
  messagingSenderId: "905303743694",
  appId: "1:905303743694:web:1af3ca77ec7156c507049f"
};

firebase.initializeApp(firebaseConfig)

var username = localStorage.getItem("username")
document.getElementById("bemVindo").innerHTML = "Seja bem vindo(a) " + username

function adicionarSala(){

  var nomeSala = document.getElementById("adcSala").value

  firebase.database().ref("/Salas").child(nomeSala).update({
    proposito: "adicionar sala"
  })
  localStorage.setItem("Sala", nomeSala)
  window.location = "ZPage.html"
}

function getData(){
  firebase
    .database()
    .ref("/Salas")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        roomNames = childKey;
        row = `<div class="roomName" id="${roomNames}" onclick="redirecionarSala(this.id)"> ${roomNames} <div/> <hr>`;
        document.getElementById("output").innerHTML += row;
      });
    });
}

function redirecionarSala(nome){
  localStorage.setItem("Sala", nome)
  window.location = "ZPage.html"
}

function deslogar(){
  localStorage.removeItem("username")
  localStorage.removeItem("Sala")
  window.location = "index.html"
}

getData();
