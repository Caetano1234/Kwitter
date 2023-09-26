var username;

function LogIn(){
    username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    window.location = "ZRoom.html";
}