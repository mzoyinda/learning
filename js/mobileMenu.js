var toggleBar = document.getElementById("toggle-bar");
toggleBar.onclick = function openNav() {
    document.getElementById("myMainmenu").style.display = "block";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}
var closeBar = document.getElementById("close-bar");
closeBar.onclick = function closeNav() {
    document.body.style.backgroundColor = "white";
    if (document.getElementById("myMainmenu").style.display = "none") {
        document.getElementById("myMainmenu").style.display = "";
    } else {
        document.getElementById("myMainmenu").style.display = "initial";
    }
};

