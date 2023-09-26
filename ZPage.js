const firebaseConfig = {
    apiKey: "AIzaSyD9b4gnjX5Ne4JDCmG5_WoepdDEbP1Q3tM",
    authDomain: "byjus---app-twitter.firebaseapp.com",
    databaseURL: "https://byjus---app-twitter-default-rtdb.firebaseio.com",
    projectId: "byjus---app-twitter",
    storageBucket: "byjus---app-twitter.appspot.com",
    messagingSenderId: "905303743694",
    appId: "1:905303743694:web:1af3ca77ec7156c507049f"
};

var username = localStorage.getItem("username");
var roomname = localStorage.getItem("Sala");

firebase.initializeApp(firebaseConfig);

function send(){
    var msg = document.getElementById("msg").value

    firebase.database().ref(roomname).push({
        name:username,
        message: msg,
        likes: 0,
    }
    )

    document.getElementById("msg").value = ""
}

function getData() {
    firebase.database().ref("/"+roomname).on('value', function(snapshot){
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey != "purpose") {
                firebaseMessageId = childKey;
                messageData = childData;
                console.log(firebaseMessageId);
                console.log(messageData);
                name = messageData["name"];
                message = messageData["message"];
                likes = messageData["likes"];
                NameTag = "<h4>"+name+"<img class='user_tick' src='usertick.png'></img></h4>";
                MessageTag = "<h4 class='message_h4'>"+message+"</h4>";
                LikeButtonTag = "<button class='btn btn-warning' id="+firebaseMessageId+" value="+likes+" onclick='updateLike(this.id)'>";
                ThumbUpTag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: "+likes+"</span></button><hr>";

                row = NameTag + MessageTag + LikeButtonTag + ThumbUpTag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function updateLike(buttonId){
    likes = document.getElementById(buttonId).value;
    updatedLikes = Number(likes) + 1;

    firebase.database().ref(roomname).child(buttonId).update({
        likes: updatedLikes
    });
}

function deslogar(){
    localStorage.removeItem("username")
    localStorage.removeItem("Sala")
    window.location = "index.html"
}