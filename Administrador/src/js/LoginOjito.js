var x = document.getElementById('login');
var y = document.getElementById('register');
var z = document.getElementById('btn');

function login(){
    x.style.left = "27px";
    y.style.right = "-350px";
    z.style.left = "0px";
}
function register(){
    x.style.left = "-350px";
    y.style.right = "25px";
    z.style.left = "150px";
}
function myLogPassword() {
var input = document.getElementById("logPassword");
var eye = document.getElementById("eye");
var eyeSlash = document.getElementById("eye-slash");

if (input.type === "password") {
    input.type = "text";
    eye.style.opacity = "0";
    eyeSlash.style.opacity = "1";
} else {
    input.type = "password";
    eye.style.opacity = "1";
    eyeSlash.style.opacity = "0";
}
}

// vista

function myNewPassword() {
var input = document.getElementById("newPassword");
var eye = document.getElementById("eye-new");
var eyeSlash = document.getElementById("eye-slash-new");

if (input.type === "password") {
input.type = "text";
eye.style.opacity = "0";
eyeSlash.style.opacity = "1";
} else {
input.type = "password";
eye.style.opacity = "1";
eyeSlash.style.opacity = "0";
}
}

function myConfirmPassword() {
var input = document.getElementById("confirmPassword");
var eye = document.getElementById("eye-confirm");
var eyeSlash = document.getElementById("eye-slash-confirm");

if (input.type === "password") {
input.type = "text";
eye.style.opacity = "0";
eyeSlash.style.opacity = "1";
} else {
input.type = "password";
eye.style.opacity = "1";
eyeSlash.style.opacity = "0";
}
}